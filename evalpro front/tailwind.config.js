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
        // Palette Officielle B2B SaaS HR Tech EvalPro
        bleu: {
          50: '#eff6ff',   // Light Blue
          100: '#dbeafe',
          500: '#3b82f6',  // Secondary Blue
          600: '#2563eb',  // Primary Blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',  // Dark Blue
        },
        fond: {
          principal: '#f8fafc',   // Slate 50
          secondaire: '#f1f5f9',  // Slate 100
          carte: '#ffffff',       // White
        },
        texte: {
          principal: '#0f172a',  // Slate 900
          secondaire: '#64748b', // Slate 500
          muet: '#94a3b8',       // Slate 400
        },
        bordure: '#e2e8f0',      // Slate 200
        statut: {
          succes: '#16a34a',
          avertissement: '#d97706',
          erreur: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'carte': '0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
        'subtile': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
