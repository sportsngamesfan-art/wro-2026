import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f8f9fc',
          100: '#f0f2f8',
          200: '#e1e6f0',
          300: '#c7d0e3',
          400: '#a8b4d0',
          500: '#7a8aae',
          600: '#5a6b8f',
          700: '#3d4a6e',
          800: '#2a324a',
          900: '#1a1f30',
        },
        saffron: {
          50: '#fef9f3',
          100: '#fef2e6',
          200: '#fce5cc',
          300: '#f9d4b3',
          400: '#f5b899',
          500: '#e89e4c',
          600: '#d97e2d',
          700: '#b8581f',
          800: '#8a3f17',
          900: '#5c2a0f',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-soft': 'pulseSoft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}

export default config
