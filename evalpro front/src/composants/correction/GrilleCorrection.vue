<template>
  <!--
    GrilleCorrection.vue - Interface 3 colonnes de correction EvalPro SaaS
  -->
  <div class="space-y-4">
    <!-- Onglets de navigation Mobile / Tablette (< 1024px) -->
    <div class="lg:hidden flex rounded-xl bg-slate-100 p-1 border border-ep-border">
      <button
        type="button"
        @click="ongletCorrectionMobile = 'copies'"
        :class="[
          'flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer',
          ongletCorrectionMobile === 'copies' ? 'bg-white text-ep-primary shadow-sm font-bold' : 'text-ep-muted hover:text-ep-text'
        ]"
      >
        <span class="material-symbols-outlined text-sm">groups</span>
        <span>1. Copies</span>
      </button>
      <button
        type="button"
        @click="ongletCorrectionMobile = 'lecture'"
        :class="[
          'flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer',
          ongletCorrectionMobile === 'lecture' ? 'bg-white text-ep-primary shadow-sm font-bold' : 'text-ep-muted hover:text-ep-text'
        ]"
      >
        <span class="material-symbols-outlined text-sm">article</span>
        <span>2. Copie Candidat</span>
      </button>
      <button
        type="button"
        @click="ongletCorrectionMobile = 'bareme'"
        :class="[
          'flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer',
          ongletCorrectionMobile === 'bareme' ? 'bg-white text-ep-primary shadow-sm font-bold' : 'text-ep-muted hover:text-ep-text'
        ]"
      >
        <span class="material-symbols-outlined text-sm">grade</span>
        <span>3. Barème</span>
      </button>
    </div>

    <!-- Layout 3 Colonnes (Desktop) / Onglets Réactifs (Mobile) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[600px]">

      <!-- GAUCHE : Liste des Candidats à corriger (3 cols) -->
      <div
        :class="[
          'lg:col-span-3 bg-white border border-ep-border rounded-xl p-4 space-y-4 shadow-ep-card',
          ongletCorrectionMobile === 'copies' ? 'block' : 'hidden lg:block'
        ]"
      >
      <div class="flex items-center justify-between pb-3 border-b border-ep-border">
        <h3 class="text-xs font-bold text-ep-text uppercase tracking-wider">Copies Soumises</h3>
        <span class="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
          3 En attente
        </span>
      </div>

      <div class="space-y-2">
        <div
          v-for="(cand, idx) in listeCandidats"
          :key="cand.id"
          @click="candidatActifIndex = idx"
          :class="[
            'p-3 rounded-lg border transition-all cursor-pointer space-y-1',
            candidatActifIndex === idx
              ? 'bg-blue-50/50 border-ep-primary shadow-ep-subtle'
              : 'bg-slate-50 border-ep-border hover:border-slate-300'
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-ep-text">{{ cand.prenom }} {{ cand.nom }}</span>
            <span class="text-[10px] text-ep-muted font-mono">14 Jan</span>
          </div>
          <p class="text-[11px] text-ep-muted truncate">{{ cand.poste }}</p>
        </div>
      </div>
    </div>

    <!-- CENTRE : Copie du Candidat (6 cols) -->
    <div
      :class="[
        'lg:col-span-6 bg-white border border-ep-border rounded-xl p-5 space-y-5 shadow-ep-card',
        ongletCorrectionMobile === 'lecture' ? 'block' : 'hidden lg:block'
      ]"
    >
      <div class="flex items-center justify-between pb-3 border-b border-ep-border">
        <div>
          <span class="text-[10px] font-bold text-ep-muted uppercase tracking-wider">Épreuve Pratique</span>
          <h3 class="text-base font-bold text-ep-text truncate max-w-[200px] sm:max-w-none">Copie de {{ candidatActif.prenom }} {{ candidatActif.nom }}</h3>
        </div>
        <div class="text-right">
          <span class="text-xs text-ep-muted block">Score temporaire</span>
          <span class="text-lg sm:text-xl font-extrabold text-emerald-600 font-mono">{{ noteAttribueeTotale }} / {{ totalBareme }} Pts</span>
        </div>
      </div>

      <div class="space-y-6 overflow-y-auto max-h-[550px] pr-1">
        <div
          v-for="(q, idx) in questionsEvaluation"
          :key="q.id"
          class="bg-slate-50 border border-ep-border rounded-xl p-4 space-y-3"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-ep-primary">Question {{ idx + 1 }} • {{ q.type.toUpperCase() }}</span>
            <span class="text-xs text-ep-muted">Barème Max : <strong class="text-ep-text font-mono">{{ q.points }} Pts</strong></span>
          </div>

          <div>
            <h4 class="text-xs font-bold text-ep-text">{{ q.titre }}</h4>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">{{ q.enonce }}</p>
          </div>

          <div class="bg-white border border-ep-border rounded-lg p-3 text-xs font-mono text-slate-800 whitespace-pre-line shadow-ep-subtle overflow-x-auto">
            {{ q.reponseCandidat || 'Une closure en JavaScript est une fonction qui se souvient des variables de son environnement lexical lors de sa création...' }}
          </div>
        </div>
      </div>
    </div>

    <!-- DROITE : Notation & Commentaires (3 cols) -->
    <div
      :class="[
        'lg:col-span-3 bg-white border border-ep-border rounded-xl p-5 space-y-5 shadow-ep-card flex flex-col justify-between',
        ongletCorrectionMobile === 'bareme' ? 'flex' : 'hidden lg:flex'
      ]"
    >
      <div class="space-y-4">
        <h3 class="text-xs font-bold text-ep-text uppercase tracking-wider pb-3 border-b border-ep-border">
          Barème & Appréciation
        </h3>

        <div class="space-y-4 max-h-[450px] overflow-y-auto pr-1">
          <div v-for="(q, idx) in questionsEvaluation" :key="q.id" class="space-y-2 border-b border-slate-100 pb-3">
            <label class="block text-xs font-semibold text-ep-text">Note Q{{ idx + 1 }} (Max {{ q.points }} Pts)</label>
            <div class="flex items-center gap-2">
              <input
                type="number"
                v-model.number="q.noteAttribuee"
                min="0"
                :max="q.points"
                step="0.5"
                class="w-20 bg-white border border-ep-border rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-ep-text focus:outline-none focus:border-ep-primary min-h-[38px]"
              />
              <span class="text-xs text-ep-muted">/ {{ q.points }} pts</span>
            </div>

            <textarea
              v-model="q.commentaire"
              placeholder="Commentaire explicatif..."
              rows="2"
              class="w-full bg-slate-50 border border-ep-border rounded-lg p-2 text-xs text-ep-text focus:outline-none focus:border-ep-primary"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-ep-border flex flex-col gap-2">
        <EpButton variant="outline" size="sm" fullWidth @click="$emit('sauvegarderBrouillon')">
          Sauvegarder Brouillon
        </EpButton>

        <EpButton variant="success" size="sm" iconLeft="verified" fullWidth @click="$emit('validerCorrection', noteAttribueeTotale)">
          Valider et Publier Note
        </EpButton>
      </div>

    </div>

  </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import EpButton from '../systeme/EpButton.vue';

const props = defineProps({
  candidat: { type: Object, required: true },
  questions: { type: Array, required: true },
});

defineEmits(['validerCorrection', 'sauvegarderBrouillon']);

const ongletCorrectionMobile = ref('lecture');

const listeCandidats = ref([
  props.candidat,
  { id: 2, nom: 'Ouali', prenom: 'Yacine', poste: 'Analyste Financier' },
  { id: 3, nom: 'Djaballah', prenom: 'Lina', poste: 'Développeur Web Full-Stack' },
]);

const candidatActifIndex = ref(0);
const candidatActif = computed(() => listeCandidats.value[candidatActifIndex.value]);

const questionsEvaluation = ref(
  props.questions.map(q => ({
    ...q,
    noteAttribuee: q.noteAttribuee !== undefined ? q.noteAttribuee : Math.round(q.points * 0.8),
    commentaire: q.commentaire || '',
  }))
);

const noteAttribueeTotale = computed(() => {
  return questionsEvaluation.value.reduce((sum, q) => sum + (q.noteAttribuee || 0), 0);
});

const totalBareme = computed(() => {
  return questionsEvaluation.value.reduce((sum, q) => sum + q.points, 0);
});
</script>
