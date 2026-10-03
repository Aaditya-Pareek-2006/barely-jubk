/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F2EB',
          dark: '#EBE6DA',
          light: '#FAF8F5',
        },
        brand: {
          black: '#111111',
          dark: '#181818',
          paper: '#F5F2EB',
          lime: '#CCFF00',
          'lime-dark': '#B3E600',
          orange: '#FF4D00',
          'orange-dark': '#E04400',
          gray: '#888888',
          'light-gray': '#E5E2DA',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Syne"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #111111',
        'brutal-lg': '6px 6px 0px 0px #111111',
        'brutal-lime': '4px 4px 0px 0px #CCFF00',
        'brutal-orange': '4px 4px 0px 0px #FF4D00',
        'brutal-sm': '2px 2px 0px 0px #111111',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-fast': 'marquee 15s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
