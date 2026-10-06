/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#1a0f1e',
        plum: '#241226',
        blush: '#ec4899',
        'blush-light': '#f472b6',
        'blush-soft': '#f9a8d4',
        'blush-pale': '#fbcfe8',
        cream: '#fff5fa',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
