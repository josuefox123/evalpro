<template>
  <!--
    VueBanqueQuestions.vue : Bibliothèque centrale des questions réutilisables d'EvalPro
  -->
  <div class="space-y-6">

    <!-- En-tête de page -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-ep-border shadow-ep-card">
      <div>
        <div class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-ep-primary border border-blue-100 mb-2">
          <span class="material-symbols-outlined text-xs">menu_book</span>
          <span>Base de Connaissances</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">Banque Centralisée de Questions</h1>
        <p class="text-xs text-ep-muted mt-1">Bibliothèque partagée de questions classées par domaine, type et difficulté.</p>
      </div>

      <EpButton variant="primary" size="sm" iconLeft="add" @click="afficherModalNouvelleQuestion = true">
        Créer une Question
      </EpButton>
    </div>

    <!-- Barre de Recherche et Filtres -->
    <div class="bg-white border border-ep-border rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shadow-ep-card">
      <EpInput
        v-model="magasinEpreuve.rechercheQuestionTexte"
        placeholder="Mots-clés..."
        iconLeft="search"
      />

      <EpSelect v-model="magasinEpreuve.domaineFiltre">
        <option value="TOUS">Tous les domaines</option>
        <option value="Informatique">Informatique & Dév</option>
        <option value="Finance">Finance & Comptabilité</option>
        <option value="Management">Management & RH</option>
      </EpSelect>

      <EpSelect v-model="magasinEpreuve.typeFiltre">
        <option value="TOUS">Tous les types</option>
        <option value="qcm">QCM Choix unique</option>
        <option value="reponse_courte">Réponse courte</option>
        <option value="sql">Requête SQL</option>
        <option value="code">Code Python/JS</option>
        <option value="vrai_faux">Vrai / Faux</option>
      </EpSelect>

      <EpSelect v-model="magasinEpreuve.difficulteFiltre">
        <option value="TOUS">Toutes les difficultés</option>
        <option value="Facile">Facile</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Difficile">Difficile</option>
      </EpSelect>
    </div>

    <!-- Liste des Questions -->
    <div v-if="magasinEpreuve.questionsFiltrees.length > 0" class="space-y-4">
      <div
        v-for="question in magasinEpreuve.questionsFiltrees"
        :key="question.id"
        class="bg-white border border-ep-border hover:border-slate-300 rounded-xl p-6 space-y-3.5 transition-all shadow-ep-card"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-ep-primary border border-blue-100 text-xs font-bold uppercase">
              {{ question.type }}
            </span>
            <span class="text-xs text-ep-muted font-medium">{{ question.domaine }} • {{ question.sousDomaine || '' }}</span>
          </div>

          <span class="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
            {{ question.points }} Points
          </span>
        </div>

        <h3 class="text-base font-bold text-ep-text">{{ question.titre }}</h3>
        <p class="text-xs text-slate-600 leading-relaxed">{{ question.enonce }}</p>

        <!-- Affichage des options si QCM -->
        <div v-if="question.options && question.options.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
          <div
            v-for="opt in question.options"
            :key="opt.id"
            :class="[
              'p-2.5 rounded-lg border font-medium',
              opt.correcte ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-600 border-ep-border'
            ]"
          >
            <span class="font-bold mr-1.5">{{ opt.id.toUpperCase() }}.</span> {{ opt.texte }}
          </div>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-ep-border text-[11px] text-ep-muted">
          <span>Auteur : {{ question.auteur }}</span>
          <span>Langue : {{ question.langue }}</span>
        </div>
      </div>
    </div>

    <!-- État vide -->
    <EpEmptyState
      v-else
      title="Aucune question trouvée"
      description="Aucune question ne correspond à vos critères de filtrage."
      icon="menu_book"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMagasinEpreuve } from '../../magasins/epreuve.store';
import EpButton from '../../composants/systeme/EpButton.vue';
import EpInput from '../../composants/systeme/EpInput.vue';
import EpSelect from '../../composants/systeme/EpSelect.vue';
import EpEmptyState from '../../composants/systeme/EpEmptyState.vue';

const magasinEpreuve = useMagasinEpreuve();
const afficherModalNouvelleQuestion = ref(false);
</script>
