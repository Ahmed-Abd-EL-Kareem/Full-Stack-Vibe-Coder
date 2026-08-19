import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Light Theme: Ballet Aesthetic
        ballet: {
          ground: "#FFF8F6",
          canvas: "#FFF1EC",
          container: "#FFE9E2",
          surfaceHigh: "#F9E4DC",
          surfaceHighest: "#F3DED7",
          border: "#E8D5CE",
          borderHover: "#D1C3CB",
          plum: "#32102F",
          plumLight: "#4A2545",
          rose: "#D9A5A0",
          blush: "#FFDAD6",
          taupe: "#80747B",
          espresso: "#241915",
          mutedPlum: "#4E444B",
          sage: "#A8B79A",
        },
        // Dark Theme: Solaris Precision Console
        solaris: {
          950: "#090A0D",
          900: "#0D0E11",
          850: "#101217",
          800: "#14161B",
          750: "#1A1D24",
          700: "#222630",
          border: "#262A36",
          borderHover: "#383E4F",
          muted: "#94A3B8",
          dim: "#64748B",
          text: "#F8FAFC",
          amber: "#F59E0B",
          amberHover: "#D97706",
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'ballet-card': '0 2px 10px rgba(74, 37, 69, 0.04), 0 1px 3px rgba(74, 37, 69, 0.02)',
        'ballet-elevated': '0 12px 30px rgba(74, 37, 69, 0.08), 0 4px 8px rgba(74, 37, 69, 0.04)',
        'solaris-card': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'solaris-elevated': '0 16px 36px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
};
export default config;
