<template>
  <!--
    App.vue - Composant racine de l'application EvalPro
  -->
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans" v-cloak>

    <!-- Notifications Toast globales -->
    <EpToast />

    <!-- Interface Administrateur (Sidebar + Topbar) -->
    <DispositionB2B v-if="estDashboard">
      <router-view v-slot="{ Component }">
        <transition name="fondu-entre" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </DispositionB2B>

    <!-- Interfaces Standalone / Publiques (Accueil, Connexion, Accès Candidat, Examen) -->
    <main v-else class="min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="fondu-entre" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMagasinAuthentification } from './magasins/authentification.store';
import DispositionB2B from './composants/communs/DispositionB2B.vue';
import EpToast from './composants/systeme/EpToast.vue';

const route = useRoute();
const magasinAuth = useMagasinAuthentification();

// Scroll en haut à chaque changement de route (garantie supplémentaire)
watch(() => route.fullPath, () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

/**
 * Détermine rigoureusement si la route courante est un dashboard interne connecté (avec Sidebar B2B)
 */
const estDashboard = computed(() => {
  // Normalisation du path sans slash final
  const path = route.path ? route.path.toLowerCase().replace(/\/+$/, '') : '';

  // 1. Routes autonomes/publiques qui ne DOIVENT JAMAIS afficher la barre latérale admin
  const routesStandalone = [
    '', '/', '/connexion', '/acces-candidat', '/login',
    '/epreuves/passage', '/candidat/verification', '/candidat/confirmation'
  ];

  if (routesStandalone.includes(path) || (route.meta && route.meta.standalone)) {
    return false;
  }

  // 2. Seules les routes commençant par un préfixe de dashboard interne et avec session active affichent la Sidebar
  const prfixeDashboard = [
    '/tableau-de-bord', '/campagnes', '/candidats', '/banque-questions',
    '/correction', '/resultats'
  ];

  const estCheminDashboard = prfixeDashboard.some(prefixe => path.startsWith(prefixe));

  return estCheminDashboard && magasinAuth.estAuthentifie;
});
</script>
