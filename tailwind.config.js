/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-purple": "rgba(112, 75, 210, 1)",
      },
    },
  },
  plugins: [],
};
