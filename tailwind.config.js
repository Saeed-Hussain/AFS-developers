/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#080B0F",
          800: "#0C1117",
          700: "#0F151C",
          600: "#141B24",
          500: "#1B2430",
        },
        signal: {
          DEFAULT: "#00D8B0",
          dim: "#0A8F73",
          glow: "#5FF4D6",
        },
        amber: {
          DEFAULT: "#FFB020",
          dim: "#C98A18",
        },
        mist: {
          DEFAULT: "#EDEFF2",
          dim: "#9AA4B2",
          faint: "#5A6472",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(0,216,176,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,216,176,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        scanline: "scanline 6s linear infinite",
      },
    },
  },
  plugins: [],
};
