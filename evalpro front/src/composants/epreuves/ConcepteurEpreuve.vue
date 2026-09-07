<template>
  <!--
    ConcepteurEpreuve.vue - Exam Builder 3 Colonnes B2B SaaS EvalPro
  -->
  <div class="space-y-4">

    <!-- En-tête de l'Éditeur d'Épreuve -->
    <div class="bg-white border border-ep-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-ep-card">
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-ep-primary uppercase tracking-wider">Exam Builder HR Tech</span>
        <h2 class="text-base font-bold text-ep-text flex items-center gap-2">
          <span>Épreuve : {{ epreuve.titre }}</span>
        </h2>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="text-xs text-ep-muted flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-50 border border-ep-border">
          <span>Questions : <strong class="text-ep-text">{{ epreuve.questions.length }}</strong></span>
          <span>•</span>
          <span>Barème : <strong class="text-ep-primary font-mono">{{ pointsTotaux }} Pts</strong></span>
          <span>•</span>
          <span>Durée : <strong class="text-ep-text">{{ epreuve.dureeMinutes }} min</strong></span>
        </div>

        <EpButton variant="primary" size="sm" iconLeft="save" @click="sauvegarder">
          Enregistrer
        </EpButton>
      </div>
    </div>

    <!-- Layout 3 Colonnes -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[650px]">

      <!-- COLONNE 1 : Types de Questions & Banque (3 cols) -->
      <div class="lg:col-span-3 bg-white border border-ep-border rounded-xl p-4 space-y-4 shadow-ep-card flex flex-col">
        <h3 class="text-xs font-bold text-ep-text uppercase tracking-wider pb-2 border-b border-ep-border flex items-center justify-between">
          <span>Types & Banque</span>
          <span class="text-[10px] text-ep-primary font-normal">Cliquer pour ajouter</span>
        </h3>

        <!-- Liste des Types de Questions -->
        <div class="space-y-2">
          <div class="text-[11px] font-semibold text-ep-muted">Types de Questions</div>
          <div class="grid grid-cols-1 gap-1.5">
            <button
              v-for="typeQ in typesQuestionsDisponibles"
              :key="typeQ.code"
              @click="creerNouvelleQuestion(typeQ)"
              class="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/60 hover:border-blue-200 border border-ep-border text-left transition-all cursor-pointer group"
            >
              <div class="w-7 h-7 rounded-md bg-white border border-ep-border flex items-center justify-center text-ep-primary group-hover:bg-ep-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined text-base">{{ typeQ.icone }}</span>
              </div>
              <div>
                <div class="text-xs font-semibold text-ep-text group-hover:text-ep-primary">{{ typeQ.libelle }}</div>
                <div class="text-[10px] text-ep-muted">{{ typeQ.categorie }}</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Questions de la Banque Centrale -->
        <div class="space-y-2 flex-1 pt-2 border-t border-ep-border overflow-y-auto max-h-60">
          <div class="text-[11px] font-semibold text-ep-muted">Banque Centrale</div>
          <div
            v-for="qBanque in magasinEpreuve.banqueQuestions"
            :key="qBanque.id"
            class="p-2 rounded-lg bg-slate-50 border border-ep-border hover:border-ep-primary text-xs space-y-1 cursor-pointer transition-colors"
            @click="ajouterDepuisBanque(qBanque)"
          >
            <div class="flex items-center justify-between">
              <span class="font-semibold text-ep-text truncate max-w-[140px]">{{ qBanque.titre }}</span>
              <span class="text-[10px] font-mono text-ep-primary font-bold">+{{ qBanque.points }}pts</span>
            </div>
            <div class="text-[10px] text-ep-muted flex justify-between">
              <span>{{ qBanque.domaine }}</span>
              <span class="uppercase">{{ qBanque.type }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- COLONNE 2 : Contenu & Séquence (6 cols) -->
      <div class="lg:col-span-6 bg-white border border-ep-border rounded-xl p-5 space-y-4 shadow-ep-card flex flex-col">
        <div class="flex items-center justify-between pb-3 border-b border-ep-border">
          <h3 class="text-xs font-bold text-ep-text uppercase tracking-wider">Structure de l'Examen</h3>
          <span class="text-xs text-ep-muted">{{ epreuve.questions.length }} questions configurées</span>
        </div>

        <div class="space-y-3 flex-1 overflow-y-auto pr-1">
          <div
            v-for="(q, idx) in epreuve.questions"
            :key="q.id"
            @click="indexQuestionSelectionnee = idx"
            :class="[
              'p-4 rounded-xl border transition-all cursor-pointer space-y-2',
              indexQuestionSelectionnee === idx
                ? 'bg-blue-50/50 border-ep-primary shadow-ep-subtle'
                : 'bg-white border-ep-border hover:border-slate-300'
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-md bg-ep-text text-white text-xs font-bold font-mono flex items-center justify-center">
                  {{ idx + 1 }}
                </span>
                <span class="text-xs font-bold text-ep-text">{{ q.titre }}</span>
              </div>

              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-ep-primary border border-blue-100">
                  {{ q.type }}
                </span>
                <span class="text-xs font-mono font-bold text-emerald-600">{{ q.points }} Pts</span>
                <button @click.stop="supprimerQuestion(idx)" class="p-1 text-ep-muted hover:text-rose-600 rounded transition-colors" title="Supprimer">
                  <span class="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>

            <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">{{ q.enonce }}</p>
          </div>

          <div v-if="epreuve.questions.length === 0" class="text-center py-16 text-ep-muted space-y-2">
            <span class="material-symbols-outlined text-4xl">quiz</span>
            <p class="text-xs">Aucune question dans cette épreuve. Ajoutez-en depuis le panneau de gauche.</p>
          </div>
        </div>
      </div>

      <!-- COLONNE 3 : Propriétés (3 cols) -->
      <div class="lg:col-span-3 bg-white border border-ep-border rounded-xl p-4 space-y-4 shadow-ep-card">
        <h3 class="text-xs font-bold text-ep-text uppercase tracking-wider pb-2 border-b border-ep-border">
          Propriétés Question #{{ indexQuestionSelectionnee + 1 }}
        </h3>

        <template v-if="questionActive">
          <div class="space-y-4">
            <EpInput v-model="questionActive.titre" label="Intitulé" />

            <div>
              <label class="block text-xs font-semibold text-ep-text uppercase tracking-wider mb-1.5">Énoncé de la Question</label>
              <textarea
                v-model="questionActive.enonce"
                rows="4"
                class="w-full bg-white border border-ep-border rounded-lg p-2.5 text-xs text-ep-text focus:outline-none focus:ring-2 focus:ring-ep-primary/20 focus:border-ep-primary"
              ></textarea>
            </div>

            <EpInput v-model.number="questionActive.points" type="number" label="Points Attribués" />
            <EpInput v-model.number="questionActive.tempsMaxSeconde" type="number" label="Temps Conseillé (Secondes)" />
          </div>
        </template>

        <template v-else>
          <div class="text-center py-12 text-ep-muted text-xs">
            Sélectionnez une question pour en modifier le barème.
          </div>
        </template>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMagasinEpreuve } from '../../magasins/epreuve.store';
import { useMagasinNotification } from '../../magasins/notification.store';
import EpButton from '../systeme/EpButton.vue';
import EpInput from '../systeme/EpInput.vue';

const magasinEpreuve = useMagasinEpreuve();
const magasinNotif = useMagasinNotification();
const epreuve = magasinEpreuve.epreuveActive;
const indexQuestionSelectionnee = ref(0);

const questionActive = computed(() => epreuve.questions[indexQuestionSelectionnee.value]);
const pointsTotaux = computed(() => epreuve.questions.reduce((sum, q) => sum + q.points, 0));

const typesQuestionsDisponibles = [
  { code: 'qcm', libelle: 'QCM Choix Unique', icone: 'radio_button_checked', categorie: 'Objective' },
  { code: 'qcm_multiple', libelle: 'QCM Choix Multiple', icone: 'check_box', categorie: 'Objective' },
  { code: 'reponse_courte', libelle: 'Réponse Courte', icone: 'notes', categorie: 'Ouverte' },
  { code: 'sql', libelle: 'Requête SQL', icone: 'database', categorie: 'Technique' },
  { code: 'code', libelle: 'Code Python / JS', icone: 'code', categorie: 'Technique' },
  { code: 'vrai_faux', libelle: 'Vrai / Faux', icone: 'rule', categorie: 'Objective' },
];

function creerNouvelleQuestion(typeQ) {
  const nouvelId = Date.now();
  epreuve.questions.push({
    id: nouvelId,
    titre: `Nouvelle Question (${typeQ.libelle})`,
    enonce: 'Saisissez l\'énoncé complet de votre question ici...',
    type: typeQ.code,
    points: 3,
    tempsMaxSeconde: 180,
    reponseCandidat: null,
    estMarqueePourVerification: false,
    options: typeQ.code.startsWith('qcm') ? [
      { id: 'a', texte: 'Option A' },
      { id: 'b', texte: 'Option B' },
      { id: 'c', texte: 'Option C' },
    ] : []
  });
  indexQuestionSelectionnee.value = epreuve.questions.length - 1;
}

function ajouterDepuisBanque(qBanque) {
  const nouvelId = Date.now();
  epreuve.questions.push({
    ...qBanque,
    id: nouvelId,
    reponseCandidat: null,
    estMarqueePourVerification: false,
  });
  indexQuestionSelectionnee.value = epreuve.questions.length - 1;
}

function supprimerQuestion(index) {
  epreuve.questions.splice(index, 1);
  if (indexQuestionSelectionnee.value >= epreuve.questions.length) {
    indexQuestionSelectionnee.value = Math.max(0, epreuve.questions.length - 1);
  }
}

function sauvegarder() {
  magasinNotif.succes('Épreuve configurée et enregistrée avec succès !', 'Enregistrement réussi');
}
</script>
