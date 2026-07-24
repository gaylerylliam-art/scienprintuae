import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#071525",
        "charcoal-2": "#0B1E33",
        "charcoal-soft": "#132D46",
        walnut: "#8A5A33",
        "walnut-dark": "#4F321E",
        parchment: "#E6D6BA",
        "parchment-lt": "#F4EBD9",
        cream: "#F8F4EA",
        laser: "#D9973E",
        "laser-glow": "#F4C16A",
        brass: "#B58A52",
        ink: "#102033",
        "ink-soft": "#52606D"
      },
      fontFamily: {
        display: ["Space Grotesk", "Arial", "sans-serif"],
        body: ["Inter", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"]
      },
      boxShadow: {
        laser: "0 0 30px rgba(217, 151, 62, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
