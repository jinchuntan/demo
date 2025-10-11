
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { sun: { gold: "#FFCD00" } },
      boxShadow: { card: "0 8px 24px rgba(0,0,0,.12)" }
    }
  },
  plugins: []
}
