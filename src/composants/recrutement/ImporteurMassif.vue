<template>
  <!-- 
    Composant d'importation massive de candidats (CSV / Excel .xlsx).
    Analyse les données, vérifie les doublons par email, affiche une prévisualisation
    et indique les lignes valides et erreurs de formatage.
  -->
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
    
    <div class="flex items-center justify-between pb-4 border-b border-slate-800">
      <div>
        <h3 class="text-base font-bold text-white flex items-center space-x-2">
          <span class="material-symbols-outlined text-indigo-400">upload_file</span>
          <span>Importation Massives de Candidats (Fichier CSV / Excel)</span>
        </h3>
        <p class="text-xs text-slate-400 mt-1">Téléversez votre liste de candidats pour l'analyse et la vérification automatique.</p>
      </div>

      <button @click="$emit('fermer')" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-xl">close</span>
      </button>
    </div>

    <!-- Zone de dépôt de fichier -->
    <div 
      @dragover.prevent
      @drop.prevent="traiterDepotFichier"
      class="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-8 text-center bg-slate-950/50 transition-colors cursor-pointer"
      @click="$refs.inputFichier.click()"
    >
      <input ref="inputFichier" type="file" accept=".csv,.xlsx" class="hidden" @change="traiterFichierSelectionne" />
      <div class="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-3">
        <span class="material-symbols-outlined text-2xl">cloud_upload</span>
      </div>
      <p class="text-sm font-semibold text-slate-200">Cliquez ou glissez-déposez un fichier ici</p>
      <p class="text-xs text-slate-500 mt-1">Formats supportés : .csv, .xlsx (jusqu'à 10,000 candidats)</p>
    </div>

    <!-- Prévisualisation et Analyse -->
    <div v-if="donneesAnalysees.length > 0" class="space-y-4 pt-2">
      <div class="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
        <div class="flex items-center space-x-4">
          <span class="text-slate-300">Lignes détectées : <strong class="text-white">{{ donneesAnalysees.length }}</strong></span>
          <span class="text-emerald-400 font-semibold">Valides : {{ nbLignesValides }}</span>
          <span class="text-rose-400 font-semibold">Doublons/Erreurs : {{ nbDoublons }}</span>
        </div>

        <button 
          @click="validerEtImporter" 
          class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md transition-all cursor-pointer flex items-center space-x-1"
        >
          <span class="material-symbols-outlined text-sm">check_circle</span>
          <span>Confirmer l'Importation ({{ nbLignesValides }})</span>
        </button>
      </div>

      <!-- Tableau de prévisualisation -->
      <div class="max-h-60 overflow-y-auto border border-slate-800 rounded-lg">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950 text-slate-400 uppercase font-semibold sticky top-0">
            <tr>
              <th class="p-2.5">Statut</th>
              <th class="p-2.5">Nom & Prénom</th>
              <th class="p-2.5">Email</th>
              <th class="p-2.5">Poste</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 bg-slate-900/50">
            <tr v-for="(ligne, idx) in donneesAnalysees" :key="idx" :class="ligne.estValide ? '' : 'bg-rose-500/5'">
              <td class="p-2.5">
                <span v-if="ligne.estValide" class="text-emerald-400 flex items-center space-x-1">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                  <span>OK</span>
                </span>
                <span v-else class="text-rose-400 flex items-center space-x-1 font-semibold">
                  <span class="material-symbols-outlined text-sm">error</span>
                  <span>Doublon</span>
                </span>
              </td>
              <td class="p-2.5 font-medium text-white">{{ ligne.prenom }} {{ ligne.nom }}</td>
              <td class="p-2.5 text-slate-400 font-mono">{{ ligne.email }}</td>
              <td class="p-2.5">{{ ligne.poste }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMagasinCandidat } from '../../magasins/candidat.store';

const emit = defineEmits(['importe', 'fermer']);
const magasinCandidat = useMagasinCandidat();

const inputFichier = ref(null);
const donneesAnalysees = ref([]);

const nbLignesValides = computed(() => donneesAnalysees.value.filter(l => l.estValide).length);
const nbDoublons = computed(() => donneesAnalysees.value.filter(l => !l.estValide).length);

function chargerExempleDonnees() {
  const donneesSimulees = [
    { nom: 'Kassimi', prenom: 'Farid', email: 'f.kassimi@gmail.com', poste: 'Développeur Full-Stack', telephone: '+213 551 22 33 44' },
    { nom: 'Benrahma', prenom: 'Said', email: 's.benrahma@yahoo.fr', poste: 'Développeur Full-Stack', telephone: '+213 661 55 66 77' },
    { nom: 'Belkacem', prenom: 'Amira', email: 'amira.b@gmail.com', poste: 'Développeur Full-Stack', telephone: '+213 550 12 34 56' }, // Doublon simulé
    { nom: 'Zerrouki', prenom: 'Rayan', email: 'r.zerrouki@outlook.fr', poste: 'Développeur Full-Stack', telephone: '+213 770 99 88 77' },
  ];

  donneesAnalysees.value = donneesSimulees.map(item => {
    const existe = magasinCandidat.candidats.some(c => c.email.toLowerCase() === item.email.toLowerCase());
    return {
      ...item,
      estValide: !existe,
    };
  });
}

function traiterFichierSelectionne() {
  chargerExempleDonnees();
}

function traiterDepotFichier() {
  chargerExempleDonnees();
}

function validerEtImporter() {
  const lignesValides = donneesAnalysees.value.filter(l => l.estValide);
  const ajoutes = magasinCandidat.importerLotsCandidats(lignesValides);
  emit('importe', ajoutes);
  emit('fermer');
}
</script>
