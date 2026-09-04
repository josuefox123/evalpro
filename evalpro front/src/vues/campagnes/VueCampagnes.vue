<template>
  <!-- 
    VueCampagnes : Liste et gestion des campagnes de recrutement d'une entreprise.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white">Gestion des Campagnes de Recrutement</h1>
        <p class="text-xs text-slate-400">Consultez, filtrez et gérez le statut de vos campagnes actives ou clôturées.</p>
      </div>

      <router-link 
        to="/campagnes/nouvelle" 
        class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
      >
        <span class="material-symbols-outlined text-base">add</span>
        <span>Nouvelle Campagne</span>
      </router-link>
    </div>

    <!-- Barre de filtres et recherche -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="w-full sm:w-80">
        <input 
          v-model="magasinCampagne.rechercheTexte"
          type="text" 
          placeholder="Rechercher une campagne ou un poste..." 
          class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div class="flex items-center space-x-2 w-full sm:w-auto">
        <span class="text-xs text-slate-400">Statut :</span>
        <select 
          v-model="magasinCampagne.filtreStatut" 
          class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="TOUS">Tous les statuts</option>
          <option value="ACTIVE">Active</option>
          <option value="BROUILLON">Brouillon</option>
          <option value="CLOTUREE">Clôturée</option>
          <option value="PUBLIEE">Publiée</option>
        </select>
      </div>
    </div>

    <!-- Grille des Campagnes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div 
        v-for="campagne in magasinCampagne.campagnesFiltrees" 
        :key="campagne.id"
        class="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 shadow-lg transition-all"
      >
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">{{ campagne.departement }}</span>
            <h3 class="text-base font-bold text-white mt-0.5">{{ campagne.titre }}</h3>
          </div>
          <BadgesStatut :statut="campagne.statut" />
        </div>

        <div class="space-y-2 text-xs text-slate-300">
          <div class="flex justify-between">
            <span class="text-slate-500">Poste :</span>
            <span class="font-medium text-slate-200">{{ campagne.poste }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Candidats :</span>
            <span class="font-bold text-white font-mono">{{ campagne.candidatsCount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Consultant :</span>
            <span class="text-slate-300">{{ campagne.consultantAssigne }}</span>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <button 
            @click="changerStatut(campagne)" 
            class="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span class="material-symbols-outlined text-sm">sync</span>
            <span>Changer statut</span>
          </button>

          <router-link to="/candidats" class="text-indigo-400 font-semibold hover:underline flex items-center space-x-1">
            <span>Détails</span>
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useMagasinCampagne } from '../../magasins/campagne.store';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';

const magasinCampagne = useMagasinCampagne();

function changerStatut(campagne) {
  const nouveauxStatuts = { BROUILLON: 'ACTIVE', ACTIVE: 'CLOTUREE', CLOTUREE: 'PUBLIEE', PUBLIEE: 'BROUILLON' };
  const suivant = nouveauxStatuts[campagne.statut] || 'ACTIVE';
  magasinCampagne.changerStatutCampagne(campagne.id, suivant);
}
</script>
