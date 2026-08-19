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
    <html lang="en" className="light scroll-smooth">
      <body className="min-h-screen bg-[#FFF8F6] text-[#241915] font-sans antialiased selection:bg-[#FFE9E2] selection:text-[#32102F] relative">
        {/* <!-- impeccable:contract
THESIS: Digital Choreography — An editorial ballet aesthetic that marries classical typography (Playfair Display) with tactile softness (Warm Ivory, Deep Plum, Dusty Rose, and Soft Sage).
OWN-WORLD: Warm Ivory (#FFF8F6), Deep Plum (#4A2545 / #32102F), Soft Blush (#FFE9E2), Muted Taupe (#80747B), Playfair Display serif headlines, and Sora UI text.
STORY: The engineer selects external SaaS services in the left deck, inputs their specification, and immediately reviews the synchronized live interactive sandbox, architecture blueprint, and Next.js 15 TypeScript code.
FIRST VIEWPORT: Integrated split-screen console with service dock, prompt canvas, and live interactive sandbox preview.
FORM: Digital Choreography (Stitch project 9464067033150158650).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
--> */}
        {children}
      </body>
    </html>
  );
}
