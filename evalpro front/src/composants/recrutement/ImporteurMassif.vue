<template>
  <!--
    ImporteurMassif.vue - Importation et analyse de fichiers CSV / Excel de candidats
  -->
  <div class="bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-5">

    <div class="flex items-center justify-between pb-4 border-b border-ep-border">
      <div>
        <h3 class="text-base font-bold text-ep-text flex items-center gap-2">
          <span class="material-symbols-outlined text-ep-primary">upload_file</span>
          <span>Importation Massives de Candidats</span>
        </h3>
        <p class="text-xs text-ep-muted mt-0.5">Téléversez votre liste CSV / Excel pour dédoublonnage automatique.</p>
      </div>

      <button @click="$emit('fermer')" class="text-ep-muted hover:text-ep-text transition-colors cursor-pointer p-1">
        <span class="material-symbols-outlined text-xl">close</span>
      </button>
    </div>

    <!-- Zone de dépôt -->
    <div
      @dragover.prevent
      @drop.prevent="traiterDepotFichier"
      class="border-2 border-dashed border-ep-border hover:border-ep-primary rounded-xl p-8 text-center bg-slate-50 hover:bg-blue-50/30 transition-all cursor-pointer"
      @click="$refs.inputFichier.click()"
    >
      <input ref="inputFichier" type="file" accept=".csv,.xlsx" class="hidden" @change="traiterFichierSelectionne" />
      <div class="w-12 h-12 rounded-full bg-blue-50 text-ep-primary flex items-center justify-center mx-auto mb-3 border border-blue-100">
        <span class="material-symbols-outlined text-2xl">cloud_upload</span>
      </div>
      <p class="text-sm font-semibold text-ep-text">Cliquez ou glissez-déposez votre fichier CSV / Excel ici</p>
      <p class="text-xs text-ep-muted mt-1">Formats supportés : .csv, .xlsx (jusqu'à 10,000 candidats)</p>
    </div>

    <!-- Prévisualisation & Analyse -->
    <div v-if="donneesAnalysees.length > 0" class="space-y-4 pt-2">
      <div class="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-ep-border text-xs">
        <div class="flex items-center gap-4">
          <span class="text-ep-muted">Lignes détectées : <strong class="text-ep-text font-mono">{{ donneesAnalysees.length }}</strong></span>
          <span class="text-emerald-700 font-semibold">Valides : {{ nbLignesValides }}</span>
          <span class="text-rose-700 font-semibold">Doublons : {{ nbDoublons }}</span>
        </div>

        <EpButton variant="primary" size="sm" iconLeft="check_circle" @click="validerEtImporter">
          Confirmer ({{ nbLignesValides }})
        </EpButton>
      </div>

      <div class="max-h-60 overflow-y-auto border border-ep-border rounded-lg">
        <table class="w-full text-left text-xs text-ep-text">
          <thead class="bg-slate-50 text-ep-muted uppercase font-semibold sticky top-0 border-b border-ep-border">
            <tr>
              <th class="p-2.5">Statut</th>
              <th class="p-2.5">Nom & Prénom</th>
              <th class="p-2.5">Email</th>
              <th class="p-2.5">Poste</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ep-border bg-white">
            <tr v-for="(ligne, idx) in donneesAnalysees" :key="idx" :class="ligne.estValide ? '' : 'bg-rose-50/50'">
              <td class="p-2.5">
                <span v-if="ligne.estValide" class="text-emerald-700 flex items-center gap-1 font-semibold">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                  <span>Valide</span>
                </span>
                <span v-else class="text-rose-700 flex items-center gap-1 font-semibold">
                  <span class="material-symbols-outlined text-sm">error</span>
                  <span>Doublon</span>
                </span>
              </td>
              <td class="p-2.5 font-medium text-ep-text">{{ ligne.prenom }} {{ ligne.nom }}</td>
              <td class="p-2.5 text-ep-muted font-mono">{{ ligne.email }}</td>
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
import EpButton from '../systeme/EpButton.vue';

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
    { nom: 'Belkacem', prenom: 'Amira', email: 'amira.b@gmail.com', poste: 'Développeur Full-Stack', telephone: '+213 550 12 34 56' },
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
