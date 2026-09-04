<template>
  <!-- 
    TableauDeBordConsultant.vue (Espace Consultant / Évaluateur B2B)
    Interface d'évaluation manuelle des copies, banques de questions et notation.
  -->
  <div class="space-y-8">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1">
          <span class="material-symbols-outlined text-xs">edit_note</span>
          <span>Espace Évaluateur & Consultant</span>
        </div>
        <h1 class="text-2xl font-extrabold text-texte-principal tracking-tight">Centre de Conception & Correction</h1>
        <p class="text-xs text-texte-secondaire">Concevez des épreuves, créez des questions et évaluez les copies soumises.</p>
      </div>

      <router-link 
        to="/epreuves/creation" 
        class="px-4 py-2 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1.5"
      >
        <span class="material-symbols-outlined text-base">note_add</span>
        <span>Concevoir une Épreuve</span>
      </router-link>
    </div>

    <!-- Métriques Consultant -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique 
        titre="Questions en Banque" 
        valeur="142" 
        icone="menu_book" 
        tendance="+12 ce mois" 
        :tendancePositive="true"
        couleurFondIcone="bg-bleu-50" 
        couleurTexteIcone="text-bleu-600" 
      />

      <CarteStatistique 
        titre="Copies à Corriger" 
        valeur="8" 
        icone="rule" 
        tendance="Priorité Haute" 
        :tendancePositive="false"
        couleurFondIcone="bg-amber-50" 
        couleurTexteIcone="text-amber-600" 
      />

      <CarteStatistique 
        titre="Épreuves Conçues" 
        valeur="19" 
        icone="quiz" 
        tendance="4 en cours" 
        :tendancePositive="true"
        couleurFondIcone="bg-indigo-50" 
        couleurTexteIcone="text-indigo-600" 
      />

      <CarteStatistique 
        titre="Moyenne des Copies" 
        valeur="74.2 / 100" 
        icone="grade" 
        tendance="Constante" 
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-50" 
        couleurTexteIcone="text-emerald-600" 
      />
    </div>

    <!-- Copies en Attente de Correction -->
    <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-texte-principal flex items-center space-x-2">
          <span class="material-symbols-outlined text-bleu-600">fact_check</span>
          <span>Copies en Attente de Notation (Questions Ouvertes & Code)</span>
        </h3>

        <router-link to="/correction" class="text-xs font-semibold text-bleu-600 hover:underline">
          Accéder à la grille de notation
        </router-link>
      </div>

      <div class="space-y-3">
        <div 
          v-for="candidat in candidatsAcorriger" 
          :key="candidat.id"
          class="bg-fond-principal border border-bordure hover:border-slate-300 p-4 rounded-xl flex items-center justify-between transition-colors"
        >
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-lg bg-bleu-50 border border-bleu-100 flex items-center justify-center font-bold text-xs text-bleu-600">
              {{ candidat.prenom[0] }}{{ candidat.nom[0] }}
            </div>
            <div>
              <div class="text-sm font-bold text-texte-principal">{{ candidat.prenom }} {{ candidat.nom }}</div>
              <div class="text-xs text-texte-secondaire">{{ candidat.poste }} • Soumis le 14 Jan 2025</div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <span class="px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
              Évaluation Manuelle Requise
            </span>

            <router-link 
              to="/correction" 
              class="px-3.5 py-1.5 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span class="material-symbols-outlined text-sm">edit</span>
              <span>Évaluer la copie</span>
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
