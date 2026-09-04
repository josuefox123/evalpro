<template>
  <!-- 
    DispositionB2B.vue (App Shell SaaS B2B)
    Fournit la structure d'interface SaaS B2B avec Sidebar fixe à gauche
    et zone de contenu principale sur fond #F8FAFC.
  -->
  <div class="min-h-screen bg-fond-principal flex text-texte-principal font-sans">
    
    <!-- Sidebar B2B Fixe -->
    <aside class="w-64 bg-white border-r border-bordure flex flex-col fixed inset-y-0 left-0 z-40">
      
      <!-- Logo EvalPro B2B -->
      <div class="h-16 px-6 border-b border-bordure flex items-center justify-between">
        <router-link to="/" class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-lg bg-bleu-600 flex items-center justify-center text-white font-extrabold text-sm shadow-carte">
            E
          </div>
          <div>
            <span class="text-base font-extrabold tracking-tight text-texte-principal">EVAL<span class="text-bleu-600">PRO</span></span>
            <span class="block text-[9px] font-medium text-texte-secondaire uppercase tracking-wider">Recruter avec précision</span>
          </div>
        </router-link>
      </div>

      <!-- Navigation Principale B2B -->
      <nav class="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        
        <!-- Groupe 1 : Vue d'ensemble & Recrutement -->
        <div class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-texte-muet uppercase tracking-wider mb-2">Gestion RH</div>
          
          <router-link 
            :to="lienTableauDeBord" 
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            :class="estRouteActive('/tableau-de-bord') ? 'bg-bleu-50 text-bleu-600 border border-bleu-100' : 'text-texte-secondaire hover:bg-fond-secondaire hover:text-texte-principal'"
          >
            <span class="material-symbols-outlined text-lg">dashboard</span>
            <span>Vue d'ensemble</span>
          </router-link>

          <router-link 
            v-if="!magasinAuth.estCandidat"
            to="/campagnes" 
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            :class="estRouteActive('/campagnes') ? 'bg-bleu-50 text-bleu-600 border border-bleu-100' : 'text-texte-secondaire hover:bg-fond-secondaire hover:text-texte-principal'"
          >
            <span class="material-symbols-outlined text-lg">campaign</span>
            <span>Recrutements</span>
          </router-link>

          <router-link 
            v-if="!magasinAuth.estCandidat"
            to="/candidats" 
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            :class="estRouteActive('/candidats') ? 'bg-bleu-50 text-bleu-600 border border-bleu-100' : 'text-texte-secondaire hover:bg-fond-secondaire hover:text-texte-principal'"
          >
            <span class="material-symbols-outlined text-lg">group</span>
            <span>Candidats</span>
          </router-link>
        </div>

        <!-- Groupe 2 : Examens & Question Bank -->
        <div v-if="!magasinAuth.estCandidat" class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-texte-muet uppercase tracking-wider mb-2">Épreuves & Banques</div>
          
          <router-link 
            to="/epreuves/creation" 
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            :class="estRouteActive('/epreuves/creation') ? 'bg-bleu-50 text-bleu-600 border border-bleu-100' : 'text-texte-secondaire hover:bg-fond-secondaire hover:text-texte-principal'"
          >
            <span class="material-symbols-outlined text-lg">quiz</span>
            <span>Épreuves</span>
          </router-link>

          <router-link 
            to="/banque-questions" 
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            :class="estRouteActive('/banque-questions') ? 'bg-bleu-50 text-bleu-600 border border-bleu-100' : 'text-texte-secondaire hover:bg-fond-secondaire hover:text-texte-principal'"
          >
            <span class="material-symbols-outlined text-lg">menu_book</span>
            <span>Banque de questions</span>
          </router-link>
        </div>

        <!-- Groupe 3 : Evaluation & Résultats -->
        <div v-if="!magasinAuth.estCandidat" class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-texte-muet uppercase tracking-wider mb-2">Évaluation & Analytics</div>
          
          <router-link 
            to="/correction" 
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            :class="estRouteActive('/correction') ? 'bg-bleu-50 text-bleu-600 border border-bleu-100' : 'text-texte-secondaire hover:bg-fond-secondaire hover:text-texte-principal'"
          >
            <span class="material-symbols-outlined text-lg">fact_check</span>
            <span>Corrections</span>
          </router-link>

          <router-link 
            to="/resultats" 
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            :class="estRouteActive('/resultats') ? 'bg-bleu-50 text-bleu-600 border border-bleu-100' : 'text-texte-secondaire hover:bg-fond-secondaire hover:text-texte-principal'"
          >
            <span class="material-symbols-outlined text-lg">leaderboard</span>
            <span>Résultats</span>
          </router-link>
        </div>

      </nav>

      <!-- Pied du Sidebar B2B -->
      <div class="p-4 border-t border-bordure bg-fond-principal">
        <div class="flex items-center justify-between text-xs text-texte-secondaire">
          <span class="font-medium">SaaS Version 2.5</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500" title="Système En Ligne"></span>
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
