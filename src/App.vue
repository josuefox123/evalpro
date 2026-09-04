<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
    
    <!-- Sélecteur rapide de rôle (Utile pour tester et basculer instantanément entre les 4 profils) -->
    <SelecteurRole />

    <!-- Barre de navigation principale avec Material Symbols -->
    <BarreNavigation />

    <!-- Vue active selon la route de l'application -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fondu-entre" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Pied de page officiel d'EvalPro -->
    <footer class="bg-slate-900 border-t border-slate-800/80 py-8 mt-12 text-xs text-slate-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center space-x-2">
          <div class="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">E</div>
          <span class="font-bold text-slate-200">EvalPro</span>
          <span>— Plateforme unifiée de recrutement et d'évaluation en ligne.</span>
        </div>
        <div class="flex items-center space-x-6 text-slate-400">
          <router-link to="/" class="hover:text-white transition-colors">Accueil</router-link>
          <router-link to="/connexion" class="hover:text-white transition-colors">Connexion</router-link>
          <span>Sécurité TLS 1.3 & Proctoring</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import SelecteurRole from './composants/communs/SelecteurRole.vue';
import BarreNavigation from './composants/communs/BarreNavigation.vue';
</script>
