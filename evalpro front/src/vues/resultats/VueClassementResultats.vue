<template>
  <!--
    VueClassementResultats.vue - Palmarès et Classement Officiel EvalPro SaaS
  -->
  <div class="space-y-8">

    <!-- En-tête de page -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-ep-border shadow-ep-card">
      <div>
        <div class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-ep-secondary border border-purple-100 mb-2">
          <span class="material-symbols-outlined text-xs">leaderboard</span>
          <span>Résultats & Analytics</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">Résultats & Classement Officiel</h1>
        <p class="text-xs text-ep-muted mt-1">Palmarès des candidats, statistiques globales et publication des notes.</p>
      </div>

      <EpButton variant="success" size="sm" iconLeft="publish" @click="publierResultats">
        Publier les Résultats
      </EpButton>
    </div>

    <!-- KPI & Distribution des Notes -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="bg-white border border-ep-border rounded-xl p-5 shadow-ep-card space-y-2">
        <div class="text-xs text-ep-muted font-semibold uppercase tracking-wider">Candidats Admis</div>
        <div class="text-3xl font-extrabold text-emerald-600 font-mono">3 / 10 Postes</div>
        <div class="text-[11px] text-ep-muted">Seuil minimal requis : 75/100</div>
      </div>

      <div class="bg-white border border-ep-border rounded-xl p-5 shadow-ep-card space-y-2">
        <div class="text-xs text-ep-muted font-semibold uppercase tracking-wider">Moyenne Générale</div>
        <div class="text-3xl font-extrabold text-ep-primary font-mono">81.4 / 100</div>
        <div class="text-[11px] text-ep-muted">Épreuve Full-Stack Senior</div>
      </div>

      <div class="bg-white border border-ep-border rounded-xl p-5 shadow-ep-card space-y-2">
        <div class="text-xs text-ep-muted font-semibold uppercase tracking-wider">Meilleur Score</div>
        <div class="text-3xl font-extrabold text-amber-600 font-mono">94.5 / 100</div>
        <div class="text-[11px] text-ep-muted">Amira Belkacem</div>
      </div>
    </div>

    <!-- Tableau du Classement Officiel -->
    <div class="bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-4">
      <div class="flex items-center justify-between border-b border-ep-border pb-4">
        <h3 class="text-base font-bold text-ep-text flex items-center gap-2">
          <span class="material-symbols-outlined text-amber-500">emoji_events</span>
          <span>Classement Général des Candidats</span>
        </h3>
        <span class="text-xs text-ep-muted">Tri par score décroissant</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-ep-text">
          <thead class="bg-slate-50 text-ep-muted uppercase font-semibold border-y border-ep-border">
            <tr>
              <th class="p-3">Rang</th>
              <th class="p-3">Candidat</th>
              <th class="p-3">Email & Ville</th>
              <th class="p-3">Score Final</th>
              <th class="p-3">Temps de Passage</th>
              <th class="p-3 text-right">Décision / Statut</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ep-border">
            <tr v-for="cand in classement" :key="cand.rank" class="hover:bg-slate-50/60 transition-colors">
              <td class="p-3 font-mono font-extrabold text-ep-text">
                <span v-if="cand.rank === 1" class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/60 font-bold">1er</span>
                <span v-else-if="cand.rank === 2" class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-bold">2ème</span>
                <span v-else-if="cand.rank === 3" class="px-2 py-0.5 rounded-md bg-amber-50/60 text-amber-800 font-bold">3ème</span>
                <span v-else class="text-ep-muted">#{{ cand.rank }}</span>
              </td>
              <td class="p-3 font-bold text-ep-text">{{ cand.name }}</td>
              <td class="p-3 text-ep-muted font-mono text-[11px]">{{ cand.city }}</td>
              <td class="p-3 font-mono font-extrabold text-emerald-600 text-sm">{{ cand.score }} / 100</td>
              <td class="p-3 font-mono text-ep-muted">{{ cand.time }}</td>
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
import { useMagasinNotification } from '../../magasins/notification.store';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';
import EpButton from '../../composants/systeme/EpButton.vue';

const magasinNotif = useMagasinNotification();

const classement = [
  { rank: 1, name: "Amira Belkacem", score: 94.5, time: "00:38:12", status: "admis", city: "Alger" },
  { rank: 2, name: "Yacine Ouali", score: 91.2, time: "00:41:05", status: "admis", city: "Oran" },
  { rank: 3, name: "Lina Djaballah", score: 88.7, time: "00:44:18", status: "admis", city: "Constantine" },
  { rank: 4, name: "Sofiane Mekki", score: 72.3, time: "00:45:00", status: "refuse", city: "Alger" },
  { rank: 5, name: "Nadia Chikh", score: 68.4, time: "00:43:22", status: "refuse", city: "Tizi-Ouzou" },
];

function publierResultats() {
  magasinNotif.succes('Les résultats officiels ont été publiés ! Les candidats vont recevoir leurs notifications.', 'Publication réussie');
}
</script>
