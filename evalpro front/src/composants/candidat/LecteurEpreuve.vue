<template>
  <!-- 
    Composant LecteurEpreuve : gère le rendu interactif des questions pendant l'examen.
    Supporte les QCM (choix unique), les réponses courtes, le code SQL et Python.
  -->
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
    
    <!-- En-tête de la Question -->
    <div class="flex items-center justify-between pb-4 border-b border-slate-800">
      <div class="flex items-center space-x-3">
        <span class="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider">
          Question {{ indexQuestion + 1 }} / {{ nombreTotal }}
        </span>
        <span class="text-xs text-slate-400 font-medium">Points : {{ question.points }}</span>
      </div>

      <button 
        @click="$emit('marquerQuestion', question.id)" 
        :class="[
          'flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border',
          question.estMarqueePourVerification
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
        ]"
      >
        <span class="material-symbols-outlined text-sm">bookmark</span>
        <span>{{ question.estMarqueePourVerification ? 'Marquée' : 'Marquer pour relecture' }}</span>
      </button>
    </div>

    <!-- Énoncé de la question -->
    <div class="py-6">
      <h3 class="text-lg font-bold text-white mb-2">{{ question.titre }}</h3>
      <p class="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{{ question.enonce }}</p>
    </div>

    <!-- Rendu selon le Type de Question -->
    <div class="pt-2">
      
      <!-- Type 1 : QCM (Choix unique) -->
      <div v-if="question.type === 'qcm'" class="space-y-3">
        <label 
          v-for="option in question.options" 
          :key="option.id"
          :class="[
            'flex items-center p-4 rounded-xl border transition-all cursor-pointer',
            reponseLocale === option.id 
              ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm' 
              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
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
            'w-5 h-5 rounded-full border mr-3 flex items-center justify-center text-xs font-bold transition-colors',
            reponseLocale === option.id ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-slate-700 bg-slate-900 text-slate-500'
          ]">
            {{ option.id.toUpperCase() }}
          </div>
          <span class="text-sm font-medium">{{ option.texte }}</span>
        </label>
      </div>

      <!-- Type 2 : Réponse Courte / Dissertation -->
      <div v-else-if="question.type === 'reponse_courte'" class="space-y-2">
        <textarea 
          v-model="reponseLocale"
          @input="sauvegarderReponse"
          rows="5"
          placeholder="Rédigez votre réponse ici..."
          class="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
        ></textarea>
      </div>

      <!-- Type 3 : Requête SQL / Code Sandbox -->
      <div v-else-if="question.type === 'sql' || question.type === 'code'" class="space-y-3">
        <div class="flex items-center justify-between text-xs text-slate-400 bg-slate-950 px-4 py-2 rounded-t-xl border-t border-x border-slate-800">
          <div class="flex items-center space-x-2">
            <span class="material-symbols-outlined text-indigo-400 text-sm">code</span>
            <span class="font-mono text-slate-300">{{ question.type === 'sql' ? 'Éditeur SQL' : 'Éditeur Python (Sandbox)' }}</span>
          </div>
          <span>Syntaxe contrôlée</span>
        </div>
        <textarea 
          v-model="reponseLocale"
          @input="sauvegarderReponse"
          rows="7"
          placeholder="Saisissez votre code ou votre requête..."
          class="w-full bg-slate-950 font-mono text-xs border border-slate-800 rounded-b-xl p-4 text-emerald-400 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
        ></textarea>
      </div>

    </div>

    <!-- Sauvegarde Automatique Indicative -->
    <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
      <div class="flex items-center space-x-1.5 text-emerald-400">
        <span class="material-symbols-outlined text-sm">cloud_done</span>
        <span>Sauvegarde automatique toutes les 30 sec</span>
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
