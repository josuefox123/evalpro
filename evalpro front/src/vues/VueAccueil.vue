<template>
  <!--
    VueAccueil.vue - Page publique d'accueil (Landing Page EvalPro)
    Thème clair professionnel : fond blanc et gris très clair.
    Présente la plateforme, les statistiques et les 4 profils utilisateurs.
  -->
  <div class="min-h-screen bg-fond-principal">

    <!-- ================================================
         HEADER PUBLIC (navigation de la landing page)
         ================================================ -->
    <header class="bg-white border-b border-bordure sticky top-0 z-30 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <!-- Logo -->
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-bleu-600 to-bleu-400 flex items-center justify-center text-white font-extrabold text-sm">
            E
          </div>
          <span class="text-base font-extrabold tracking-tight text-texte-principal font-titre">
            Eval<span class="text-bleu-600">Pro</span>
          </span>
        </div>

        <!-- Navigation et CTA -->
        <div class="flex items-center space-x-4">
          <router-link to="/connexion" class="text-sm font-semibold text-texte-secondaire hover:text-texte-principal transition-colors">
            Se connecter
          </router-link>
          <router-link to="/connexion" class="btn-principal text-sm">
            <span>Commencer</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </router-link>
        </div>

      </div>
    </header>

    <!-- ================================================
         SECTION HERO (accroche principale)
         ================================================ -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">

      <!-- Badge de catégorie -->
      <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-bleu-50 border border-bleu-200 text-bleu-600 text-xs font-semibold mb-6">
        <span class="material-symbols-outlined text-sm">rocket_launch</span>
        <span>Plateforme Unifiée de Recrutement & Évaluation</span>
      </div>

      <!-- Titre principal -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-texte-principal leading-tight font-titre max-w-4xl mx-auto mb-6">
        Évaluez vos candidats avec
        <span class="text-bleu-600"> Précision et Sécurité</span>
      </h1>

      <!-- Description -->
      <p class="text-texte-secondaire text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
        De la création de campagnes au classement final : organisez des épreuves techniques,
        surveillez les compositions en temps réel et corrigez automatiquement ou manuellement
        sur une seule plateforme SaaS.
      </p>

      <!-- Boutons d'action principaux -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <router-link to="/connexion" class="btn-principal px-6 py-3 text-sm">
          <span>Explorer l'Espace Entreprise</span>
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </router-link>
        <router-link to="/epreuves/passage" class="btn-secondaire px-6 py-3 text-sm">
          <span class="material-symbols-outlined text-base">play_circle</span>
          <span>Démo Passage Candidat</span>
        </router-link>
      </div>

    </section>

    <!-- ================================================
         SECTION STATISTIQUES (chiffres clés de la plateforme)
         ================================================ -->
    <section class="bg-fond-secondaire border-y border-bordure py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">

          <div class="text-center">
            <div class="text-3xl font-extrabold text-texte-principal font-titre">10 000+</div>
            <div class="text-xs font-semibold text-texte-muet uppercase tracking-wider mt-1">Candidats Simultanés</div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-extrabold text-bleu-600 font-titre">6 Familles</div>
            <div class="text-xs font-semibold text-texte-muet uppercase tracking-wider mt-1">Types de Questions</div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-extrabold text-succes font-titre">3 Niveaux</div>
            <div class="text-xs font-semibold text-texte-muet uppercase tracking-wider mt-1">Surveillance & Proctoring</div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-extrabold text-avertissement font-titre">99,9%</div>
            <div class="text-xs font-semibold text-texte-muet uppercase tracking-wider mt-1">Disponibilité SaaS</div>
          </div>

        </div>
      </div>
    </section>

    <!-- ================================================
         SECTION 4 PROFILS UTILISATEURS
         ================================================ -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      <!-- En-tête de section -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-texte-principal font-titre">
          4 Profils Métiers sur une Seule Plateforme
        </h2>
        <p class="text-texte-secondaire text-sm mt-3">
          Chaque acteur dispose d'un espace de travail optimisé pour ses responsabilités.
        </p>
      </div>

      <!-- Grille des 4 cartes de profil -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <!-- Profil 1 : Super Administrateur -->
        <div class="carte p-6 hover:shadow-carte-md hover:-translate-y-0.5 transition-all space-y-4">
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-role-superadmin flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-texte-principal">Super Administrateur</h3>
            <p class="text-xs text-texte-secondaire leading-relaxed mt-1">
              Supervision globale du SaaS, gestion des abonnements entreprises, tarifs et logs de sécurité.
            </p>
          </div>
          <router-link to="/tableau-de-bord/superadmin" class="inline-flex items-center space-x-1 text-xs font-semibold text-role-superadmin hover:underline">
            <span>Accéder au Dashboard</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <!-- Profil 2 : Administrateur Entreprise -->
        <div class="carte p-6 hover:shadow-carte-md hover:-translate-y-0.5 transition-all space-y-4">
          <div class="w-12 h-12 rounded-xl bg-bleu-50 text-bleu-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">domain</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-texte-principal">Administrateur Entreprise</h3>
            <p class="text-xs text-texte-secondaire leading-relaxed mt-1">
              Création des campagnes de recrutement, import massif CSV/Excel et publication des classements.
            </p>
          </div>
          <router-link to="/tableau-de-bord/entreprise" class="inline-flex items-center space-x-1 text-xs font-semibold text-bleu-600 hover:underline">
            <span>Accéder au Dashboard</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <!-- Profil 3 : Consultant / Evaluateur -->
        <div class="carte p-6 hover:shadow-carte-md hover:-translate-y-0.5 transition-all space-y-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-role-consultant flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">edit_note</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-texte-principal">Consultant / Evaluateur</h3>
            <p class="text-xs text-texte-secondaire leading-relaxed mt-1">
              Banque de questions centralisée, création d'examens complexes et grille de correction manuelle.
            </p>
          </div>
          <router-link to="/tableau-de-bord/consultant" class="inline-flex items-center space-x-1 text-xs font-semibold text-role-consultant hover:underline">
            <span>Accéder au Dashboard</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

        <!-- Profil 4 : Candidat -->
        <div class="carte p-6 hover:shadow-carte-md hover:-translate-y-0.5 transition-all space-y-4">
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-role-candidat flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">person_outline</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-texte-principal">Candidat</h3>
            <p class="text-xs text-texte-secondaire leading-relaxed mt-1">
              Accès sécurisé par invitation JWT. Passage d'épreuve chronométré avec sauvegarde automatique toutes les 30s.
            </p>
          </div>
          <router-link to="/tableau-de-bord/candidat" class="inline-flex items-center space-x-1 text-xs font-semibold text-role-candidat hover:underline">
            <span>Accéder au Dashboard</span>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
          </router-link>
        </div>

      </div>
    </section>

    <!-- ================================================
         FOOTER PUBLIC
         ================================================ -->
    <footer class="bg-fond-secondaire border-t border-bordure py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-xs text-texte-muet">
          EvalPro SaaS - Plateforme B2B de Recrutement et d'Evaluation en Ligne
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup>
// Cette page est entièrement statique (pas d'état réactif nécessaire)
// Les liens sont gérés par Vue Router
</script>
