<template>
  <!-- 
    BarreNavigation.vue (Header Maquette Figma Sombre)
    Header avec fond sombre slate-900/90, recherche globale, notifications et profil utilisateur.
  -->
  <header class="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 h-16 px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
    
    <!-- Titre / Contexte d'Espace -->
    <div class="flex items-center space-x-3">
      <h2 class="text-sm font-bold text-white flex items-center space-x-2">
        <span>Espace {{ magasinAuth.detailsRoleActif.libelle }}</span>
      </h2>
      <span class="text-xs text-slate-600">|</span>
      <span class="text-xs font-medium text-indigo-400">{{ magasinAuth.utilisateurConnecte.entreprise || 'EvalPro SaaS' }}</span>
    </div>

    <!-- Actions Droite (Recherche, Notifications, Profil) -->
    <div class="flex items-center space-x-4">
      
      <!-- Champ Recherche Globale -->
      <div class="hidden sm:flex items-center relative">
        <span class="material-symbols-outlined absolute left-3 text-slate-500 text-sm">search</span>
        <input 
          type="text" 
          placeholder="Rechercher une campagne, candidat..." 
          class="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 w-64 transition-colors"
        />
      </div>

      <!-- Bouton Examen Candidat (si Candidat) -->
      <router-link 
        v-if="magasinAuth.estCandidat"
        to="/epreuves/passage"
        class="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
      >
        <span class="material-symbols-outlined text-sm">play_arrow</span>
        <span>Commencer l'Épreuve</span>
      </router-link>

      <!-- Notifications Bell -->
      <button class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors relative cursor-pointer" title="Notifications">
        <span class="material-symbols-outlined text-lg">notifications</span>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
      </button>

      <!-- User Avatar -->
      <div class="flex items-center space-x-2.5 pl-3 border-l border-slate-800">
        <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400">
          {{ initialsUtilisateur }}
        </div>
        <div class="hidden md:block text-left">
          <div class="text-xs font-semibold text-slate-200">{{ magasinAuth.utilisateurConnecte.nom }}</div>
          <div class="text-[10px] text-slate-400">{{ magasinAuth.detailsRoleActif.libelle }}</div>
        </div>
      </div>

    </div>

  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useMagasinAuthentification } from '../../magasins/authentification.store';

const magasinAuth = useMagasinAuthentification();

const initialsUtilisateur = computed(() => {
  const nom = magasinAuth.utilisateurConnecte.nom || 'User';
  return nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});
</script>
