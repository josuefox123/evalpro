<template>
  <!-- 
    Landing page d'accueil d'EvalPro.
    Présente la plateforme, ses fonctionnalités phares, la sécurité et l'architecture.
  -->
  <div class="space-y-20 pb-16">
    
    <!-- Hero Section -->
    <section class="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <span class="material-symbols-outlined text-sm">rocket_launch</span>
          <span>Plateforme Unifiée de Recrutement & Évaluation</span>
        </div>

        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
          Évaluez vos candidats avec <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Précision et Sécurité</span>
        </h1>

        <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
          De la création de campagnes au classement final : organisez des épreuves techniques, surveillez les compositions en temps réel et corrigez automatiquement ou manuellement sur une seule plateforme SaaS.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <router-link 
            to="/tableau-de-bord/entreprise" 
            class="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all cursor-pointer flex items-center space-x-2"
          >
            <span>Explorer l'Espace Entreprise</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </router-link>

          <router-link 
            to="/epreuves/passage" 
            class="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all cursor-pointer flex items-center space-x-2"
          >
            <span class="material-symbols-outlined text-base">play_circle</span>
            <span>Démo Passage Candidat</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Statisitiques Clés -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
        <div class="text-center space-y-1">
          <div class="text-3xl font-extrabold text-white font-mono">10,000+</div>
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Candidats Simultanés</div>
        </div>
        <div class="text-center space-y-1">
          <div class="text-3xl font-extrabold text-indigo-400 font-mono">6 Familles</div>
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Types de Questions</div>
        </div>
        <div class="text-center space-y-1">
          <div class="text-3xl font-extrabold text-emerald-400 font-mono">3 Niveaux</div>
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Surveillance & Proctoring</div>
        </div>
        <div class="text-center space-y-1">
          <div class="text-3xl font-extrabold text-amber-400 font-mono">99.9%</div>
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Disponibilité Haute Capacité</div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités Principales par Profil -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white">4 Profils Métiers sur une Seule Plateforme</h2>
        <p class="text-slate-400 text-sm mt-2">Chaque acteur dispose d'un espace de travail optimisé pour ses responsabilités.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Super Admin -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition-all space-y-4">
          <div class="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <h3 class="text-base font-bold text-white">Super Administrateur</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            Supervision globale du SaaS, gestion des abonnements entreprises, tarifs, statistiques générales et logs de sécurité.
          </p>
          <router-link to="/tableau-de-bord/superadmin" class="inline-flex items-center space-x-1 text-xs font-semibold text-purple-400 hover:underline">
            <span>Accéder au Dashboard</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <!-- Admin Entreprise -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition-all space-y-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">domain</span>
          </div>
          <h3 class="text-base font-bold text-white">Administrateur Entreprise</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            Création des campagnes de recrutement, import massif CSV/Excel des candidats, suivi des invitations et publication des résultats.
          </p>
          <router-link to="/tableau-de-bord/entreprise" class="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-400 hover:underline">
            <span>Accéder au Dashboard</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <!-- Consultant / Évaluateur -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition-all space-y-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">edit_note</span>
          </div>
          <h3 class="text-base font-bold text-white">Consultant / Évaluateur</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            Banque de questions centralisée, création d'examens complexes, correction manuelle avec grille de notation et annotations.
          </p>
          <router-link to="/tableau-de-bord/consultant" class="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-400 hover:underline">
            <span>Accéder au Dashboard</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <!-- Candidat -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition-all space-y-4">
          <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">person_outline</span>
          </div>
          <h3 class="text-base font-bold text-white">Candidat</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            Accès sécurisé sans création obligatoire de compte via token JWT. Passage d'épreuve chronométré avec sauvegarde automatique.
          </p>
          <router-link to="/tableau-de-bord/candidat" class="inline-flex items-center space-x-1 text-xs font-semibold text-amber-400 hover:underline">
            <span>Accéder au Dashboard</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
</script>
