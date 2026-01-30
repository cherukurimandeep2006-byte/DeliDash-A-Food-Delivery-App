/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./App.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fecfca',
          300: '#fdada5',
          400: '#fa7d70',
          500: '#f15843',
          600: '#de3524',
          700: '#ba281a',
          800: '#9a2419',
          900: '#80241c',
        },
      },
    },
  },
  plugins: [],
}
