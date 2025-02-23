/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        "custom-yellow-1": "rgba(212, 178, 87, 0.2)",
        "custom-yellow-2": "rgba(212, 178, 87, 0.5)",
        "custom-yellow-3": "rgba(212, 178, 87, 0.7)",
        "custom-yellow-4": "rgba(212, 178, 87, 1)",
      },
    },
  },
  plugins: [],
};
