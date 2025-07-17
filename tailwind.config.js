/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1BA136',
          foreground: '#FFFFFF',
        },
        background: '#F1F1F1',
        foreground: {
          DEFAULT: '#141414',
          secondary: '#898989',
        },
        destructive: '#F5373C',
        warning: '#EFA701',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['SB Sans Text', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'section-title': '19px',
        'card-title': '16px',
        'body': '14px',
        'small': '12px',
      },
      fontWeight: {
        'regular': '400',
        'medium': '500',
        'bold': '600',
      },
      screens: {
        'mobile': '320px',
      },
      height: {
        'screen': '100vh',
      },
      width: {
        'mobile': '320px',
      },
      zIndex: {
        'status-bar': '100',
        'map': '0',
        'bottom-sheet': '1000',
        'nav-panel': '1001',
        'bottom-nav': '1002',
      },
    },
  },
  plugins: [],
} 