/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // Pas de darkMode automatique - on garde le thème clair uniquement
  theme: {
    extend: {
      colors: {
        // ============================================================
        // PALETTE OFFICIELLE EVALPRO (Maquette Figma - Thème Clair)
        // ============================================================

        // Couleurs de fond de l'application
        'fond-principal':    '#f8fafc',   // Fond général des pages (gris très clair)
        'fond-secondaire':   '#f1f5f9',   // Fond alternatif (sections, tableaux)
        'fond-carte':        '#ffffff',   // Fond des cartes et panneaux

        // Couleurs de texte
        'texte-principal':   '#0f172a',   // Texte principal (noir profond)
        'texte-secondaire':  '#475569',   // Texte secondaire (gris moyen)
        'texte-muet':        '#94a3b8',   // Texte très atténué (placeholder, hints)

        // Couleur de bordure
        'bordure':           '#e2e8f0',   // Bordures des cartes et champs

        // Couleur principale (Bleu Indigo - couleur d'accroche EvalPro)
        'bleu': {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',  // Couleur principale utilisée pour boutons CTA
          700: '#4338ca',
          900: '#312e81',
        },

        // Couleurs de statut
        'succes':    '#10b981',  // Vert (succès, admis)
        'avertissement': '#f59e0b',  // Orange (en attente, à corriger)
        'erreur':    '#ef4444',  // Rouge (échec, rejeté)
        'info':      '#3b82f6',  // Bleu informatif

        // Couleurs des 4 rôles utilisateurs
        'role-superadmin':   '#a855f7',  // Violet - Super Administrateur
        'role-entreprise':   '#4f46e5',  // Indigo - Administrateur Entreprise
        'role-consultant':   '#10b981',  // Emeraude - Consultant / Evaluateur
        'role-candidat':     '#f59e0b',  // Ambre - Candidat
      },

      fontFamily: {
        // Police principale : Outfit pour les titres, Inter pour le corps de texte
        sans: ['Inter', 'Outfit', 'sans-serif'],
        titre: ['Outfit', 'Inter', 'sans-serif'],
      },

      boxShadow: {
        // Ombres personnalisées pour un rendu premium
        'carte':    '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
        'carte-md': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'carte-lg': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)',
      },

      borderRadius: {
        // Rayon d'arrondi cohérent avec la maquette
        'carte': '0.75rem',  // 12px
      },
    },
  },
  plugins: [],
}
