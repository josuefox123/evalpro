<template>
  <!--
    App.vue - Composant racine de l'application EvalPro SaaS B2B
  -->
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans">

    <!-- Notifications Toast globales -->
    <EpToast />

    <!-- Interface Administrateur (Sidebar + Topbar B2B) -->
    <DispositionB2B v-if="estDashboard">
      <router-view />
    </DispositionB2B>

    <!-- Interfaces Standalone / Publiques (Accueil, Connexion, Examen Candidat) -->
    <main v-else class="min-h-screen">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DispositionB2B from './composants/communs/DispositionB2B.vue';
import EpToast from './composants/systeme/EpToast.vue';

const route = useRoute();

const estDashboard = computed(() => {
  if (route.meta && route.meta.standalone) {
    return false;
  }
  const p = route.path;
  if (p === '/' || p === '/connexion' || p === '/acces-candidat' || p === '/login' || p === '/epreuves/passage' || p === '/candidat/verification') {
    return false;
  }
  return true;
});
</script>
