import type { Config } from "tailwindcss";

const config: Config = {
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
        brand: {
          DEFAULT: "#4A2545",
          hover: "#32102F",
          light: "#D9A5A0",
          subtle: "#FFE9E2",
          border: "#E8D5CE",
        },
        surface: {
          DEFAULT: "#FFF8F6",
          card: "#FFFFFF",
          cardHover: "#FFF1EC",
          elevated: "#FFE9E2",
          border: "#E8D5CE",
          borderHover: "#D1C3CB",
          muted: "#80747B",
          highlight: "#32102F"
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'ballet-card': '0 2px 10px rgba(74, 37, 69, 0.04), 0 1px 3px rgba(74, 37, 69, 0.02)',
        'ballet-elevated': '0 12px 30px rgba(74, 37, 69, 0.08), 0 4px 8px rgba(74, 37, 69, 0.04)',
        'plum-focus': '0 0 0 3px rgba(74, 37, 69, 0.15)',
      }
    },
  },
  plugins: [],
};
export default config;
