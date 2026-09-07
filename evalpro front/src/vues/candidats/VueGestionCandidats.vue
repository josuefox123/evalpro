<template>
  <!--
    VueGestionCandidats.vue - Gestion des Candidats RH B2B EvalPro
  -->
  <div class="space-y-6">

    <!-- En-tête de page -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-ep-border shadow-ep-card">
      <div>
        <div class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-ep-primary border border-blue-100 mb-2">
          <span class="material-symbols-outlined text-xs">group</span>
          <span>Gestion des Talents</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">Gestion des Candidats</h1>
        <p class="text-xs text-ep-muted mt-1">Consultez la liste des candidats, générez des invitations et suivez les notes d'évaluation.</p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <EpButton variant="outline" size="sm" iconLeft="upload_file" @click="afficherModalImport = true">
          Import Massif
        </EpButton>

        <EpButton variant="primary" size="sm" iconLeft="person_add" @click="afficherModalNouveau = true">
          Ajouter Candidat
        </EpButton>
      </div>
    </div>

    <!-- Barre de Recherche -->
    <div class="bg-white border border-ep-border rounded-xl p-4 shadow-ep-card">
      <EpInput
        v-model="magasinCandidat.rechercheTexte"
        placeholder="Rechercher un candidat par nom, prénom ou email..."
        iconLeft="search"
      />
    </div>

    <!-- Tableau des Candidats -->
    <div v-if="magasinCandidat.candidatsFiltres.length > 0" class="bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-4">
      <div class="overflow-x-auto -mx-2 sm:mx-0">
        <table class="w-full text-left text-xs text-ep-text min-w-[500px]">
          <thead class="bg-slate-50 text-ep-muted uppercase font-semibold border-y border-ep-border">
            <tr>
              <th class="p-3">Candidat</th>
              <th class="p-3 hidden sm:table-cell">Email & Téléphone</th>
              <th class="p-3 hidden lg:table-cell">Poste Visé</th>
              <th class="p-3">Invitation</th>
              <th class="p-3 hidden md:table-cell">Statut Examen</th>
              <th class="p-3 hidden md:table-cell">Note Globale</th>
              <th class="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ep-border">
            <tr
              v-for="cand in magasinCandidat.candidatsFiltres"
              :key="cand.id"
              class="hover:bg-slate-50/60 transition-colors cursor-pointer"
              @click="ouvrirFicheCandidat(cand)"
            >
              <td class="p-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-ep-primary text-xs shrink-0">
                    {{ cand.prenom[0] }}{{ cand.nom[0] }}
                  </div>
                  <span class="font-semibold text-ep-text truncate max-w-[100px] sm:max-w-none">{{ cand.prenom }} {{ cand.nom }}</span>
                </div>
              </td>
              <td class="p-3 hidden sm:table-cell">
                <div class="text-ep-text font-mono text-[11px]">{{ cand.email }}</div>
                <div class="text-ep-muted text-[10px]">{{ cand.telephone }}</div>
              </td>
              <td class="p-3 text-ep-muted font-medium hidden lg:table-cell">{{ cand.poste }}</td>
              <td class="p-3">
                <BadgesStatut :statut="cand.statutInvitation" />
              </td>
              <td class="p-3 hidden md:table-cell">
                <BadgesStatut :statut="cand.statutComposition" />
              </td>
              <td class="p-3 font-mono font-bold hidden md:table-cell">
                <span v-if="cand.noteGlobale !== null" class="text-emerald-600">{{ cand.noteGlobale }} / 100</span>
                <span v-else class="text-ep-muted">—</span>
              </td>
              <td class="p-3 text-right" @click.stop>
                <EpButton
                  v-if="cand.statutInvitation === 'non_envoyee'"
                  variant="primary"
                  size="sm"
                  iconLeft="send"
                  @click="inviterCandidat(cand)"
                >
                  Inviter
                </EpButton>
                <span v-else class="text-ep-muted text-[11px]">Envoyée</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- État vide -->
    <EpEmptyState
      v-else
      title="Aucun candidat trouvé"
      description="Aucun candidat ne correspond à votre recherche."
      icon="group"
    />

    <!-- Modale Importation Massif -->
    <EpModal v-model="afficherModalImport" title="Importation Massives de Candidats" icon="upload_file" size="lg">
      <ImporteurMassif @fermer="afficherModalImport = false" @importe="onImporte" />
    </EpModal>

    <!-- Drawer Fiche Candidat -->
    <EpDrawer v-model="afficherFiche" :title="candidatSelectionne ? candidatSelectionne.prenom + ' ' + candidatSelectionne.nom : 'Fiche Candidat'" icon="person" width="lg">
      <div v-if="candidatSelectionne" class="space-y-6 text-xs text-ep-text">
        <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-ep-border">
          <div class="w-12 h-12 rounded-full bg-ep-primary text-white font-bold flex items-center justify-center text-lg">
            {{ candidatSelectionne.prenom[0] }}{{ candidatSelectionne.nom[0] }}
          </div>
          <div>
            <h4 class="text-base font-bold text-ep-text">{{ candidatSelectionne.prenom }} {{ candidatSelectionne.nom }}</h4>
            <p class="text-xs text-ep-muted">{{ candidatSelectionne.poste }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <h5 class="font-bold text-ep-text uppercase text-[10px] tracking-wider text-ep-muted">Coordonnées</h5>
          <div class="grid grid-cols-2 gap-3 bg-white p-3 rounded-lg border border-ep-border">
            <div>
              <span class="text-ep-muted block">Email</span>
              <span class="font-mono font-semibold">{{ candidatSelectionne.email }}</span>
            </div>
            <div>
              <span class="text-ep-muted block">Téléphone</span>
              <span class="font-mono font-semibold">{{ candidatSelectionne.telephone }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h5 class="font-bold text-ep-text uppercase text-[10px] tracking-wider text-ep-muted">Statut & Évaluation</h5>
          <div class="grid grid-cols-2 gap-3 bg-white p-3 rounded-lg border border-ep-border">
            <div>
              <span class="text-ep-muted block mb-1">Invitation</span>
              <BadgesStatut :statut="candidatSelectionne.statutInvitation" />
            </div>
            <div>
              <span class="text-ep-muted block mb-1">Composition</span>
              <BadgesStatut :statut="candidatSelectionne.statutComposition" />
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h5 class="font-bold text-ep-text uppercase text-[10px] tracking-wider text-ep-muted">Résultats</h5>
          <div class="bg-slate-50 p-4 rounded-xl border border-ep-border text-center">
            <span class="text-ep-muted block">Note Finale</span>
            <span class="text-3xl font-extrabold text-emerald-600 font-mono">
              {{ candidatSelectionne.noteGlobale !== null ? candidatSelectionne.noteGlobale + ' / 100' : 'Non évalué' }}
            </span>
          </div>
        </div>
      </div>
    </EpDrawer>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMagasinCandidat } from '../../magasins/candidat.store';
import { useMagasinNotification } from '../../magasins/notification.store';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';
import ImporteurMassif from '../../composants/recrutement/ImporteurMassif.vue';
import EpButton from '../../composants/systeme/EpButton.vue';
import EpInput from '../../composants/systeme/EpInput.vue';
import EpEmptyState from '../../composants/systeme/EpEmptyState.vue';
import EpModal from '../../composants/systeme/EpModal.vue';
import EpDrawer from '../../composants/systeme/EpDrawer.vue';

const magasinCandidat = useMagasinCandidat();
const magasinNotif = useMagasinNotification();
const afficherModalImport = ref(false);
const afficherModalNouveau = ref(false);
const afficherFiche = ref(false);
const candidatSelectionne = ref(null);

function ouvrirFicheCandidat(cand) {
  candidatSelectionne.value = cand;
  afficherFiche.value = true;
}

function inviterCandidat(cand) {
  magasinCandidat.envoyerInvitation(cand.id);
  magasinNotif.succes(`Lien d'accès unique envoyé à ${cand.prenom} ${cand.nom}`, "Invitation Transmise");
}

function onImporte(nb) {
  afficherModalImport.value = false;
  magasinNotif.succes(`${nb} candidats importés avec succès !`, "Importation réussie");
}
</script>
