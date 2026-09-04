<template>
  <!-- 
    DispositionB2B.vue (App Shell Maquette Figma Dark Theme)
    Structure d'interface avec Sidebar fixe sombre et Topbar avec switcher de rôles et profil.
  -->
  <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
    
    <!-- Sidebar Sombre Fixe (Style Figma Make) -->
    <aside class="w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col fixed inset-y-0 left-0 z-40">
      
      <!-- Logo EvalPro -->
      <div class="h-16 px-6 border-b border-slate-800/80 flex items-center justify-between">
        <router-link to="/" class="flex items-center space-x-2.5 group">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            E
          </div>
          <div>
            <span class="text-base font-extrabold tracking-tight text-white font-sans">Eval<span class="text-indigo-400">Pro</span></span>
            <span class="block text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Recrutement & Examen</span>
          </div>
        </router-link>
      </div>

      <!-- Navigation Principale -->
      <nav class="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        
        <!-- Groupe 1 : Vue d'ensemble -->
        <div class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Gestion RH</div>
          
          <router-link 
            :to="lienTableauDeBord" 
            class="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            :class="estRouteActive('/tableau-de-bord') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg">dashboard</span>
            <span>Vue d'ensemble</span>
          </router-link>

          <router-link 
            v-if="!magasinAuth.estCandidat"
            to="/campagnes" 
            class="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            :class="estRouteActive('/campagnes') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg">campaign</span>
            <span>Campagnes</span>
          </router-link>

          <router-link 
            v-if="!magasinAuth.estCandidat"
            to="/candidats" 
            class="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            :class="estRouteActive('/candidats') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg">group</span>
            <span>Candidats</span>
          </router-link>
        </div>

        <!-- Groupe 2 : Examens & Question Bank -->
        <div v-if="!magasinAuth.estCandidat" class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Épreuves & Banques</div>
          
          <router-link 
            to="/epreuves/creation" 
            class="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            :class="estRouteActive('/epreuves/creation') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg">quiz</span>
            <span>Épreuves</span>
          </router-link>

          <router-link 
            to="/banque-questions" 
            class="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            :class="estRouteActive('/banque-questions') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg">menu_book</span>
            <span>Banque de questions</span>
          </router-link>
        </div>

        <!-- Groupe 3 : Evaluation & Résultats -->
        <div v-if="!magasinAuth.estCandidat" class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Évaluation & Analytics</div>
          
          <router-link 
            to="/correction" 
            class="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            :class="estRouteActive('/correction') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg">fact_check</span>
            <span>Corrections</span>
          </router-link>

          <router-link 
            to="/resultats" 
            class="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            :class="estRouteActive('/resultats') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg">leaderboard</span>
            <span>Résultats</span>
          </router-link>
        </div>

      </nav>

      <!-- Pied du Sidebar -->
      <div class="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span class="font-medium">EvalPro SaaS v2.5</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Système En Ligne"></span>
        </div>
      </div>

    </aside>

    <!-- Zone de Contenu Principale avec Header -->
    <div class="flex-1 ml-64 flex flex-col min-w-0">
      
      <!-- Topbar Header -->
      <BarreNavigation />

      <!-- Contenu Dynamique de la Page -->
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

const lienTableauDeBord = computed(() => {
  if (magasinAuth.estSuperAdmin) return '/tableau-de-bord/superadmin';
  if (magasinAuth.estAdminEntreprise) return '/tableau-de-bord/entreprise';
  if (magasinAuth.estConsultant) return '/tableau-de-bord/consultant';
  return '/tableau-de-bord/candidat';
});

function estRouteActive(routePath) {
  return route.path.startsWith(routePath);
}
</script>
