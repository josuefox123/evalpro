/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Palette officielle de la Maquette Figma EvalPro (Dark Theme Premium)
        obsidian: {
          900: '#0f172a',
          950: '#0b0f19',
          1000: '#030213',
        },
        primary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#1e1b4b',
        },
        slate: {
          850: '#141e33',
          950: '#0b0f19',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
        },
        amber: {
          500: '#f59e0b',
        },
        purple: {
          500: '#a855f7',
          600: '#9333ea',
        },
        rose: {
          500: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
