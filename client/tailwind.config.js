// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        popup: {
          "0%": { transform: "translateY(200px)" },
          "100%": { transform: "translateY(0px)" }
        },
        popuout: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 }
        }
      },
      animation: {
        popup: "popup 0.3s ease",
        popuout: "popuout 1s ease"
      }
    }
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#6366f1"
            }
          }
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#6366f1"
            }
          }
        }
      }
    })
  ]
};
