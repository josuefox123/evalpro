<template>
  <!-- 
    VueCorrectionCopies : Centre de correction pour les Consultants et Évaluateurs.
    Contient la liste des copies soumises et la grille de notation avec commentaires.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-extrabold text-white">Centre de Correction des Examens</h1>
        <p class="text-xs text-slate-400">Évaluez manuellement les réponses ouvertes, attribuez des notes et rédigez des appréciations.</p>
      </div>

      <span class="text-xs font-semibold px-3 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        3 copies en attente de correction
      </span>
    </div>

    <!-- Grille de Correction pour le candidat sélectionné -->
    <GrilleCorrection 
      :candidat="candidatEnCours" 
      :questions="epreuve.questions"
      @validerCorrection="onValiderCorrection"
      @sauvegarderBrouillon="onSauvegarderBrouillon"
    />

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinCandidat } from '../../magasins/candidat.store';
import { useMagasinEpreuve } from '../../magasins/epreuve.store';
import GrilleCorrection from '../../composants/correction/GrilleCorrection.vue';

const router = useRouter();
const magasinCandidat = useMagasinCandidat();
const magasinEpreuve = useMagasinEpreuve();

const candidatEnCours = computed(() => magasinCandidat.candidats[0]);
const epreuve = magasinEpreuve.epreuveActive;

function onValiderCorrection(noteTotale) {
  candidatEnCours.value.noteGlobale = noteTotale;
  candidatEnCours.value.statutComposition = 'terminee';
  alert(`Correction validée avec succès ! Note finale attribuée : ${noteTotale} pts`);
  router.push('/resultats');
}

function onSauvegarderBrouillon() {
  alert('Brouillon de correction sauvegardé.');
}
</script>
