<template>
  <!-- 
    VuePassageEpreuve : Interface d'examen sous surveillance pour le Candidat.
    Inclut le chronomètre, la sauvegarde automatique 30s, le proctoring anti-fraude,
    et la grille de navigation entre les questions.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
    
    <!-- En-tête d'Examen avec Chronomètre -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="space-y-1 text-center sm:text-left">
        <span class="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Session Officielle sous Surveillance</span>
        <h1 class="text-xl font-extrabold text-white">{{ epreuve.titre }}</h1>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Chronomètre -->
        <HorlogeChrono :dureeMinutesInitiales="epreuve.dureeMinutes" @tempsEcoule="soumettreExamen" />

        <button 
          @click="soumettreExamen" 
          class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">send</span>
          <span>Soumettre ma Copie</span>
        </button>
      </div>
    </div>

    <!-- Layout Principal (2 colonnes) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Colonne Principale : Lecteur de Question (8 cols) -->
      <div class="lg:col-span-8 space-y-4">
        
        <LecteurEpreuve 
          v-if="questionCourante"
          :question="questionCourante" 
          :indexQuestion="indexQuestionActive" 
          :nombreTotal="epreuve.questions.length"
          @enregistrerReponse="onEnregistrerReponse"
          @marquerQuestion="onMarquerQuestion"
        />

        <!-- Navigation Précédent / Suivant -->
        <div class="flex items-center justify-between pt-2">
          <button 
            @click="indexQuestionActive--" 
            :disabled="indexQuestionActive === 0"
            class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-colors flex items-center space-x-1"
          >
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Question Précédente</span>
          </button>

          <button 
            v-if="indexQuestionActive < epreuve.questions.length - 1"
            @click="indexQuestionActive++" 
            class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all cursor-pointer flex items-center space-x-1"
          >
            <span>Question Suivante</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>

          <button 
            v-else
            @click="soumettreExamen" 
            class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center space-x-1"
          >
            <span>Terminer l'Épreuve</span>
            <span class="material-symbols-outlined text-sm">check</span>
          </button>
        </div>

      </div>

      <!-- Colonne Latérale : Navigation Grille & Proctoring (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        
        <!-- Module Anti-Fraude Proctoring -->
        <IndicateurSurveillance />

        <!-- Grille de Navigation entre Questions -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-white uppercase tracking-wider">Avancement de la Copie</span>
            <span class="text-indigo-400 font-mono font-bold">{{ reponduesCount }} / {{ epreuve.questions.length }} Répondues</span>
          </div>

          <!-- Puces de Questions -->
          <div class="grid grid-cols-4 gap-2.5">
            <button 
              v-for="(q, idx) in epreuve.questions" 
              :key="q.id"
              @click="indexQuestionActive = idx"
              :class="[
                'p-3 rounded-xl border text-xs font-mono font-bold transition-all relative flex items-center justify-center cursor-pointer',
                indexQuestionActive === idx
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-500/30'
                  : q.reponseCandidat
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              ]"
            >
              <span>{{ idx + 1 }}</span>
              <span v-if="q.estMarqueePourVerification" class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"></span>
            </button>
          </div>

          <!-- Légende de la grille -->
          <div class="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
            <div class="flex items-center space-x-1.5">
              <span class="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500"></span>
              <span>Répondue</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <span class="w-2.5 h-2.5 rounded bg-amber-400"></span>
              <span>Marquée</span>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinEpreuve } from '../../magasins/epreuve.store';
import HorlogeChrono from '../../composants/candidat/HorlogeChrono.vue';
import LecteurEpreuve from '../../composants/candidat/LecteurEpreuve.vue';
import IndicateurSurveillance from '../../composants/candidat/IndicateurSurveillance.vue';

const router = useRouter();
const magasinEpreuve = useMagasinEpreuve();

const epreuve = magasinEpreuve.epreuveActive;
const indexQuestionActive = ref(0);

const questionCourante = computed(() => epreuve.questions[indexQuestionActive.value]);
const reponduesCount = computed(() => epreuve.questions.filter(q => q.reponseCandidat !== null && q.reponseCandidat !== '').length);

function onEnregistrerReponse({ questionId, reponse }) {
  magasinEpreuve.enregistrerReponseCandidat(questionId, reponse);
}

function onMarquerQuestion(questionId) {
  magasinEpreuve.basculerMarquageQuestion(questionId);
}

function soumettreExamen() {
  alert('Votre copie a été soumise avec succès ! Vous allez être réorienté vers vos résultats.');
  router.push('/resultats');
}
</script>
