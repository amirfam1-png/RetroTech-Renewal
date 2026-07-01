/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#faf8f5',
          card: '#ffffff',
          subtle: '#f2efea',
          dark: '#1a2530',
        },
        edge: {
          DEFAULT: '#e8e2d8',
          strong: '#d6cebe',
        },
        ink: {
          primary: '#1a2530',
          secondary: '#5c6670',
          muted: '#8a8f94',
          inverse: '#faf8f5',
        },
        brand: {
          deep: '#1b4a5a',
          'deep-soft': '#2d6478',
          rust: '#c97a40',
          'rust-soft': '#d99060',
        },
        status: {
          ok: '#5a8f5a',
          'ok-bg': '#ebf2eb',
          warn: '#d08c2d',
          'warn-bg': '#fbf2e2',
          crit: '#b33a3a',
          'crit-bg': '#f8e8e8',
          idle: '#8a8f94',
          'idle-bg': '#ecedee',
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", 'system-ui', 'sans-serif'],
        serif: ["'IBM Plex Serif'", 'Georgia', 'serif'],
        mono: ["'IBM Plex Mono'", 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(26, 37, 48, 0.04)',
        card: '0 2px 8px rgba(26, 37, 48, 0.06), 0 1px 2px rgba(26, 37, 48, 0.04)',
        'card-lg':
          '0 8px 24px rgba(26, 37, 48, 0.08), 0 2px 4px rgba(26, 37, 48, 0.04)',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(95, 196, 106, 0.6)' },
          '70%': { boxShadow: '0 0 0 8px rgba(95, 196, 106, 0)' },
        },
        'pulse-warn': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(208, 140, 45, 0.5)' },
          '50%': { boxShadow: '0 0 0 6px rgba(208, 140, 45, 0)' },
        },
        'pulse-crit': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(179, 58, 58, 0.6)' },
          '50%': { boxShadow: '0 0 0 6px rgba(179, 58, 58, 0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-live': 'pulse-live 2s infinite',
        'pulse-warn': 'pulse-warn 2s infinite',
        'pulse-crit': 'pulse-crit 1.5s infinite',
        'fade-up': 'fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) backwards',
      },
    },
  },
  plugins: [],
};
