<template>
  <!-- 
    VueCampagnes.vue (Gestion des Campagnes de Recrutement B2B)
  -->
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-texte-principal tracking-tight">Gestion des Recrutements</h1>
        <p class="text-xs text-texte-secondaire">Consultez, filtrez et gérez l'état de vos campagnes de recrutement.</p>
      </div>

      <router-link 
        to="/campagnes/nouvelle" 
        class="px-4 py-2 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1.5"
      >
        <span class="material-symbols-outlined text-base">add</span>
        <span>Nouvelle Campagne</span>
      </router-link>
    </div>

    <!-- Filtres B2B -->
    <div class="bg-white border border-bordure rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-carte">
      <div class="w-full sm:w-80">
        <input 
          v-model="magasinCampagne.rechercheTexte"
          type="text" 
          placeholder="Rechercher une campagne ou un poste..." 
          class="w-full bg-fond-principal border border-bordure rounded-lg px-3.5 py-2 text-xs text-texte-principal placeholder-texte-muet focus:outline-none focus:border-bleu-600"
        />
      </div>

      <div class="flex items-center space-x-2 w-full sm:w-auto">
        <span class="text-xs text-texte-secondaire">Statut :</span>
        <select 
          v-model="magasinCampagne.filtreStatut" 
          class="bg-fond-principal border border-bordure rounded-lg px-3 py-2 text-xs text-texte-principal focus:outline-none focus:border-bleu-600"
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
        class="bg-white border border-bordure hover:border-slate-300 rounded-2xl p-6 space-y-4 shadow-carte transition-all"
      >
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase text-texte-muet tracking-wider">{{ campagne.departement }}</span>
            <h3 class="text-base font-bold text-texte-principal mt-0.5">{{ campagne.titre }}</h3>
          </div>
          <BadgesStatut :statut="campagne.statut" />
        </div>

        <div class="space-y-2 text-xs text-texte-secondaire bg-fond-principal p-3 rounded-lg border border-bordure">
          <div class="flex justify-between">
            <span>Poste concerné :</span>
            <span class="font-semibold text-texte-principal">{{ campagne.poste }}</span>
          </div>
          <div class="flex justify-between">
            <span>Candidats inscrits :</span>
            <span class="font-bold text-texte-principal font-mono">{{ campagne.candidatsCount }}</span>
          </div>
          <div class="flex justify-between">
            <span>Consultant assigné :</span>
            <span>{{ campagne.consultantAssigne }}</span>
          </div>
        </div>

        <div class="pt-3 border-t border-bordure flex items-center justify-between text-xs">
          <button 
            @click="changerStatut(campagne)" 
            class="text-texte-secondaire hover:text-texte-principal transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span class="material-symbols-outlined text-sm">sync</span>
            <span>Changer statut</span>
          </button>

          <router-link to="/candidats" class="text-bleu-600 font-semibold hover:underline flex items-center space-x-1">
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
