import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      /* 🎨 COLORS (CSS VARIABLE DRIVEN) */
      colors: {
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        text: {
          heading: 'var(--text-heading)',
          body: 'var(--text-body)',
          muted: 'var(--text-muted)',
        },
        neutral: {
          700: '#404040',
          800: '#262626',
        },
        brand: {
          primary: {
            500: '#22c55e',
          },
        },
      },

      /* 📐 SPACING – 40PX SYSTEM */
      spacing: {
        10: '40px',
        11: '44px',
      },

      /* 🔵 RADIUS – SOFT & MODERN */
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
