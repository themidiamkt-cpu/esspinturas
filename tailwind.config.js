/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a1730",
        concrete: "#e8f2ff",
        steel: "#11233c",
        signal: "#2ea8ff",
        signalDark: "#1477d1",
        fog: "#f5f9ff"
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        brutal: "0 24px 60px -28px rgba(20, 119, 209, 0.55)",
        brutalSoft: "0 12px 30px -18px rgba(10, 23, 48, 0.35)"
      },
      backgroundImage: {
        "brutal-grid":
          "linear-gradient(to right, rgba(20,119,209,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,119,209,0.14) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
