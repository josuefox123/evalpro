<template>
  <!-- 
    TableauDeBordEntreprise.vue (Dashboard RH B2B SaaS)
    Tableau de bord administrateur entreprise avec KPI, campagnes récentes et suivi des recrutements.
  -->
  <div class="space-y-8">
    
    <!-- En-tête de bienvenue B2B -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-texte-principal tracking-tight">Bonjour, Samira Hadjab</h1>
        <p class="text-xs text-texte-secondaire mt-1">Voici l'état général de vos activités de recrutement pour <strong class="text-texte-principal">TechCorp Algérie</strong>.</p>
      </div>

      <div class="flex items-center space-x-3">
        <button 
          @click="afficherModalImport = true" 
          class="px-4 py-2 rounded-lg bg-white border border-bordure hover:bg-fond-secondaire text-texte-principal text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">upload_file</span>
          <span>Importation Massives (CSV/Excel)</span>
        </button>

        <router-link 
          to="/campagnes/nouvelle" 
          class="px-4 py-2 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-all cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">add</span>
          <span>Créer une Campagne</span>
        </router-link>
      </div>
    </div>

    <!-- Première Ligne : Cartes KPI RH -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique 
        titre="Campagnes Actives" 
        valeur="12" 
        icone="campaign" 
        tendance="+3 ce mois" 
        :tendancePositive="true"
        couleurFondIcone="bg-bleu-50" 
        couleurTexteIcone="text-bleu-600" 
      />

      <CarteStatistique 
        titre="Candidats Enregistrés" 
        valeur="1,248" 
        icone="groups" 
        tendance="+120 cette semaine" 
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-50" 
        couleurTexteIcone="text-emerald-600" 
      />

      <CarteStatistique 
        titre="Épreuves & Tests" 
        valeur="34" 
        icone="quiz" 
        tendance="28 publiées" 
        :tendancePositive="true"
        couleurFondIcone="bg-indigo-50" 
        couleurTexteIcone="text-indigo-600" 
      />

      <CarteStatistique 
        titre="Copies à Corriger" 
        valeur="43" 
        icone="fact_check" 
        tendance="Évaluation manuelle" 
        :tendancePositive="false"
        couleurFondIcone="bg-amber-50" 
        couleurTexteIcone="text-amber-600" 
      />
    </div>

    <!-- Deuxième Ligne : Graphique Activité & Répartition des Résultats -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <div class="lg:col-span-8 bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-texte-principal">Activité des Candidatures (Volume Hebdomadaire)</h3>
            <p class="text-xs text-texte-secondaire">Suivi des inscriptions et passages d'épreuves sur 6 mois</p>
          </div>
          <span class="text-xs font-semibold text-bleu-600 bg-bleu-50 border border-bleu-100 px-2.5 py-1 rounded-full">
            +18.4% de taux de réponse
          </span>
        </div>

        <!-- Histogramme d'activité B2B épuré -->
        <div class="h-48 pt-4 flex items-end justify-between gap-4 border-b border-bordure pb-2">
          <div v-for="(mois, idx) in activiteHebdo" :key="idx" class="flex-1 flex flex-col items-center gap-2 group">
            <div class="w-full bg-bleu-100 group-hover:bg-bleu-600 transition-colors rounded-t-md relative" :style="{ height: mois.hauteur + '%' }">
              <span class="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded font-mono transition-opacity">
                {{ mois.valeur }}
              </span>
            </div>
            <span class="text-[11px] font-medium text-texte-secondaire">{{ mois.label }}</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-4">
        <h3 class="text-sm font-bold text-texte-principal">Répartition des Résultats</h3>
        <p class="text-xs text-texte-secondaire">Taux d'admissibilité globales</p>

        <div class="space-y-3 pt-2">
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-emerald-700">Admissibles</span>
              <span class="font-mono text-texte-principal">34% (424 candidats)</span>
            </div>
            <div class="w-full h-2 bg-fond-secondaire rounded-full overflow-hidden">
              <div class="h-full bg-emerald-600 rounded-full" style="width: 34%"></div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-amber-700">Liste d'Attente</span>
              <span class="font-mono text-texte-principal">18% (225 candidats)</span>
            </div>
            <div class="w-full h-2 bg-fond-secondaire rounded-full overflow-hidden">
              <div class="h-full bg-amber-500 rounded-full" style="width: 18%"></div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-rose-700">Non Admis</span>
              <span class="font-mono text-texte-principal">48% (599 candidats)</span>
            </div>
            <div class="w-full h-2 bg-fond-secondaire rounded-full overflow-hidden">
              <div class="h-full bg-rose-500 rounded-full" style="width: 48%"></div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Troisième Ligne : Tableau des Campagnes Récents -->
    <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-texte-principal">Campagnes Récentes</h3>
        <router-link to="/campagnes" class="text-xs font-semibold text-bleu-600 hover:underline">
          Voir toutes les campagnes
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-texte-principal">
          <thead class="bg-fond-principal text-texte-secondaire uppercase font-semibold border-y border-bordure">
            <tr>
              <th class="p-3">Poste & Intitulé</th>
              <th class="p-3">Département</th>
              <th class="p-3">Candidats</th>
              <th class="p-3">Statut</th>
              <th class="p-3">Consultant Responsable</th>
              <th class="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-bordure">
            <tr v-for="campagne in magasinCampagne.campagnes" :key="campagne.id" class="hover:bg-fond-secondaire/50 transition-colors">
              <td class="p-3 font-semibold text-texte-principal">
                <div>{{ campagne.titre }}</div>
                <div class="text-[10px] text-texte-secondaire font-normal">{{ campagne.poste }}</div>
              </td>
              <td class="p-3 text-texte-secondaire">{{ campagne.departement }}</td>
              <td class="p-3 font-mono font-bold text-texte-principal">{{ campagne.candidatsCount }}</td>
              <td class="p-3">
                <BadgesStatut :statut="campagne.statut" />
              </td>
              <td class="p-3 text-texte-secondaire">{{ campagne.consultantAssigne }}</td>
              <td class="p-3 text-right">
                <router-link to="/candidats" class="text-bleu-600 font-semibold hover:underline">
                  Détails
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modale Importation Massif si activée -->
    <div v-if="afficherModalImport" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
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

const activiteHebdo = [
  { label: 'Jan', hauteur: 40, valeur: '124' },
  { label: 'Fév', hauteur: 65, valeur: '187' },
  { label: 'Mar', hauteur: 50, valeur: '156' },
  { label: 'Avr', hauteur: 85, valeur: '234' },
  { label: 'Mai', hauteur: 95, valeur: '289' },
  { label: 'Juin', hauteur: 70, valeur: '198' },
];

function onImporte(nombre) {
  alert(`${nombre} nouveaux candidats importés avec succès !`);
}
</script>
