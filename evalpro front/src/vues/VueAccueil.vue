<template>
  <!-- 
    VueAccueil.vue (Landing Page SaaS B2B EvalPro)
    Présentation sobre et professionnelle du produit HR Tech EvalPro.
  -->
  <div class="min-h-screen bg-fond-principal flex flex-col justify-between">
    
    <!-- En-tête Navigation Landing -->
    <header class="bg-white border-b border-bordure py-4 px-6 sticky top-0 z-30 shadow-carte">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <router-link to="/" class="flex items-center space-x-2.5">
          <div class="w-9 h-9 rounded-xl bg-bleu-600 flex items-center justify-center text-white font-extrabold text-base shadow-carte">
            E
          </div>
          <div>
            <span class="text-xl font-extrabold tracking-tight text-texte-principal font-sans">EVAL<span class="text-bleu-600">PRO</span></span>
            <span class="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-bleu-50 text-bleu-600 border border-bleu-100">SaaS B2B HR Tech</span>
          </div>
        </router-link>

        <div class="flex items-center space-x-4">
          <router-link to="/connexion" class="text-xs font-semibold text-texte-secondaire hover:text-texte-principal transition-colors">
            Connexion Espace
          </router-link>
          <router-link 
            to="/tableau-de-bord/entreprise" 
            class="px-4 py-2 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer"
          >
            Accéder à la Démo
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section B2B SaaS -->
    <section class="py-20 px-4 max-w-5xl mx-auto text-center space-y-6">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bleu-50 border border-bleu-200 text-bleu-700 text-xs font-semibold">
        <span class="material-symbols-outlined text-sm">verified</span>
        <span>Plateforme B2B Unifiée d'Évaluation & Recrutement</span>
      </div>

      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-texte-principal leading-tight font-sans">
        Gérez l'ensemble de vos évaluations de recrutement sur une <span class="text-bleu-600">plateforme unifiée et sécurisée</span>
      </h1>

      <p class="text-texte-secondaire text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
        Création de campagnes, import massif CSV/Excel, concepteur d'épreuves multi-formats, proctoring anti-fraude et grilles de correction manuelle.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
        <router-link 
          to="/tableau-de-bord/entreprise" 
          class="px-6 py-3.5 rounded-xl bg-bleu-600 hover:bg-bleu-700 text-white font-semibold text-sm shadow-carte transition-colors cursor-pointer flex items-center space-x-2"
        >
          <span>Espace Administrateur Entreprise</span>
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </router-link>

        <router-link 
          to="/epreuves/passage" 
          class="px-6 py-3.5 rounded-xl bg-white hover:bg-fond-secondaire text-texte-principal border border-bordure font-semibold text-sm shadow-carte transition-colors cursor-pointer flex items-center space-x-2"
        >
          <span class="material-symbols-outlined text-base">play_circle</span>
          <span>Démo Examen Candidat</span>
        </router-link>
      </div>
    </section>

    <!-- Grille des 4 Profils SaaS -->
    <section class="max-w-7xl mx-auto px-6 py-12 w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-3">
          <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <span class="material-symbols-outlined text-xl">admin_panel_settings</span>
          </div>
          <h3 class="text-base font-bold text-texte-principal">Super Administrateur</h3>
          <p class="text-xs text-texte-secondaire leading-relaxed">Supervision des entreprises clientes, formules d'abonnement MRR, logs système et paramètres de sécurité.</p>
          <router-link to="/tableau-de-bord/superadmin" class="inline-flex items-center space-x-1 text-xs font-semibold text-bleu-600 hover:underline">
            <span>Voir Espace SuperAdmin</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-3">
          <div class="w-10 h-10 rounded-xl bg-bleu-50 text-bleu-600 flex items-center justify-center border border-bleu-100">
            <span class="material-symbols-outlined text-xl">domain</span>
          </div>
          <h3 class="text-base font-bold text-texte-principal">Admin Entreprise</h3>
          <p class="text-xs text-texte-secondaire leading-relaxed">Création des campagnes de recrutement, import massif des candidats et publication des classements.</p>
          <router-link to="/tableau-de-bord/entreprise" class="inline-flex items-center space-x-1 text-xs font-semibold text-bleu-600 hover:underline">
            <span>Voir Espace Entreprise</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <span class="material-symbols-outlined text-xl">edit_note</span>
          </div>
          <h3 class="text-base font-bold text-texte-principal">Consultant / Évaluateur</h3>
          <p class="text-xs text-texte-secondaire leading-relaxed">Banque de questions centralisée, création d'examens complexes et grille d'évaluation manuelle.</p>
          <router-link to="/tableau-de-bord/consultant" class="inline-flex items-center space-x-1 text-xs font-semibold text-bleu-600 hover:underline">
            <span>Voir Espace Consultant</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-3">
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <span class="material-symbols-outlined text-xl">person_outline</span>
          </div>
          <h3 class="text-base font-bold text-texte-principal">Candidat</h3>
          <p class="text-xs text-texte-secondaire leading-relaxed">Accès sécurisé sans création obligatoire de compte par lien JWT. Interface d'examen sobre sans distraction.</p>
          <router-link to="/tableau-de-bord/candidat" class="inline-flex items-center space-x-1 text-xs font-semibold text-bleu-600 hover:underline">
            <span>Voir Espace Candidat</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

      </div>
    </section>

    <!-- Pied de Page B2B -->
    <footer class="bg-white border-t border-bordure py-6 px-6 text-xs text-texte-secondaire">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <span>EvalPro SaaS HR Tech © 2026</span>
        <span>Plateforme unifiée d'évaluation et de recrutement en ligne.</span>
      </div>
    </footer>

  </div>
</template>

<script setup>
</script>
