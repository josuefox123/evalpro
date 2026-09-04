<template>
  <!-- 
    VueGestionCandidats : Liste globale des candidats, envoi d'invitation JWT, et import massif.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white">Gestion des Candidats et Invitations</h1>
        <p class="text-xs text-slate-400">Consultez la liste des candidats, envoyez des liens d'accès sécurisés ou importez des fichiers CSV/Excel.</p>
      </div>

      <div class="flex items-center space-x-3">
        <button 
          @click="afficherModalImport = true"
          class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">upload_file</span>
          <span>Importation Massives CSV/Excel</span>
        </button>

        <button 
          @click="afficherModalNouveau = true"
          class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">person_add</span>
          <span>Ajouter un Candidat</span>
        </button>
      </div>
    </div>

    <!-- Barre de Recherche -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <input 
        v-model="magasinCandidat.rechercheTexte"
        type="text" 
        placeholder="Rechercher un candidat par nom, prénom ou email..." 
        class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
      />
    </div>

    <!-- Tableau des Candidats -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950 text-slate-400 uppercase font-semibold">
            <tr>
              <th class="p-3">Candidat</th>
              <th class="p-3">Email & Téléphone</th>
              <th class="p-3">Poste Visé</th>
              <th class="p-3">Invitation JWT</th>
              <th class="p-3">Statut Examen</th>
              <th class="p-3">Note Globale</th>
              <th class="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="cand in magasinCandidat.candidatsFiltres" :key="cand.id" class="hover:bg-slate-800/40 transition-colors">
              <td class="p-3 font-semibold text-white flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400">
                  {{ cand.prenom[0] }}{{ cand.nom[0] }}
                </div>
                <span>{{ cand.prenom }} {{ cand.nom }}</span>
              </td>
              <td class="p-3">
                <div class="text-slate-300 font-mono text-[11px]">{{ cand.email }}</div>
                <div class="text-slate-500 text-[10px]">{{ cand.telephone }}</div>
              </td>
              <td class="p-3 font-medium text-slate-200">{{ cand.poste }}</td>
              <td class="p-3">
                <BadgesStatut :statut="cand.statutInvitation" />
              </td>
              <td class="p-3">
                <BadgesStatut :statut="cand.statutComposition" />
              </td>
              <td class="p-3 font-mono font-bold">
                <span v-if="cand.noteGlobale !== null" class="text-emerald-400">{{ cand.noteGlobale }} / 100</span>
                <span v-else class="text-slate-500">—</span>
              </td>
              <td class="p-3 text-right">
                <button 
                  v-if="cand.statutInvitation === 'non_envoyee'"
                  @click="magasinCandidat.envoyerInvitation(cand.id)"
                  class="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all cursor-pointer flex items-center space-x-1 ml-auto"
                >
                  <span class="material-symbols-outlined text-sm">send</span>
                  <span>Envoyer Invitation</span>
                </button>
                <span v-else class="text-slate-500 text-[11px]">Lien déjà transmis</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modale Importation Massif si activée -->
    <div v-if="afficherModalImport" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        <ImporteurMassif @fermer="afficherModalImport = false" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMagasinCandidat } from '../../magasins/candidat.store';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';
import ImporteurMassif from '../../composants/recrutement/ImporteurMassif.vue';

const magasinCandidat = useMagasinCandidat();
const afficherModalImport = ref(false);
const afficherModalNouveau = ref(false);
</script>
