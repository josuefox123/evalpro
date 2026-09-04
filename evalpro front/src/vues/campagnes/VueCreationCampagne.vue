<template>
  <!-- 
    VueCreationCampagne : Page de création d'une nouvelle campagne de recrutement.
  -->
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    
    <div class="flex items-center space-x-3">
      <router-link to="/campagnes" class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-lg">arrow_back</span>
      </router-link>
      <div>
        <h1 class="text-2xl font-extrabold text-white">Nouvelle Campagne de Recrutement</h1>
        <p class="text-xs text-slate-400">Renseignez les détails du poste et attribuez un évaluateur.</p>
      </div>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
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
