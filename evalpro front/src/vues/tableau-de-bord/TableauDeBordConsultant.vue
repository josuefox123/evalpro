<template>
  <!-- 
    TableauDeBordConsultant : Espace du Consultant / Évaluateur (ex: Dr. Karim Benali).
    Affiche la banque de questions, les épreuves à concevoir et les copies en attente de correction.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    
    <!-- En-tête -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
          <span class="material-symbols-outlined text-xs">edit_note</span>
          <span>Espace Consultant & Évaluateur</span>
        </div>
        <h1 class="text-2xl font-extrabold text-white">Centre de Conception et de Correction</h1>
        <p class="text-xs text-slate-400">Gérez vos banques de questions, concevez vos examens et évaluez les copies attribuées.</p>
      </div>

      <div class="flex items-center space-x-3">
        <router-link 
          to="/epreuves/creation" 
          class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">note_add</span>
          <span>Concevoir une Épreuve</span>
        </router-link>
      </div>
    </div>

    <!-- Métriques Consultant -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique 
        titre="Questions en Banque" 
        valeur="142" 
        icone="quiz" 
        tendance="+12 ce mois" 
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-500/10" 
        couleurTexteIcone="text-emerald-400" 
      />

      <CarteStatistique 
        titre="Copies à Corriger" 
        valeur="8" 
        icone="rule" 
        tendance="Priorité Haute" 
        :tendancePositive="false"
        couleurFondIcone="bg-amber-500/10" 
        couleurTexteIcone="text-amber-400" 
      />

      <CarteStatistique 
        titre="Épreuves Conçues" 
        valeur="19" 
        icone="assignment" 
        tendance="4 en cours" 
        :tendancePositive="true"
        couleurFondIcone="bg-indigo-500/10" 
        couleurTexteIcone="text-indigo-400" 
      />

      <CarteStatistique 
        titre="Note Moyenne Évaluée" 
        valeur="74.2 / 100" 
        icone="grade" 
        tendance="Constante" 
        :tendancePositive="true"
        couleurFondIcone="bg-purple-500/10" 
        couleurTexteIcone="text-purple-400" 
      />
    </div>

    <!-- Copies en Attente de Correction Manuelle -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-white flex items-center space-x-2">
          <span class="material-symbols-outlined text-emerald-400">fact_check</span>
          <span>Copies en Attente de Evaluation Manuelle (Grille & Annotations)</span>
        </h3>

        <router-link to="/correction" class="text-xs font-semibold text-emerald-400 hover:underline">
          Accéder à la grille complète
        </router-link>
      </div>

      <div class="space-y-3">
        <div 
          v-for="candidat in candidatsAcorriger" 
          :key="candidat.id"
          class="bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex items-center justify-between transition-colors"
        >
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400">
              {{ candidat.prenom[0] }}{{ candidat.nom[0] }}
            </div>
            <div>
              <div class="text-sm font-bold text-white">{{ candidat.prenom }} {{ candidat.nom }}</div>
              <div class="text-xs text-slate-400">{{ candidat.poste }} • Soumis le 14 Jan 2025</div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <span class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
              Correction Manuelle Requise
            </span>

            <router-link 
              to="/correction" 
              class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-all cursor-pointer flex items-center space-x-1"
            >
              <span class="material-symbols-outlined text-sm">edit</span>
              <span>Evaluer la copie</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMagasinCandidat } from '../../magasins/candidat.store';
import CarteStatistique from '../../composants/communs/CarteStatistique.vue';

const magasinCandidat = useMagasinCandidat();
const candidatsAcorriger = computed(() => magasinCandidat.candidats.slice(0, 3));
</script>
