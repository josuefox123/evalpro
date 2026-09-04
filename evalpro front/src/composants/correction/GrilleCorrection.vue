<template>
  <!-- 
    Composant GrilleCorrection : Interface de notation manuelle pour le Consultant / Évaluateur.
    Permet d'attribuer une note par question ouverte, d'ajouter des commentaires explicatifs 
    et de valider la copie finale.
  -->
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
    
    <div class="flex items-center justify-between pb-4 border-b border-slate-800">
      <div>
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Evaluation Manuelle</span>
        <h3 class="text-lg font-bold text-white mt-0.5">Copie de : {{ candidat.prenom }} {{ candidat.nom }}</h3>
      </div>

      <div class="text-right">
        <div class="text-xs text-slate-400">Total Provisoire</div>
        <div class="text-2xl font-extrabold text-emerald-400 font-mono">{{ noteAttribueeTotale }} / {{ totalBareme }}</div>
      </div>
    </div>

    <!-- Questions et Grille de Notation -->
    <div class="space-y-6">
      <div 
        v-for="(q, idx) in questionsEvaluation" 
        :key="q.id" 
        class="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-indigo-400">Question {{ idx + 1 }} ({{ q.type.toUpperCase() }})</span>
          <span class="text-xs text-slate-400">Barème Max : <strong class="text-white font-mono">{{ q.points }} pts</strong></span>
        </div>

        <div>
          <h4 class="text-sm font-semibold text-white">{{ q.titre }}</h4>
          <p class="text-xs text-slate-400 mt-1">{{ q.enonce }}</p>
        </div>

        <!-- Réponse fournie par le candidat -->
        <div class="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-300 whitespace-pre-line">
          {{ q.reponseCandidat || 'Aucune réponse fournie.' }}
        </div>

        <!-- Formulaire de notation du correcteur -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Note Attribuée</label>
            <div class="flex items-center space-x-2">
              <input 
                type="number" 
                v-model.number="q.noteAttribuee" 
                min="0" 
                :max="q.points" 
                step="0.5" 
                class="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              />
              <span class="text-xs text-slate-400">/ {{ q.points }}</span>
            </div>
          </div>

          <div class="md:col-span-2">
            <label class="block text-xs font-semibold text-slate-300 mb-1">Commentaire de l'Évaluateur</label>
            <input 
              type="text" 
              v-model="q.commentaire" 
              placeholder="Ex: Excellente logique algorithmique, optimisation possible..." 
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Actions de validation de correction -->
    <div class="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
      <button 
        @click="$emit('sauvegarderBrouillon')" 
        class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
      >
        Sauvegarder Brouillon
      </button>

      <button 
        @click="$emit('validerCorrection', noteAttribueeTotale)" 
        class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
      >
        <span class="material-symbols-outlined text-base">verified</span>
        <span>Valider et Publier la Note</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  candidat: { type: Object, required: true },
  questions: { type: Array, required: true },
});

defineEmits(['validerCorrection', 'sauvegarderBrouillon']);

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
