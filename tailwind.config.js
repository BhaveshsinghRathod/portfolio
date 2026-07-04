/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10151C",
        paper: "#F6F6F4",
        panel: "#FFFFFF",
        steel: "#4B5563",
        mist: "#8A93A1",
        line: "#E3E5E9",
        amber: {
          DEFAULT: "#C97A1A",
          soft: "#FBEBD4",
        },
        verified: {
          DEFAULT: "#2F7A52",
          soft: "#E1F0E6",
        },
        alert: {
          DEFAULT: "#B4432E",
          soft: "#F7E3DE",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}

