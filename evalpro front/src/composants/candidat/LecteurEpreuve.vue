<template>
  <!--
    LecteurEpreuve.vue - Composant d'affichage des questions pour le candidat
  -->
  <div class="bg-white border border-ep-border rounded-xl p-6 sm:p-8 shadow-ep-card space-y-6">

    <!-- En-tête de la Question -->
    <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ep-border">
      <div class="flex flex-wrap items-center gap-2">
        <span class="px-3 py-1 rounded-full bg-blue-50 text-ep-primary border border-blue-100 text-xs font-bold font-mono">
          QUESTION {{ indexQuestion + 1 }} / {{ nombreTotal }}
        </span>
        <span class="text-xs text-ep-muted font-medium">Barème : {{ question.points }} Points</span>
      </div>

      <button
        @click="$emit('marquerQuestion', question.id)"
        :class="[
          'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border',
          question.estMarqueePourVerification
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : 'bg-slate-50 text-ep-muted border-ep-border hover:text-ep-text'
        ]"
      >
        <span class="material-symbols-outlined text-sm">bookmark</span>
        <span>{{ question.estMarqueePourVerification ? 'Marquée' : 'Marquer' }}</span>
      </button>
    </div>

    <!-- Énoncé de la question -->
    <div class="py-2 space-y-3">
      <h3 class="text-lg font-bold text-ep-text font-titre leading-snug">{{ question.titre }}</h3>
      <p class="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{{ question.enonce }}</p>
    </div>

    <!-- Choix de Réponses -->
    <div class="pt-2">

      <!-- QCM -->
      <div v-if="question.type === 'qcm' || question.type === 'qcm_multiple'" class="space-y-3">
        <label
          v-for="option in question.options"
          :key="option.id"
          :class="[
            'flex items-center p-4 rounded-xl border transition-all cursor-pointer',
            reponseLocale === option.id
              ? 'bg-blue-50/60 border-ep-primary text-ep-text font-semibold shadow-ep-subtle'
              : 'bg-white border-ep-border text-ep-text hover:bg-slate-50 hover:border-slate-300'
          ]"
        >
          <input
            type="radio"
            :name="'question_' + question.id"
            :value="option.id"
            v-model="reponseLocale"
            @change="sauvegarderReponse"
            class="hidden"
          />
          <div :class="[
            'w-6 h-6 rounded-full border mr-3 flex items-center justify-center text-xs font-bold font-mono transition-colors',
            reponseLocale === option.id ? 'border-ep-primary bg-ep-primary text-white' : 'border-ep-border bg-slate-100 text-ep-muted'
          ]">
            {{ option.id.toUpperCase() }}
          </div>
          <span class="text-sm font-medium">{{ option.texte }}</span>
        </label>
      </div>

      <!-- Réponse Courte / Texte -->
      <div v-else-if="question.type === 'reponse_courte'" class="space-y-2">
        <textarea
          v-model="reponseLocale"
          @input="sauvegarderReponse"
          rows="5"
          placeholder="Rédigez votre réponse ici..."
          class="w-full bg-white border border-ep-border rounded-xl p-4 text-sm text-ep-text placeholder:text-ep-muted focus:outline-none focus:ring-2 focus:ring-ep-primary/20 focus:border-ep-primary transition-colors"
        ></textarea>
      </div>

      <!-- Code SQL / Python Sandbox -->
      <div v-else-if="question.type === 'sql' || question.type === 'code'" class="space-y-2">
        <div class="flex items-center justify-between text-xs text-slate-300 bg-slate-900 px-4 py-2 rounded-t-xl font-mono">
          <span class="flex items-center gap-2">
            <span class="material-symbols-outlined text-ep-primary text-sm">code</span>
            <span>Éditeur de Code Sandbox</span>
          </span>
          <span>Syntaxe contrôlée</span>
        </div>
        <textarea
          v-model="reponseLocale"
          @input="sauvegarderReponse"
          rows="7"
          placeholder="Saisissez votre code..."
          class="w-full bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-900 rounded-b-xl p-4 focus:outline-none leading-relaxed"
        ></textarea>
      </div>

    </div>

    <!-- Indicator de sauvegarde -->
    <div class="mt-8 pt-4 border-t border-ep-border flex items-center justify-between text-xs text-ep-muted">
      <div class="flex items-center gap-1.5 text-emerald-600 font-medium">
        <span class="material-symbols-outlined text-sm">cloud_done</span>
        <span>Sauvegarde automatique active</span>
      </div>
      <span>Question {{ indexQuestion + 1 }} sur {{ nombreTotal }}</span>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  question: { type: Object, required: true },
  indexQuestion: { type: Number, required: true },
  nombreTotal: { type: Number, required: true },
});

const emit = defineEmits(['enregistrerReponse', 'marquerQuestion']);

const reponseLocale = ref(props.question.reponseCandidat || '');

watch(() => props.question.id, () => {
  reponseLocale.value = props.question.reponseCandidat || '';
});

function sauvegarderReponse() {
  emit('enregistrerReponse', { questionId: props.question.id, reponse: reponseLocale.value });
}
</script>
