<template>
  <!-- 
    BarreNavigation.vue (Header B2B SaaS)
    En-tête supérieur épuré avec recherche globale, notifications, et profil utilisateur.
  -->
  <header class="bg-white border-b border-bordure h-16 px-6 flex items-center justify-between sticky top-0 z-30 shadow-carte">
    
    <!-- Titre / Contexte d'Espace -->
    <div class="flex items-center space-x-3">
      <h2 class="text-sm font-bold text-texte-principal flex items-center space-x-2">
        <span>Espace {{ magasinAuth.detailsRoleActif.libelle }}</span>
      </h2>
      <span class="text-xs text-texte-muet">|</span>
      <span class="text-xs font-medium text-texte-secondaire">{{ magasinAuth.utilisateurConnecte.entreprise || 'EvalPro SaaS' }}</span>
    </div>

    <!-- Actions Droite (Recherche, Notifications, Profil) -->
    <div class="flex items-center space-x-4">
      
      <!-- Champ Recherche Globale B2B -->
      <div class="hidden sm:flex items-center relative">
        <span class="material-symbols-outlined absolute left-3 text-texte-muet text-sm">search</span>
        <input 
          type="text" 
          placeholder="Rechercher une campagne, candidat..." 
          class="bg-fond-principal border border-bordure rounded-lg pl-9 pr-3 py-1.5 text-xs text-texte-principal placeholder-texte-muet focus:outline-none focus:border-bleu-600 w-64 transition-colors"
        />
      </div>

      <!-- Bouton Examen Candidat (si Candidat) -->
      <router-link 
        v-if="magasinAuth.estCandidat"
        to="/epreuves/passage"
        class="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer"
      >
        <span class="material-symbols-outlined text-sm">play_arrow</span>
        <span>Accéder à l'Épreuve</span>
      </router-link>

      <!-- Notifications Bell -->
      <button class="p-2 text-texte-secondaire hover:text-texte-principal hover:bg-fond-secondaire rounded-lg transition-colors relative cursor-pointer" title="Notifications">
        <span class="material-symbols-outlined text-lg">notifications</span>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-bleu-600"></span>
      </button>

      <!-- User Avatar -->
      <div class="flex items-center space-x-2.5 pl-3 border-l border-bordure">
        <div class="w-8 h-8 rounded-lg bg-bleu-50 border border-bleu-100 flex items-center justify-center text-xs font-bold text-bleu-600">
          {{ initialsUtilisateur }}
        </div>
        <div class="hidden md:block text-left">
          <div class="text-xs font-semibold text-texte-principal">{{ magasinAuth.utilisateurConnecte.nom }}</div>
          <div class="text-[10px] text-texte-secondaire">{{ magasinAuth.detailsRoleActif.libelle }}</div>
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
