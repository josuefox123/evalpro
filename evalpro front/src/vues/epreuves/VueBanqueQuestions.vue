<template>
  <!-- 
    VueBanqueQuestions : Bibliothèque centrale des questions réutilisables d'EvalPro.
    Permet de filtrer par domaine (Informatique, Finance, etc.), niveau et type.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white">Banque Centralisée de Questions</h1>
        <p class="text-xs text-slate-400">Bibliothèque partagée de questions classées par domaine, type et difficulté.</p>
      </div>

      <button 
        @click="afficherModalNouvelleQuestion = true"
        class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
      >
        <span class="material-symbols-outlined text-base">add</span>
        <span>Créer une Question</span>
      </button>
    </div>

    <!-- Barre de Recherche et Filtres par Domaine -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
      <input 
        v-model="magasinEpreuve.rechercheQuestionTexte"
        type="text" 
        placeholder="Mots-clés..." 
        class="bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
      />

      <select 
        v-model="magasinEpreuve.domaineFiltre" 
        class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
      >
        <option value="TOUS">Tous les domaines</option>
        <option value="Informatique">Informatique & Dév</option>
        <option value="Finance">Finance & Comptabilité</option>
        <option value="Management">Management & RH</option>
      </select>

      <select 
        v-model="magasinEpreuve.typeFiltre" 
        class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
      >
        <option value="TOUS">Tous les types</option>
        <option value="qcm">QCM Choix unique</option>
        <option value="reponse_courte">Réponse courte</option>
        <option value="sql">Requête SQL</option>
        <option value="code">Code Python/JS</option>
        <option value="vrai_faux">Vrai / Faux</option>
      </select>

      <select 
        v-model="magasinEpreuve.difficulteFiltre" 
        class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
      >
        <option value="TOUS">Toutes les difficultés</option>
        <option value="Facile">Facile</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Difficile">Difficile</option>
      </select>
    </div>

    <!-- Liste des Questions -->
    <div class="space-y-4">
      <div 
        v-for="question in magasinEpreuve.questionsFiltrees" 
        :key="question.id"
        class="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-3 transition-all shadow-lg"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-2">
            <span class="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase">
              {{ question.type }}
            </span>
            <span class="text-xs text-slate-400 font-medium">{{ question.domaine }} • {{ question.sousDomaine || '' }}</span>
          </div>

          <span class="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {{ question.points }} Points
          </span>
        </div>

        <h3 class="text-base font-bold text-white">{{ question.titre }}</h3>
        <p class="text-xs text-slate-300 leading-relaxed">{{ question.enonce }}</p>

        <!-- Affichage des options si QCM -->
        <div v-if="question.options && question.options.length > 0" class="grid grid-cols-2 gap-2 text-xs pt-1">
          <div v-for="opt in question.options" :key="opt.id" :class="[
            'p-2 rounded border font-medium',
            opt.correcte ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-400 border-slate-800'
          ]">
            <span class="font-bold mr-1">{{ opt.id.toUpperCase() }}.</span> {{ opt.texte }}
          </div>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-500">
          <span>Auteur : {{ question.auteur }}</span>
          <span>Langue : {{ question.langue }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMagasinEpreuve } from '../../magasins/epreuve.store';

const magasinEpreuve = useMagasinEpreuve();
const afficherModalNouvelleQuestion = ref(false);
</script>
