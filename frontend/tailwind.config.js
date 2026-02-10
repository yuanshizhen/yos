/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 10px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)'
      },
      colors: {
        apple: {
          bg: '#f5f5f7',
          card: 'rgba(255,255,255,0.75)',
          text: '#1d1d1f',
          subtext: '#6e6e73',
          accent: '#0071e3'
        }
      }
    },
  },
  plugins: [],
}
