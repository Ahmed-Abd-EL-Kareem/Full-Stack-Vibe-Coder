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
                if (storedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[#F5EBE8] dark:selection:bg-[#C98DB8]/25 selection:text-[#2A1525] dark:selection:text-[#C98DB8] relative transition-colors duration-200">
        {/* <!-- impeccable:contract
THESIS: Digital Choreography (Light Default) & Velvet Terminal (Dark) — Seamless toggle between Warm Porcelain Stone and Velvet Wine/Orchid engineering workstation with shared hue DNA, choreographed with GSAP matchMedia animations.
OWN-WORLD: Dual-mode palette (Light: #FAF7F5, #6B2D5B, #F5EBE8; Dark: #1A1216, #241A1F, #C98DB8, #E8996E), Playfair Display + Sora typography, and GSAP autoAlpha/timeline physics.
STORY: The engineer selects external SaaS services, inputs their specification, and reviews the synchronized live interactive sandbox, architecture blueprint, and Next.js 15 TypeScript code in a vertical workspace.
FIRST VIEWPORT: Integrated vertical console with service dock, prompt canvas, and live interactive sandbox preview.
FORM: Dual Theme Studio & GSAP matchMedia Choreography (Stitch project 9464067033150158650).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
--> */}
        {children}
      </body>
    </html>
  );
}
