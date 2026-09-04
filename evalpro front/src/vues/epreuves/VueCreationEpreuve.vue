<template>
  <!-- 
    VueCreationEpreuve.vue (Page Éditeur d'Épreuves B2B)
    Englobe le composant ConcepteurEpreuve.vue (Exam Builder 3 colonnes)
  -->
  <div class="space-y-6">
    <div class="flex items-center space-x-3">
      <router-link to="/banque-questions" class="p-2 rounded-lg bg-white border border-bordure text-texte-secondaire hover:text-texte-principal transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-lg">arrow_back</span>
      </router-link>
      <div>
        <h1 class="text-2xl font-extrabold text-texte-principal tracking-tight">Concepteur d'Épreuves & Exam Builder</h1>
        <p class="text-xs text-texte-secondaire">Créez et organisez vos épreuves techniques en 3 colonnes : types, structure et barème.</p>
      </div>
    </div>

    <!-- Composant Exam Builder 3 Colonnes -->
    <ConcepteurEpreuve />
  </div>
</template>

<script setup>
import ConcepteurEpreuve from '../../composants/epreuves/ConcepteurEpreuve.vue';
</script>
