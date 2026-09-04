<template>
  <!-- 
    DispositionB2B.vue - Structure principale de l'interface B2B SaaS EvalPro
    Sidebar fixe blanche à gauche + Header blanc en haut + Zone de contenu gris clair.
    Utilisée pour tous les rôles sauf le mode examen candidat (plein écran).
  -->
  <div class="min-h-screen bg-fond-principal text-texte-principal flex font-sans">

    <!-- ================================================
         SIDEBAR FIXE GAUCHE (navigation principale)
         ================================================ -->
    <aside class="w-64 bg-white border-r border-bordure flex flex-col fixed inset-y-0 left-0 z-40 shadow-sm">

      <!-- Logo EvalPro -->
      <div class="h-16 px-6 border-b border-bordure flex items-center">
        <router-link to="/" class="flex items-center space-x-2.5 group">
          <!-- Carré logo avec dégradé bleu indigo -->
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-bleu-600 to-bleu-400 flex items-center justify-center text-white font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform">
            E
          </div>
          <div>
            <span class="text-base font-extrabold tracking-tight text-texte-principal font-titre">
              Eval<span class="text-bleu-600">Pro</span>
            </span>
            <span class="block text-[9px] font-semibold text-texte-muet uppercase tracking-wider">
              Recrutement & Évaluation
            </span>
          </div>
        </router-link>
      </div>

      <!-- Navigation principale par groupes -->
      <nav class="flex-1 overflow-y-auto px-3 py-5 space-y-6">

        <!-- Groupe 1 : Vue d'ensemble & RH -->
        <div class="space-y-0.5">
          <div class="px-3 text-[10px] font-bold text-texte-muet uppercase tracking-wider mb-2">
            Gestion RH
          </div>

          <router-link
            :to="lienTableauDeBord"
            class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            :class="estRouteActive('/tableau-de-bord') ? 'nav-lien-actif' : 'nav-lien-inactif'"
          >
            <span class="material-symbols-outlined text-lg">dashboard</span>
            <span>Vue d'ensemble</span>
          </router-link>

          <router-link
            v-if="!magasinAuth.estCandidat"
            to="/campagnes"
            class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            :class="estRouteActive('/campagnes') ? 'nav-lien-actif' : 'nav-lien-inactif'"
          >
            <span class="material-symbols-outlined text-lg">campaign</span>
            <span>Campagnes</span>
          </router-link>

          <router-link
            v-if="!magasinAuth.estCandidat"
            to="/candidats"
            class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            :class="estRouteActive('/candidats') ? 'nav-lien-actif' : 'nav-lien-inactif'"
          >
            <span class="material-symbols-outlined text-lg">group</span>
            <span>Candidats</span>
          </router-link>
        </div>

        <!-- Groupe 2 : Épreuves & Banque de questions (masqué pour candidat) -->
        <div v-if="!magasinAuth.estCandidat" class="space-y-0.5">
          <div class="px-3 text-[10px] font-bold text-texte-muet uppercase tracking-wider mb-2">
            Épreuves & Banques
          </div>

          <router-link
            to="/epreuves/creation"
            class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            :class="estRouteActive('/epreuves/creation') ? 'nav-lien-actif' : 'nav-lien-inactif'"
          >
            <span class="material-symbols-outlined text-lg">quiz</span>
            <span>Épreuves</span>
          </router-link>

          <router-link
            to="/banque-questions"
            class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            :class="estRouteActive('/banque-questions') ? 'nav-lien-actif' : 'nav-lien-inactif'"
          >
            <span class="material-symbols-outlined text-lg">menu_book</span>
            <span>Banque de questions</span>
          </router-link>
        </div>

        <!-- Groupe 3 : Évaluation & Analytics (masqué pour candidat) -->
        <div v-if="!magasinAuth.estCandidat" class="space-y-0.5">
          <div class="px-3 text-[10px] font-bold text-texte-muet uppercase tracking-wider mb-2">
            Évaluation & Analytics
          </div>

          <router-link
            to="/correction"
            class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            :class="estRouteActive('/correction') ? 'nav-lien-actif' : 'nav-lien-inactif'"
          >
            <span class="material-symbols-outlined text-lg">fact_check</span>
            <span>Corrections</span>
          </router-link>

          <router-link
            to="/resultats"
            class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            :class="estRouteActive('/resultats') ? 'nav-lien-actif' : 'nav-lien-inactif'"
          >
            <span class="material-symbols-outlined text-lg">leaderboard</span>
            <span>Résultats</span>
          </router-link>
        </div>

      </nav>

      <!-- Pied du sidebar : version et indicateur de statut -->
      <div class="p-4 border-t border-bordure bg-fond-secondaire">
        <div class="flex items-center justify-between text-xs text-texte-muet">
          <span class="font-medium">EvalPro SaaS v2.5</span>
          <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-succes animate-pulse"></span>
            <span>En ligne</span>
          </div>
        </div>
      </div>

    </aside>

    <!-- ================================================
         ZONE DE CONTENU (à droite de la sidebar)
         ================================================ -->
    <div class="flex-1 ml-64 flex flex-col min-w-0">

      <!-- Header fixe en haut -->
      <BarreNavigation />

      <!-- Contenu dynamique de la page (injecté par Vue Router) -->
      <main class="flex-1 p-6 md:p-8">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import BarreNavigation from './BarreNavigation.vue';

const route = useRoute();
const magasinAuth = useMagasinAuthentification();

/**
 * Calcule le lien vers le tableau de bord selon le rôle connecté.
 * Chaque rôle a sa propre page d'accueil dans le dashboard.
 */
const lienTableauDeBord = computed(() => {
  if (magasinAuth.estSuperAdmin)      return '/tableau-de-bord/superadmin';
  if (magasinAuth.estAdminEntreprise) return '/tableau-de-bord/entreprise';
  if (magasinAuth.estConsultant)      return '/tableau-de-bord/consultant';
  return '/tableau-de-bord/candidat';
});

/**
 * Vérifie si la route actuelle commence par le chemin donné.
 * Utilisé pour surligner le lien actif dans la navigation.
 *
 * @param {string} routePath - Chemin de route à tester
 * @returns {boolean}
 */
function estRouteActive(routePath) {
  return route.path.startsWith(routePath);
}
</script>
