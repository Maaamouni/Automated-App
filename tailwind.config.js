/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Background palette (dark navy)
        bg: {
          primary: "#0a0e1a",
          secondary: "#0f1729",
          tertiary: "#131a2e",
          card: "#0f1729",
          hover: "#1a2238",
        },
        // Accent (teal/cyan)
        accent: {
          DEFAULT: "#2dd4bf",
          hover: "#14b8a6",
          muted: "#0f3a35",
          dim: "#5eead4",
          glow: "rgba(45, 212, 191, 0.15)",
        },
        // Text
        text: {
          primary: "#e5e7eb",
          secondary: "#9ca3af",
          muted: "#6b7280",
          accent: "#2dd4bf",
        },
        border: {
          DEFAULT: "#1f2937",
          accent: "#2dd4bf",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Consolas",
          "Monaco",
          "monospace",
        ],
      },
      fontSize: {
        "section-label": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.1em" }],
        "stat-value": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(45, 212, 191, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 212, 191, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
