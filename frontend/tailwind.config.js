/** @type {import('tailwindcss').Config} */
// @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Patua+One&display=swap');
import cover from "./public/cover_password_manager.png";
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      alfaSlab: `"Alfa Slab", serif`,
      roboto: `"Roboto Condensed", sans-serif`,
    },
    // textColor: {
    //   Green: "#1E5631",
    // },
    backgroundColor: {
      brand: "#d0011b",
      loginGreen: "#1E5631",
      gray: "#e1e1e1",
      buttonBlue: "#1a73e8",
      black: "#000",
      white: "#fff",
      green: {
        50: "#f0fdf4", // Lightest green
        100: "#dcfce7", // Extra light green
        200: "#bbf7d0", // Very light green
        300: "#86efac", // Light green
        400: "#4ade80", // Green
        500: "#22c55e", // Default green
        600: "#16a34a", // Dark green
        700: "#15803d", // Very dark green
        800: "#166534", // Extra dark green
        900: "#14532d", // Darkest green
      },
      blue: {
        50: "#eff6ff", // Lightest blue
        100: "#dbeafe", // Extra light blue
        200: "#bfdbfe", // Very light blue
        300: "#93c5fd", // Light blue
        400: "#60a5fa", // Blue
        500: "#3b82f6", // Default blue
        600: "#2563eb", // Dark blue
        700: "#1d4ed8", // Very dark blue
        800: "#1e40af", // Extra dark blue
        900: "#1e3a8a", // Darkest blue
      },
      red: {
        50: "#fef2f2", // Lightest red
        100: "#fee2e2", // Extra light red
        200: "#fecaca", // Very light red
        300: "#fca5a5", // Light red
        400: "#f87171", // Red
        500: "#ef4444", // Default red
        600: "#dc2626", // Dark red
        700: "#b91c1c", // Very dark red
        800: "#991b1b", // Extra dark red
        900: "#7f1d1d", // Darkest red
      },
    },
    backgroundImage: {
      // brand: "url('/cover_password_manager.png')",
      login: "linear-gradient(to right, #d0011b, #464646)",
      loginVertical: "linear-gradient(to top, #d0011b, #464646)",
    },
    backdropBlur: {
      loginForm: "",
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateY(-100%)" },
        "100%": { transform: "translateY(0)" },
      },
      slideOut: {
        "0%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(-100%)" },
      },
    },
    animation: {
      slideIn: "slideIn 0.5s ease-out forwards",
      slideOut: "slideOut 0.5s ease-out forwards",
    },
  },
  plugins: [],
};
