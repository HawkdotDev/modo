/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    borderRadius: {
      none: '0px',
      sm: '1px',
      DEFAULT: '1px',
      md: '3px',
      lg: '5px',
      xl: '9px',
      '2xl': '13px',
      '3xl': '21px',
      full: '9999px',
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-rose': '0 0 50px -10px rgba(244, 63, 94, 0.35)',
        'glow-emerald': '0 0 50px -10px rgba(16, 185, 129, 0.35)',
        'glow-blue': '0 0 50px -10px rgba(59, 130, 246, 0.35)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'float-gentle': 'floatGentle 4s ease-in-out infinite alternate',
        'flame-flicker': 'flameFlicker 2.5s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left': 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'spring-pop': 'springPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(0.992)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.94)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        floatGentle: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-3px)' },
        },
        flameFlicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.08) rotate(1.5deg)', filter: 'brightness(1.15)' },
          '100%': { transform: 'scale(0.98) rotate(-0.5deg)', filter: 'brightness(0.95)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: 0, transform: 'translateX(6px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        springPop: {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
