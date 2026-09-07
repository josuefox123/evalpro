/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Officielle EvalPro B2B SaaS
        'ep-primary':      '#2563EB',  // Bleu principal
        'ep-primary-dark': '#1D4ED8',  // Bleu sombre hover
        'ep-secondary':    '#7C3AED',  // Violet analytics / secondaire
        'ep-success':      '#10B981',  // Vert succès / validation
        'ep-navy':         '#0F172A',  // Navy sidebar / éléments sombres
        'ep-text':         '#1E293B',  // Texte principal
        'ep-muted':        '#64748B',  // Texte atténué
        'ep-border':       '#E2E8F0',  // Bordures fines
        'ep-background':   '#F8FAFC',  // Fond principal clair
        'ep-white':        '#FFFFFF',  // Blanc pur
        'ep-warning':      '#F59E0B',  // Orange avertissement
        'ep-danger':       '#EF4444',  // Rouge erreur

        // Rétro-compatibilité avec le code existant
        'fond-principal':  '#F8FAFC',
        'fond-secondaire': '#F1F5F9',
        'fond-carte':      '#FFFFFF',
        'texte-principal': '#1E293B',
        'texte-secondaire': '#475569',
        'texte-muet':      '#64748B',
        'bordure':         '#E2E8F0',
        'bleu': {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        'succes': '#10b981',
        'avertissement': '#f59e0b',
        'erreur': '#ef4444',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        titre: ['Outfit', 'Inter', 'sans-serif'],
      },

      boxShadow: {
        'ep-subtle': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'ep-card':   '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'ep-md':     '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'ep-lg':     '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'carte':    '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
      },

      borderRadius: {
        'ep': '0.625rem', // 10px pour un arrondi moderne et sobre
        'carte': '0.75rem',
      },
    },
  },
  plugins: [],
}

