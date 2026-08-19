import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stunning AI — Full-Stack App Builder with Native Integrations',
  description: 'AI-powered application generator with dynamic system prompt injection for Stripe, Shopify, Gmail, Slack, and Google Sheets.',
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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0B0D13] text-gray-100 antialiased selection:bg-purple-500/30 selection:text-purple-200">
        <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none -z-10" />
        <div className="fixed inset-0 glow-ambient pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}
