<template>
  <!-- 
    VuePassageEpreuve.vue (Interface Examen Candidat Zéro Distraction)
    Session officielle d'évaluation sous proctoring anti-fraude sans distraction.
  -->
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    
    <!-- En-tête de Session (Sans Sidebar Administrateur) -->
    <div class="bg-white border border-bordure rounded-2xl p-4 sm:p-6 shadow-carte flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="space-y-1">
        <span class="text-[10px] font-bold uppercase text-bleu-600 tracking-wider">Session Officielle sous Surveillance</span>
        <h1 class="text-xl font-extrabold text-texte-principal">{{ epreuve.titre }}</h1>
      </div>

      <div class="flex items-center space-x-4">
        <HorlogeChrono :dureeMinutesInitiales="epreuve.dureeMinutes" @tempsEcoule="soumettreExamen" />

        <button 
          @click="soumettreExamen" 
          class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-carte transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">send</span>
          <span>Soumettre ma Copie</span>
        </button>
      </div>
    </div>

    <!-- Contenu Principal 2 Colonnes -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Zone Question & Réponse (8 cols) -->
      <div class="lg:col-span-8 space-y-4">
        
        <LecteurEpreuve 
          v-if="questionCourante"
          :question="questionCourante" 
          :indexQuestion="indexQuestionActive" 
          :nombreTotal="epreuve.questions.length"
          @enregistrerReponse="onEnregistrerReponse"
          @marquerQuestion="onMarquerQuestion"
        />

        <!-- Boutons Précédent / Suivant -->
        <div class="flex items-center justify-between pt-2">
          <button 
            @click="indexQuestionActive--" 
            :disabled="indexQuestionActive === 0"
            class="px-4 py-2 rounded-xl bg-white border border-bordure text-texte-secondaire hover:text-texte-principal disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold shadow-carte transition-colors flex items-center space-x-1"
          >
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Question Précédente</span>
          </button>

          <button 
            v-if="indexQuestionActive < epreuve.questions.length - 1"
            @click="indexQuestionActive++" 
            class="px-4 py-2 rounded-xl bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span>Question Suivante</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>

          <button 
            v-else
            @click="soumettreExamen" 
            class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-carte transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span>Terminer l'Épreuve</span>
            <span class="material-symbols-outlined text-sm">check</span>
          </button>
        </div>

      </div>

      <!-- Navigation Grille & Proctoring (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        
        <!-- Surveillance Anti-Fraude Proctoring -->
        <IndicateurSurveillance />

        <!-- Grille des Questions -->
        <div class="bg-white border border-bordure rounded-2xl p-5 shadow-carte space-y-4">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-texte-principal uppercase tracking-wider">Progression</span>
            <span class="text-bleu-600 font-mono font-bold">{{ reponduesCount }} / {{ epreuve.questions.length }} Répondues</span>
          </div>

          <div class="grid grid-cols-4 gap-2.5">
            <button 
              v-for="(q, idx) in epreuve.questions" 
              :key="q.id"
              @click="indexQuestionActive = idx"
              :class="[
                'p-3 rounded-xl border text-xs font-mono font-bold transition-all relative flex items-center justify-center cursor-pointer',
                indexQuestionActive === idx
                  ? 'bg-bleu-600 text-white border-bleu-600 shadow'
                  : q.reponseCandidat
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-fond-principal text-texte-secondaire border-bordure hover:border-slate-300'
              ]"
            >
              <span>{{ idx + 1 }}</span>
              <span v-if="q.estMarqueePourVerification" class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
            </button>
          </div>

          <div class="pt-2 border-t border-bordure grid grid-cols-2 gap-2 text-[10px] text-texte-secondaire">
            <div class="flex items-center space-x-1.5">
              <span class="w-2.5 h-2.5 rounded bg-emerald-500"></span>
              <span>Répondue</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <span class="w-2.5 h-2.5 rounded bg-amber-500"></span>
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
  alert('Votre copie a été soumise avec succès ! Les résultats seront publiés par l\'entreprise.');
  router.push('/resultats');
}
</script>
