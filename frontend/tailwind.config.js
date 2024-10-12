/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          dark: 'rgba(180, 19, 23, 0.6)',
          light: 'rgba(180, 19, 23, 1)'
        },
        blue: 'rgba(43, 54, 96, 1)',
        'light-blue': '#F2F7FB',
        'custom-red': '#B41317',
        'custom-blue': '#2B3660',
        'custom-black': 'rgba(6, 9, 17, 0.5)',
        'text-grey': '#7D7E80'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',     /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',  /* Chrome, Safari and Opera */
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}