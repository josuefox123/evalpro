<template>
  <!-- 
    TableauDeBordEntreprise.vue (Maquette Figma CADashboard Dark)
    Tableau de bord Administrateur Entreprise avec statistiques, campagnes actives et progression.
  -->
  <div class="space-y-8">
    
    <!-- En-tête -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1">
          <span class="material-symbols-outlined text-xs">domain</span>
          <span>TechCorp Algérie</span>
        </div>
        <h1 class="text-2xl font-extrabold text-white">Tableau de Bord Recrutement</h1>
        <p class="text-xs text-slate-400">Gérez vos campagnes d'évaluation, vos candidats et suivez les résultats en direct.</p>
      </div>

      <div class="flex items-center space-x-3">
        <button 
          @click="afficherModalImport = true" 
          class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">upload_file</span>
          <span>Import Massif Candidats</span>
        </button>

        <router-link 
          to="/campagnes/nouvelle" 
          class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">add</span>
          <span>Créer une Campagne</span>
        </router-link>
      </div>
    </div>

    <!-- Cartes Métriques RH (Style Figma Dark) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique 
        titre="Candidats Inscrits" 
        valeur="1,245" 
        icone="group" 
        tendance="+120 cette semaine" 
        :tendancePositive="true"
        couleurFondIcone="bg-indigo-500/10" 
        couleurTexteIcone="text-indigo-400" 
      />

      <CarteStatistique 
        titre="Invitations Envoyées" 
        valeur="1,180" 
        icone="send" 
        tendance="94.7% transmises" 
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-500/10" 
        couleurTexteIcone="text-emerald-400" 
      />

      <CarteStatistique 
        titre="Compositions Réalisées" 
        valeur="943" 
        icone="fact_check" 
        tendance="Taux participation 80%" 
        :tendancePositive="true"
        couleurFondIcone="bg-amber-500/10" 
        couleurTexteIcone="text-amber-400" 
      />

      <CarteStatistique 
        titre="Incidents Détectés" 
        valeur="28" 
        icone="warning" 
        tendance="Surveillance active" 
        :tendancePositive="false"
        couleurFondIcone="bg-rose-500/10" 
        couleurTexteIcone="text-rose-400" 
      />
    </div>

    <!-- Liste des Campagnes Actives (Maquette Figma Style) -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-white flex items-center space-x-2">
          <span class="material-symbols-outlined text-indigo-400">campaign</span>
          <span>Campagnes de Recrutement en Cours</span>
        </h3>

        <router-link to="/campagnes" class="text-xs font-semibold text-indigo-400 hover:underline">
          Voir toutes les campagnes ({{ magasinCampagne.campagnes.length }})
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="campagne in magasinCampagne.campagnes" 
          :key="campagne.id"
          class="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 transition-all"
        >
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">{{ campagne.departement }}</span>
              <h4 class="text-base font-bold text-white mt-0.5">{{ campagne.titre }}</h4>
            </div>
            <BadgesStatut :statut="campagne.statut" />
          </div>

          <div class="grid grid-cols-3 gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
            <div>
              <div class="text-[10px] text-slate-500">Candidats</div>
              <div class="font-bold text-white font-mono">{{ campagne.candidatsCount }}</div>
            </div>
            <div>
              <div class="text-[10px] text-slate-500">Compositions</div>
              <div class="font-bold text-emerald-400 font-mono">{{ campagne.compositionsRealisees }}</div>
            </div>
            <div>
              <div class="text-[10px] text-slate-500">Échéance</div>
              <div class="font-bold text-slate-200">{{ campagne.dateCloture }}</div>
            </div>
          </div>

          <!-- Barre de progression -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-[11px] text-slate-400">
              <span>Taux d'avancement</span>
              <span class="font-bold text-indigo-400">{{ campagne.progression }}%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div class="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" :style="{ width: campagne.progression + '%' }"></div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
            <span class="text-slate-400 flex items-center space-x-1">
              <span class="material-symbols-outlined text-sm text-slate-500">person</span>
              <span>{{ campagne.consultantAssigne }}</span>
            </span>

            <router-link to="/candidats" class="text-indigo-400 font-semibold hover:underline flex items-center space-x-1">
              <span>Gérer les Candidats</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Modale Importation Massif si activée -->
    <div v-if="afficherModalImport" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        <ImporteurMassif @fermer="afficherModalImport = false" @importe="onImporte" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMagasinCampagne } from '../../magasins/campagne.store';
import CarteStatistique from '../../composants/communs/CarteStatistique.vue';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';
import ImporteurMassif from '../../composants/recrutement/ImporteurMassif.vue';

const magasinCampagne = useMagasinCampagne();
const afficherModalImport = ref(false);

function onImporte(nombre) {
  alert(`${nombre} nouveaux candidats importés avec succès !`);
}
</script>
