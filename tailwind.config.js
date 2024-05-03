/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: "true",
      },
      boxShadow: {
        customShadow: "0px 10px 25px 2px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
