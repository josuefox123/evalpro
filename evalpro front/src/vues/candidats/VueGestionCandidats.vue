<template>
  <!-- 
    VueGestionCandidats.vue (Gestion des Candidats RH B2B)
  -->
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-texte-principal tracking-tight">Gestion des Candidats RH</h1>
        <p class="text-xs text-texte-secondaire">Consultez la liste des candidats, envoyez des liens d'accès sécurisés ou importez des fichiers CSV/Excel.</p>
      </div>

      <div class="flex items-center space-x-3">
        <button 
          @click="afficherModalImport = true"
          class="px-4 py-2 rounded-lg bg-white border border-bordure hover:bg-fond-secondaire text-texte-principal text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">upload_file</span>
          <span>Importation Massives (CSV/Excel)</span>
        </button>

        <button 
          @click="afficherModalNouveau = true"
          class="px-4 py-2 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">person_add</span>
          <span>Ajouter un Candidat</span>
        </button>
      </div>
    </div>

    <!-- Barre de Recherche -->
    <div class="bg-white border border-bordure rounded-xl p-4 shadow-carte">
      <input 
        v-model="magasinCandidat.rechercheTexte"
        type="text" 
        placeholder="Rechercher un candidat par nom, prénom ou email..." 
        class="w-full bg-fond-principal border border-bordure rounded-lg px-4 py-2 text-xs text-texte-principal placeholder-texte-muet focus:outline-none focus:border-bleu-600"
      />
    </div>

    <!-- Tableau des Candidats -->
    <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-texte-principal">
          <thead class="bg-fond-principal text-texte-secondaire uppercase font-semibold border-y border-bordure">
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
          <tbody class="divide-y divide-bordure">
            <tr v-for="cand in magasinCandidat.candidatsFiltres" :key="cand.id" class="hover:bg-fond-secondaire/50 transition-colors">
              <td class="p-3 font-semibold text-texte-principal flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-lg bg-bleu-50 border border-bleu-100 flex items-center justify-center font-bold text-bleu-600 text-xs">
                  {{ cand.prenom[0] }}{{ cand.nom[0] }}
                </div>
                <span>{{ cand.prenom }} {{ cand.nom }}</span>
              </td>
              <td class="p-3">
                <div class="text-texte-principal font-mono text-[11px]">{{ cand.email }}</div>
                <div class="text-texte-secondaire text-[10px]">{{ cand.telephone }}</div>
              </td>
              <td class="p-3 text-texte-secondaire font-medium">{{ cand.poste }}</td>
              <td class="p-3">
                <BadgesStatut :statut="cand.statutInvitation" />
              </td>
              <td class="p-3">
                <BadgesStatut :statut="cand.statutComposition" />
              </td>
              <td class="p-3 font-mono font-bold">
                <span v-if="cand.noteGlobale !== null" class="text-emerald-600">{{ cand.noteGlobale }} / 100</span>
                <span v-else class="text-texte-muet">—</span>
              </td>
              <td class="p-3 text-right">
                <button 
                  v-if="cand.statutInvitation === 'non_envoyee'"
                  @click="magasinCandidat.envoyerInvitation(cand.id)"
                  class="px-3 py-1 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1 ml-auto"
                >
                  <span class="material-symbols-outlined text-sm">send</span>
                  <span>Envoyer Invitation</span>
                </button>
                <span v-else class="text-texte-muet text-[11px]">Lien déjà transmis</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modale Importation Massif si activée -->
    <div v-if="afficherModalImport" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
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
