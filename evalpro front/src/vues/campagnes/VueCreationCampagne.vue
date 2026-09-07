<template>
  <!--
    VueCreationCampagne.vue : Création d'une nouvelle campagne de recrutement
  -->
  <div class="max-w-3xl mx-auto px-4 py-6 space-y-6">

    <div class="flex items-center gap-3">
      <router-link to="/campagnes" class="p-2 rounded-lg bg-white border border-ep-border text-ep-muted hover:text-ep-text transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-lg">arrow_back</span>
      </router-link>
      <div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">Nouvelle Campagne de Recrutement</h1>
        <p class="text-xs text-ep-muted">Renseignez les détails du poste et attribuez un évaluateur.</p>
      </div>
    </div>

    <div class="bg-white border border-ep-border rounded-xl p-6 sm:p-8 shadow-ep-card">
      <FormulaireCampagne @enregistrer="onEnregistrer" @annuler="onAnnuler" />
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useMagasinCampagne } from '../../magasins/campagne.store';
import FormulaireCampagne from '../../composants/recrutement/FormulaireCampagne.vue';

const router = useRouter();
const magasinCampagne = useMagasinCampagne();

function onEnregistrer(donnees) {
  magasinCampagne.ajouterCampagne(donnees);
  router.push('/campagnes');
}

function onAnnuler() {
  router.push('/campagnes');
}
</script>
