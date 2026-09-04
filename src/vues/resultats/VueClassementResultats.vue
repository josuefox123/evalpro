<template>
  <!-- 
    VueClassementResultats : Tableau de classement des candidats et publication des résultats.
    Présente le classement général, la distribution des notes, les candidats admis et la publication.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white">Résultats et Classement Officiel</h1>
        <p class="text-xs text-slate-400">Palmarès des candidats, statistiques des notes et publication officielle.</p>
      </div>

      <div class="flex items-center space-x-3">
        <button 
          @click="publierResultats"
          class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">publish</span>
          <span>Publier les Résultats aux Candidats</span>
        </button>
      </div>
    </div>

    <!-- Répartition Globale -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
        <div class="text-xs text-slate-400 font-semibold uppercase">Candidats Admis</div>
        <div class="text-3xl font-extrabold text-emerald-400 font-mono">3 / 10 Postes</div>
        <div class="text-[11px] text-slate-500">Seuil minimal requis : 75/100</div>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
        <div class="text-xs text-slate-400 font-semibold uppercase">Moyenne Générale</div>
        <div class="text-3xl font-extrabold text-indigo-400 font-mono">81.4 / 100</div>
        <div class="text-[11px] text-slate-500">Épreuve Full-Stack Senior</div>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
        <div class="text-xs text-slate-400 font-semibold uppercase">Meilleur Score</div>
        <div class="text-3xl font-extrabold text-amber-400 font-mono">94.5 / 100</div>
        <div class="text-[11px] text-slate-500">Référence anonymisée</div>
      </div>
    </div>

    <!-- Tableau du Classement Officiel -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-white flex items-center space-x-2">
          <span class="material-symbols-outlined text-amber-400">emoji_events</span>
          <span>Classement Général des Candidats</span>
        </h3>
        <span class="text-xs text-slate-400">Tri par score décroissant</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950 text-slate-400 uppercase font-semibold">
            <tr>
              <th class="p-3">Rang</th>
              <th class="p-3">Candidat</th>
              <th class="p-3">Email</th>
              <th class="p-3">Score Final</th>
              <th class="p-3">Temps de Passage</th>
              <th class="p-3 text-right">Décision / Statut</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="cand in classement" :key="cand.rank" class="hover:bg-slate-800/40 transition-colors">
              <td class="p-3 font-mono font-extrabold text-slate-300">
                <span v-if="cand.rank === 1" class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">1er</span>
                <span v-else-if="cand.rank === 2" class="px-2 py-0.5 rounded bg-slate-700 text-slate-200">2ème</span>
                <span v-else-if="cand.rank === 3" class="px-2 py-0.5 rounded bg-amber-800/20 text-amber-500">3ème</span>
                <span v-else class="text-slate-400">#{{ cand.rank }}</span>
              </td>
              <td class="p-3 font-bold text-white">{{ cand.name }}</td>
              <td class="p-3 text-slate-400 font-mono text-[11px]">{{ cand.city }} • France / DZ</td>
              <td class="p-3 font-mono font-extrabold text-emerald-400 text-sm">{{ cand.score }} / 100</td>
              <td class="p-3 font-mono text-slate-300">{{ cand.time }}</td>
              <td class="p-3 text-right">
                <BadgesStatut :statut="cand.status" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';

const classement = [
  { rank: 1, name: "Amira Belkacem", score: 94.5, time: "00:38:12", status: "admis", city: "Alger" },
  { rank: 2, name: "Yacine Ouali", score: 91.2, time: "00:41:05", status: "admis", city: "Oran" },
  { rank: 3, name: "Lina Djaballah", score: 88.7, time: "00:44:18", status: "admis", city: "Constantine" },
  { rank: 4, name: "Sofiane Mekki", score: 72.3, time: "00:45:00", status: "refuse", city: "Alger" },
  { rank: 5, name: "Nadia Chikh", score: 68.4, time: "00:43:22", status: "refuse", city: "Tizi-Ouzou" },
];

function publierResultats() {
  alert('Les résultats officiels ont été publiés ! Les candidats vont recevoir leurs notifications par email.');
}
</script>
