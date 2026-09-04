<template>
  <!-- 
    Composant SelecteurQuestion : Recherche et filtre de questions dans la Banque centrale
    pour les ajouter rapidement à une épreuve en cours de création.
  -->
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-bold text-white flex items-center space-x-2">
        <span class="material-symbols-outlined text-indigo-400">library_add</span>
        <span>Rechercher dans la Banque de Questions</span>
      </h4>
      <span class="text-xs text-slate-400">{{ magasinEpreuve.questionsFiltrees.length }} questions disponibles</span>
    </div>

    <!-- Barre de filtres et recherche -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <input 
        v-model="magasinEpreuve.rechercheQuestionTexte" 
        type="text" 
        placeholder="Rechercher par mot-clé..." 
        class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
      />

      <select 
        v-model="magasinEpreuve.domaineFiltre" 
        class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
      >
        <option value="TOUS">Tous les Domaines</option>
        <option value="Informatique">Informatique</option>
        <option value="Finance">Finance</option>
        <option value="Management">Management</option>
      </select>

      <select 
        v-model="magasinEpreuve.difficulteFiltre" 
        class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
      >
        <option value="TOUS">Toutes les Difficultés</option>
        <option value="Facile">Facile</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Difficile">Difficile</option>
      </select>
    </div>

    <!-- Liste des questions disponibles -->
    <div class="space-y-2.5 max-h-72 overflow-y-auto pr-1">
      <div 
        v-for="q in magasinEpreuve.questionsFiltrees" 
        :key="q.id"
        class="bg-slate-950 border border-slate-800 hover:border-slate-700 p-3 rounded-lg flex items-center justify-between transition-colors"
      >
        <div class="space-y-1 max-w-xl">
          <div class="flex items-center space-x-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {{ q.type }}
            </span>
            <span class="text-xs font-semibold text-slate-200">{{ q.titre }}</span>
          </div>
          <p class="text-xs text-slate-400 line-clamp-1">{{ q.enonce }}</p>
        </div>

        <div class="flex items-center space-x-3">
          <span class="text-xs font-mono font-bold text-amber-400">{{ q.points }} pts</span>
          <button 
            @click="$emit('ajouterQuestion', q)" 
            class="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all cursor-pointer flex items-center space-x-1"
          >
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMagasinEpreuve } from '../../magasins/epreuve.store';

const emit = defineEmits(['ajouterQuestion']);
const magasinEpreuve = useMagasinEpreuve();
</script>
