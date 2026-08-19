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
        // Light Theme: Digital Choreography (Warm Stone & Orchid Aesthetic)
        ballet: {
          ground: "#FAF7F5",
          canvas: "#F5EBE8",
          container: "#F5EBE8",
          surfaceHigh: "#F0E2DE",
          surfaceHighest: "#EBD8D3",
          border: "#E5D5CF",
          borderHover: "#D6C0B8",
          plum: "#2A1525",
          plumLight: "#6B2D5B",
          rose: "#D4764E",
          blush: "#FCEEED",
          taupe: "#80747B",
          espresso: "#1F1518",
          mutedPlum: "#5A4550",
          sage: "#4A7A5E",
        },
        // Dark Theme: Velvet Terminal (Warm Wine, Orchid & Copper Aesthetic)
        velvet: {
          950: "#140E11",
          900: "#1A1216",
          850: "#1F161B",
          800: "#241A1F",
          750: "#2D2025",
          700: "#3D2E35",
          600: "#5A4550",
          border: "#3D2E35",
          borderHover: "#5A4550",
          muted: "#A89B9F",
          dim: "#7A6B70",
          text: "#F2EDE9",
          orchid: "#C98DB8",
          orchidLight: "#D4A3C8",
          orchidDeep: "#6B2D5B",
          copper: "#E8996E",
          sienna: "#D4764E",
          fern: "#7EBF96",
          fernDeep: "#4A7A5E",
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
        'ballet-card': '0 2px 10px rgba(107, 45, 91, 0.04), 0 1px 3px rgba(107, 45, 91, 0.02)',
        'ballet-elevated': '0 12px 30px rgba(107, 45, 91, 0.08), 0 4px 8px rgba(107, 45, 91, 0.04)',
        'velvet-card': '0 4px 20px rgba(20, 14, 17, 0.55), inset 0 1px 0 0 rgba(201, 141, 184, 0.07)',
        'velvet-elevated': '0 20px 45px rgba(20, 14, 17, 0.8), 0 4px 14px rgba(20, 14, 17, 0.6), inset 0 1px 0 0 rgba(201, 141, 184, 0.12)',
        // Backwards compatibility alias for components transition
        'obsidian-card': '0 4px 20px rgba(20, 14, 17, 0.55), inset 0 1px 0 0 rgba(201, 141, 184, 0.07)',
        'obsidian-elevated': '0 20px 45px rgba(20, 14, 17, 0.8), 0 4px 14px rgba(20, 14, 17, 0.6), inset 0 1px 0 0 rgba(201, 141, 184, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
