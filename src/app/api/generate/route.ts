import { NextRequest } from 'next/server';
import { buildInjectedSystemPrompt } from '@/lib/promptBuilder';
import { generateSmartMockResponse } from '@/lib/mockResponses';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, selectedIntegrations = [], apiKey: clientApiKey, provider = 'gemini' } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Synthesize the dynamic System Prompt with injected integration contexts
    const injectionResult = buildInjectedSystemPrompt(prompt.trim(), selectedIntegrations);

    const apiKey = clientApiKey || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    // Check if we should execute a real AI model or high-fidelity simulated streaming
    if (apiKey && apiKey.trim().length > 0) {
      if (provider === 'openai' || (!process.env.GEMINI_API_KEY && (clientApiKey?.startsWith('sk-') || process.env.OPENAI_API_KEY))) {
        return handleOpenAIStream(prompt, injectionResult, apiKey);
      } else {
        return handleGeminiStream(prompt, injectionResult, apiKey);
      }
    }

    // Fallback: High-Fidelity Simulated Streaming Stream (Zero setup needed)
    return handleSimulatedStream(prompt, injectionResult);
  } catch (error: any) {
    console.error('[API /api/generate] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Streams real response from Google Gemini API
 */
async function handleGeminiStream(
  userPrompt: string,
  injection: ReturnType<typeof buildInjectedSystemPrompt>,
  apiKey: string
) {
  const model = process.env.AI_MODEL_NAME || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`;

  const payload = {
    system_instruction: {
      parts: [{ text: injection.systemPrompt }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 3000
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.warn(`[Gemini API Error] status=${response.status}: ${errText}. Falling back to smart mock.`);
    return handleSimulatedStream(userPrompt, injection);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial metadata event
      const metaChunk = `event: metadata\ndata: ${JSON.stringify({
        systemPrompt: injection.systemPrompt,
        integrationsCount: injection.integrationCount,
        injectedMetadata: injection.injectedMetadata,
        mode: 'live-gemini'
      })}\n\n`;
      controller.enqueue(encoder.encode(metaChunk));

      const reader = response.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      try {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr) {
                try {
                  const parsed = JSON.parse(jsonStr);
                  const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
                  if (text) {
                    controller.enqueue(encoder.encode(`event: chunk\ndata: ${JSON.stringify({ text })}\n\n`));
                  }
                } catch {
                  // ignore non-json SSE lines
                }
              }
            }
          }
        }
        controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}

/**
 * Streams real response from OpenAI API
 */
async function handleOpenAIStream(
  userPrompt: string,
  injection: ReturnType<typeof buildInjectedSystemPrompt>,
  apiKey: string
) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [
        { role: 'system', content: injection.systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    console.warn(`[OpenAI API Error] status=${response.status}: ${errText}. Falling back to smart mock.`);
    return handleSimulatedStream(userPrompt, injection);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const metaChunk = `event: metadata\ndata: ${JSON.stringify({
        systemPrompt: injection.systemPrompt,
        integrationsCount: injection.integrationCount,
        injectedMetadata: injection.injectedMetadata,
        mode: 'live-openai'
      })}\n\n`;
      controller.enqueue(encoder.encode(metaChunk));

      const reader = response.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      try {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                const text = parsed.choices?.[0]?.delta?.content || '';
                if (text) {
                  controller.enqueue(encoder.encode(`event: chunk\ndata: ${JSON.stringify({ text })}\n\n`));
                }
              } catch {
                // ignore
              }
            }
          }
        }
        controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}

/**
 * High-Fidelity Simulated Stream: delivers realistic chunked output with zero external API key requirements.
 */
function handleSimulatedStream(
  userPrompt: string,
  injection: ReturnType<typeof buildInjectedSystemPrompt>
) {
  const mockResult = generateSmartMockResponse(userPrompt, injection.selectedIntegrationObjects);
  const fullText = mockResult.markdownContent;

  const encoder = new TextEncoder();

  // Split content into realistic word/sentence chunks
  const chunks: string[] = [];
  const words = fullText.split(' ');
  let current = '';
  for (let i = 0; i < words.length; i++) {
    current += words[i] + ' ';
    if (i % 4 === 0 || i === words.length - 1) {
      chunks.push(current);
      current = '';
    }
  }

  const stream = new ReadableStream({
    async start(controller) {
      // 1. Emit metadata event with complete injected system prompt and schema context
      const metaChunk = `event: metadata\ndata: ${JSON.stringify({
        systemPrompt: injection.systemPrompt,
        integrationsCount: injection.integrationCount,
        injectedMetadata: injection.injectedMetadata,
        mode: 'smart-simulated',
        mockResult
      })}\n\n`;
      controller.enqueue(encoder.encode(metaChunk));

      // 2. Stream chunk by chunk with minimal delay
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`event: chunk\ndata: ${JSON.stringify({ text: chunk })}\n\n`));
        await new Promise(r => setTimeout(r, 25));
      }

      // 3. Emit completion event
      controller.enqueue(encoder.encode(`event: done\ndata: ${JSON.stringify({ finished: true })}\n\n`));
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Injected-Integrations': injection.integrationCount.toString(),
      'X-Simulation-Mode': 'true'
    }
  });
}
