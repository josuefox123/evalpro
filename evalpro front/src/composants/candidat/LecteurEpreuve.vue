<template>
  <!-- 
    LecteurEpreuve.vue (Interface Candidat Zéro Distraction)
    Affichage sobre et ultra-lisible des questions pendant la composition du candidat.
  -->
  <div class="bg-white border border-bordure rounded-2xl p-8 shadow-carte space-y-6">
    
    <!-- En-tête de la Question -->
    <div class="flex items-center justify-between pb-4 border-b border-bordure">
      <div class="flex items-center space-x-3">
        <span class="px-3 py-1 rounded-full bg-bleu-50 text-bleu-600 border border-bleu-100 text-xs font-bold font-mono">
          QUESTION {{ indexQuestion + 1 }} / {{ nombreTotal }}
        </span>
        <span class="text-xs text-texte-secondaire font-medium">Bareme : {{ question.points }} Points</span>
      </div>

      <button 
        @click="$emit('marquerQuestion', question.id)" 
        :class="[
          'flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border',
          question.estMarqueePourVerification
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : 'bg-fond-principal text-texte-secondaire border-bordure hover:text-texte-principal'
        ]"
      >
        <span class="material-symbols-outlined text-sm">bookmark</span>
        <span>{{ question.estMarqueePourVerification ? 'Marquée pour relecture' : 'Marquer cette question' }}</span>
      </button>
    </div>

    <!-- Énoncé de la question -->
    <div class="py-2 space-y-3">
      <h3 class="text-xl font-bold text-texte-principal leading-snug">{{ question.titre }}</h3>
      <p class="text-texte-secondaire text-sm leading-relaxed whitespace-pre-line">{{ question.enonce }}</p>
    </div>

    <!-- Choix de Réponses -->
    <div class="pt-2">
      
      <!-- Option 1 : QCM Choix Unique -->
      <div v-if="question.type === 'qcm' || question.type === 'qcm_multiple'" class="space-y-3">
        <label 
          v-for="option in question.options" 
          :key="option.id"
          :class="[
            'flex items-center p-4 rounded-xl border transition-all cursor-pointer',
            reponseLocale === option.id 
              ? 'bg-bleu-50 border-bleu-600 text-bleu-900 shadow-sm font-semibold' 
              : 'bg-white border-bordure text-texte-principal hover:bg-fond-principal hover:border-slate-300'
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
            reponseLocale === option.id ? 'border-bleu-600 bg-bleu-600 text-white' : 'border-bordure bg-fond-principal text-texte-secondaire'
          ]">
            {{ option.id.toUpperCase() }}
          </div>
          <span class="text-sm font-medium">{{ option.texte }}</span>
        </label>
      </div>

      <!-- Option 2 : Réponse Courte / Texte -->
      <div v-else-if="question.type === 'reponse_courte'" class="space-y-2">
        <textarea 
          v-model="reponseLocale"
          @input="sauvegarderReponse"
          rows="5"
          placeholder="Rédigez votre réponse ici..."
          class="w-full bg-fond-principal border border-bordure rounded-xl p-4 text-sm text-texte-principal placeholder-texte-muet focus:outline-none focus:border-bleu-600 transition-colors"
        ></textarea>
      </div>

      <!-- Option 3 : Code SQL / Python Sandbox -->
      <div v-else-if="question.type === 'sql' || question.type === 'code'" class="space-y-2">
        <div class="flex items-center justify-between text-xs text-texte-secondaire bg-slate-900 text-slate-200 px-4 py-2 rounded-t-xl font-mono">
          <span class="flex items-center space-x-2">
            <span class="material-symbols-outlined text-bleu-400 text-sm">code</span>
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

    <!-- Sauvegarde Automatique Indicative -->
    <div class="mt-8 pt-4 border-t border-bordure flex items-center justify-between text-xs text-texte-muet">
      <div class="flex items-center space-x-1.5 text-emerald-600 font-medium">
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
