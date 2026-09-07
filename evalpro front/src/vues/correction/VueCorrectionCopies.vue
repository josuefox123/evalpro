<template>
  <!--
    VueCorrectionCopies.vue - Centre de correction pour les évaluateurs EvalPro
  -->
  <div class="space-y-6">

    <!-- En-tête de page -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-ep-border shadow-ep-card">
      <div>
        <div class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-ep-primary border border-blue-100 mb-2">
          <span class="material-symbols-outlined text-xs">fact_check</span>
          <span>Espace Évaluation</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">Centre de Correction des Examens</h1>
        <p class="text-xs text-ep-muted mt-1">Évaluez manuellement les réponses ouvertes, attribuez les notes et ajoutez vos commentaires.</p>
      </div>

      <span class="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
        3 copies en attente de correction
      </span>
    </div>

    <!-- Grille 3 Colonnes de Correction -->
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
import { useMagasinNotification } from '../../magasins/notification.store';
import GrilleCorrection from '../../composants/correction/GrilleCorrection.vue';

const router = useRouter();
const magasinCandidat = useMagasinCandidat();
const magasinEpreuve = useMagasinEpreuve();
const magasinNotif = useMagasinNotification();

const candidatEnCours = computed(() => magasinCandidat.candidats[0]);
const epreuve = magasinEpreuve.epreuveActive;

function onValiderCorrection(noteTotale) {
  candidatEnCours.value.noteGlobale = noteTotale;
  candidatEnCours.value.statutComposition = 'terminee';
  magasinNotif.succes(`Correction validée avec succès ! Note finale attribuée : ${noteTotale} pts`, "Correction enregistrée");
  router.push('/resultats');
}

function onSauvegarderBrouillon() {
  magasinNotif.info('Brouillon de correction sauvegardé.', 'Sauvegarde temporaire');
}
</script>
