/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rich: {
          black: "rgb(15, 15, 15)",
        },
      },
    },
    fontFamily: { sans: ["Poppins"] },
  },
  plugins: [require("@tailwindcss/forms")],
};
