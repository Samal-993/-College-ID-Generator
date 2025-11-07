/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0, transform: "translateY(10px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
    slideUp: {
      "0%": { opacity: 0, transform: "translateY(40px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
  },
  animation: {
    fadeIn: "fadeIn 0.8s ease-out",
    slideUp: "slideUp 0.9s ease-out",
  },
}

    },
  },
  plugins: [],
}

