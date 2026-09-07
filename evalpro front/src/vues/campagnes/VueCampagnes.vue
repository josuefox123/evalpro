<template>
  <!--
    VueCampagnes.vue - Interface B2B SaaS de Gestion des Campagnes EvalPro
  -->
  <div class="space-y-6">

    <!-- En-tête de page -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-ep-border shadow-ep-card">
      <div>
        <div class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-ep-primary border border-blue-100 mb-2">
          <span class="material-symbols-outlined text-xs">campaign</span>
          <span>Gestion RH</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">Campagnes de Recrutement</h1>
        <p class="text-xs text-ep-muted mt-1">Créez, filtrez et suivez l'avancement de vos campagnes d'évaluation en direct.</p>
      </div>

      <EpButton variant="primary" size="sm" iconLeft="add" @click="$router.push('/campagnes/nouvelle')">
        Nouvelle Campagne
      </EpButton>
    </div>

    <!-- Barre de recherche et filtres B2B -->
    <div class="bg-white border border-ep-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-ep-card">
      <div class="w-full sm:w-80">
        <EpInput
          v-model="magasinCampagne.rechercheTexte"
          placeholder="Rechercher une campagne ou un poste..."
          iconLeft="search"
        />
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
        <span class="text-xs font-semibold text-ep-muted">Statut :</span>
        <div class="w-48">
          <EpSelect v-model="magasinCampagne.filtreStatut">
            <option value="TOUS">Tous les statuts</option>
            <option value="ACTIVE">Active</option>
            <option value="BROUILLON">Brouillon</option>
            <option value="CLOTUREE">Clôturée</option>
            <option value="PUBLIEE">Publiée</option>
          </EpSelect>
        </div>
      </div>
    </div>

    <!-- Liste / Grille des Campagnes -->
    <div v-if="magasinCampagne.campagnesFiltrees.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="campagne in magasinCampagne.campagnesFiltrees"
        :key="campagne.id"
        class="bg-white border border-ep-border hover:border-slate-300 rounded-xl p-6 space-y-4 shadow-ep-card transition-all flex flex-col justify-between"
      >
        <div class="space-y-4">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[10px] font-bold uppercase text-ep-muted tracking-wider">{{ campagne.departement }}</span>
              <h3 class="text-base font-bold text-ep-text mt-0.5">{{ campagne.titre }}</h3>
            </div>
            <BadgesStatut :statut="campagne.statut" />
          </div>

          <div class="space-y-2 text-xs text-ep-muted bg-slate-50 p-3.5 rounded-lg border border-ep-border">
            <div class="flex justify-between">
              <span>Poste :</span>
              <span class="font-semibold text-ep-text">{{ campagne.poste }}</span>
            </div>
            <div class="flex justify-between">
              <span>Candidats :</span>
              <span class="font-bold text-ep-text font-mono">{{ campagne.candidatsCount }}</span>
            </div>
            <div class="flex justify-between">
              <span>Consultant :</span>
              <span class="font-medium text-slate-700">{{ campagne.consultantAssigne }}</span>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-ep-border flex items-center justify-between text-xs">
          <button
            @click="changerStatut(campagne)"
            class="text-ep-muted hover:text-ep-text transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
            title="Changer de statut"
          >
            <span class="material-symbols-outlined text-base text-ep-primary">sync</span>
            <span>Changer statut</span>
          </button>

          <router-link to="/candidats" class="text-ep-primary font-semibold hover:underline flex items-center gap-1">
            <span>Gérer candidats</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- État vide -->
    <EpEmptyState
      v-else
      title="Aucune campagne de recrutement trouvée"
      description="Aucune campagne ne correspond à vos critères de recherche ou vous n'avez pas encore créé de campagne."
      icon="campaign"
    >
      <template #action>
        <EpButton variant="primary" size="sm" iconLeft="add" @click="$router.push('/campagnes/nouvelle')">
          Créer une première campagne
        </EpButton>
      </template>
    </EpEmptyState>

  </div>
</template>

<script setup>
import { useMagasinCampagne } from '../../magasins/campagne.store';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';
import EpButton from '../../composants/systeme/EpButton.vue';
import EpInput from '../../composants/systeme/EpInput.vue';
import EpSelect from '../../composants/systeme/EpSelect.vue';
import EpEmptyState from '../../composants/systeme/EpEmptyState.vue';

const magasinCampagne = useMagasinCampagne();

function changerStatut(campagne) {
  const nouveauxStatuts = { BROUILLON: 'ACTIVE', ACTIVE: 'CLOTUREE', CLOTUREE: 'PUBLIEE', PUBLIEE: 'BROUILLON' };
  const suivant = nouveauxStatuts[campagne.statut] || 'ACTIVE';
  magasinCampagne.changerStatutCampagne(campagne.id, suivant);
}
</script>
