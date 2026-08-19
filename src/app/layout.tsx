import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stunning — Full-Stack App Studio with Live Integrations',
  description: 'An AI-powered full-stack application builder with dynamic system prompt injection for Stripe, Shopify, Gmail, Slack, Google Sheets, and Supabase.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('stunning_theme');
                if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[#FFE9E2] dark:selection:bg-amber-500/20 selection:text-[#32102F] dark:selection:text-amber-300 relative transition-colors duration-200">
        {/* <!-- impeccable:contract
THESIS: Dual-Theme Studio & Digital Choreography — Seamless toggle between Warm Porcelain Ballet Aesthetic (Light) and Solaris Precision Console (Dark), elevated by GSAP entrance physics.
OWN-WORLD: Dual-mode palette (Light: #FFF8F6, #4A2545, #FFE9E2; Dark: #0D0E11, #14161B, #F59E0B), Playfair Display + Sora typography, and GSAP micro-interactions.
STORY: The engineer selects external SaaS services in the left deck, inputs their specification, and reviews the synchronized live interactive sandbox, architecture blueprint, and Next.js 15 TypeScript code.
FIRST VIEWPORT: Integrated split-screen console with service dock, prompt canvas, and live interactive sandbox preview.
FORM: Dual Theme Studio & GSAP Choreography (Stitch project 9464067033150158650).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
--> */}
        {children}
      </body>
    </html>
  );
}
