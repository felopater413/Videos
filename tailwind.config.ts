import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#06060a",
        surface: "#141529",
        line: "#2b2f48",
        accent: "#6b7cff",
        textSoft: "#b0b9d8"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(107,124,255,0.18), 0 18px 45px rgba(107,124,255,0.18)",
        soft: "0 18px 50px rgba(0, 0, 0, 0.22)"
      },
      backgroundImage: {
        "radial-accent":
          "radial-gradient(circle at 20% 20%, rgba(107,124,255,0.2), transparent 40%), radial-gradient(circle at 80% 0%, rgba(77,150,255,0.12), transparent 32%), radial-gradient(circle at 50% 100%, rgba(113,78,230,0.14), transparent 36%)"
      }
    }
  },
  plugins: []
};

export default config;
