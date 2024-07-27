/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#1E1E2F',
        'sidebar-bg': '#27293D',
        'sidebar-item-bg': '#393b47',
        'sidebar-item-active-bg': '#3C3F58',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B3C5',
        'success': '#5ECB78',
        'warning': '#E9C46A',
        'error': '#E76F51',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
