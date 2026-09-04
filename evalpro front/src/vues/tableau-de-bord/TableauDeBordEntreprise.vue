<template>
  <!--
    TableauDeBordEntreprise.vue - Tableau de bord Administrateur Entreprise
    Thème clair : cartes blanches, textes sombres, accents bleu indigo.
    Affiche les statistiques RH, les campagnes actives et leur progression.
  -->
  <div class="space-y-8">

    <!-- En-tête de la page -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <!-- Badge entreprise -->
        <div class="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-bleu-50 text-bleu-600 border border-bleu-200 mb-2">
          <span class="material-symbols-outlined text-xs">domain</span>
          <span>TechCorp Algerie</span>
        </div>
        <h1 class="text-2xl font-extrabold text-texte-principal font-titre">Tableau de Bord Recrutement</h1>
        <p class="text-sm text-texte-secondaire mt-1">
          Gerez vos campagnes d'evaluation, vos candidats et suivez les resultats en direct.
        </p>
      </div>

      <!-- Actions rapides -->
      <div class="flex items-center space-x-3">
        <button
          @click="afficherModalImport = true"
          class="btn-secondaire text-xs"
        >
          <span class="material-symbols-outlined text-base">upload_file</span>
          <span>Import Massif Candidats</span>
        </button>
        <router-link to="/campagnes/nouvelle" class="btn-principal text-xs">
          <span class="material-symbols-outlined text-base">add</span>
          <span>Creer une Campagne</span>
        </router-link>
      </div>
    </div>

    <!-- Cartes de statistiques RH -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      <CarteStatistique
        titre="Candidats Inscrits"
        valeur="1 245"
        icone="group"
        tendance="+120 cette semaine"
        :tendancePositive="true"
        couleurFondIcone="bg-bleu-50"
        couleurTexteIcone="text-bleu-600"
      />

      <CarteStatistique
        titre="Invitations Envoyees"
        valeur="1 180"
        icone="send"
        tendance="94.7% transmises"
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-50"
        couleurTexteIcone="text-succes"
      />

      <CarteStatistique
        titre="Compositions Realisees"
        valeur="943"
        icone="fact_check"
        tendance="Taux participation 80%"
        :tendancePositive="true"
        couleurFondIcone="bg-amber-50"
        couleurTexteIcone="text-avertissement"
      />

      <CarteStatistique
        titre="Incidents Detectes"
        valeur="28"
        icone="warning"
        tendance="Surveillance active"
        :tendancePositive="false"
        couleurFondIcone="bg-red-50"
        couleurTexteIcone="text-erreur"
      />

    </div>

    <!-- Liste des campagnes actives -->
    <div class="carte p-6 space-y-5">

      <!-- En-tête de section -->
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-texte-principal flex items-center space-x-2">
          <span class="material-symbols-outlined text-bleu-600">campaign</span>
          <span>Campagnes de Recrutement en Cours</span>
        </h3>
        <router-link to="/campagnes" class="text-xs font-semibold text-bleu-600 hover:underline">
          Voir toutes les campagnes ({{ magasinCampagne.campagnes.length }})
        </router-link>
      </div>

      <!-- Grille des cartes campagne -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="campagne in magasinCampagne.campagnes"
          :key="campagne.id"
          class="bg-fond-secondaire border border-bordure hover:border-bleu-200 hover:shadow-carte-md rounded-xl p-5 space-y-4 transition-all"
        >
          <!-- Titre et statut -->
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[10px] font-semibold uppercase text-texte-muet tracking-wider">
                {{ campagne.departement }}
              </span>
              <h4 class="text-sm font-bold text-texte-principal mt-0.5">{{ campagne.titre }}</h4>
            </div>
            <BadgesStatut :statut="campagne.statut" />
          </div>

          <!-- Metriques de la campagne -->
          <div class="grid grid-cols-3 gap-2 text-xs bg-white p-3 rounded-lg border border-bordure">
            <div>
              <div class="text-[10px] text-texte-muet">Candidats</div>
              <div class="font-bold text-texte-principal font-mono">{{ campagne.candidatsCount }}</div>
            </div>
            <div>
              <div class="text-[10px] text-texte-muet">Compositions</div>
              <div class="font-bold text-succes font-mono">{{ campagne.compositionsRealisees }}</div>
            </div>
            <div>
              <div class="text-[10px] text-texte-muet">Echeance</div>
              <div class="font-bold text-texte-secondaire">{{ campagne.dateCloture }}</div>
            </div>
          </div>

          <!-- Barre de progression -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-[11px] text-texte-secondaire">
              <span>Taux d'avancement</span>
              <span class="font-bold text-bleu-600">{{ campagne.progression }}%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-fond-secondaire overflow-hidden border border-bordure">
              <div
                class="h-full bg-gradient-to-r from-bleu-500 to-succes rounded-full transition-all"
                :style="{ width: campagne.progression + '%' }"
              ></div>
            </div>
          </div>

          <!-- Pied de carte : consultant et lien -->
          <div class="flex items-center justify-between pt-2 border-t border-bordure text-xs">
            <span class="text-texte-muet flex items-center space-x-1">
              <span class="material-symbols-outlined text-sm">person</span>
              <span>{{ campagne.consultantAssigne }}</span>
            </span>
            <router-link to="/candidats" class="text-bleu-600 font-semibold hover:underline flex items-center space-x-1">
              <span>Gerer les Candidats</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </router-link>
          </div>

        </div>
      </div>

    </div>

    <!-- Modale d'importation massif (overlay clair) -->
    <div
      v-if="afficherModalImport"
      class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="max-w-2xl w-full">
        <ImporteurMassif @fermer="afficherModalImport = false" @importe="onImporte" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMagasinCampagne } from '../../magasins/campagne.store';
import CarteStatistique from '../../composants/communs/CarteStatistique.vue';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';
import ImporteurMassif from '../../composants/recrutement/ImporteurMassif.vue';

const magasinCampagne = useMagasinCampagne();
const afficherModalImport = ref(false);

/**
 * Callback apres importation massif CSV/Excel.
 * Affiche une alerte avec le nombre de candidats importes.
 *
 * @param {number} nombre - Nombre de candidats importes
 */
function onImporte(nombre) {
  alert(`${nombre} nouveaux candidats importes avec succes !`);
}
</script>
