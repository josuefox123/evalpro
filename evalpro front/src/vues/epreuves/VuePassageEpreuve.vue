<template>
  <!--
    VuePassageEpreuve.vue - Interface Examen Candidat Zéro Distraction EvalPro
  -->
  <div class="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">

    <!-- En-tête de Session Candidat -->
    <div class="bg-white border border-ep-border rounded-xl p-4 sm:p-5 shadow-ep-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-1 text-[11px] font-bold text-ep-primary uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
          <span class="material-symbols-outlined text-xs">shield</span>
          <span>Session Officielle sous Surveillance</span>
        </div>
        <h1 class="text-lg font-bold text-ep-text font-titre">{{ epreuve.titre }}</h1>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <HorlogeChrono :dureeMinutesInitiales="epreuve.dureeMinutes" @tempsEcoule="soumettreExamen" />

        <EpButton variant="success" size="sm" iconLeft="send" @click="soumettreExamen">
          Soumettre la Copie
        </EpButton>
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

        <!-- Navigation Précédent / Suivant -->
        <div class="flex items-center justify-between pt-2">
          <EpButton
            variant="outline"
            size="md"
            iconLeft="arrow_back"
            :disabled="indexQuestionActive === 0"
            @click="indexQuestionActive--"
          >
            Précédent
          </EpButton>

          <EpButton
            v-if="indexQuestionActive < epreuve.questions.length - 1"
            variant="primary"
            size="md"
            iconRight="arrow_forward"
            @click="indexQuestionActive++"
          >
            Suivant
          </EpButton>

          <EpButton
            v-else
            variant="success"
            size="md"
            iconLeft="check"
            @click="soumettreExamen"
          >
            Terminer l'Épreuve
          </EpButton>
        </div>
      </div>

      <!-- Navigation Grille & Proctoring (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        <IndicateurSurveillance />

        <!-- Grille de progression des questions -->
        <div class="bg-white border border-ep-border rounded-xl p-5 shadow-ep-card space-y-4">
          <div class="flex items-center justify-between text-xs border-b border-ep-border pb-3">
            <span class="font-bold text-ep-text uppercase tracking-wider">Progression</span>
            <span class="text-ep-primary font-mono font-bold">{{ reponduesCount }} / {{ epreuve.questions.length }} Répondues</span>
          </div>

          <div class="grid grid-cols-4 gap-2.5">
            <button
              v-for="(q, idx) in epreuve.questions"
              :key="q.id"
              @click="indexQuestionActive = idx"
              :class="[
                'p-3 rounded-lg border text-xs font-mono font-bold transition-all relative flex items-center justify-center cursor-pointer',
                indexQuestionActive === idx
                  ? 'bg-ep-primary text-white border-ep-primary shadow-ep-subtle'
                  : q.reponseCandidat
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-50 text-ep-muted border-ep-border hover:border-slate-300'
              ]"
            >
              <span>{{ idx + 1 }}</span>
              <span v-if="q.estMarqueePourVerification" class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
            </button>
          </div>

          <div class="pt-3 border-t border-ep-border grid grid-cols-2 gap-2 text-[10px] text-ep-muted">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded bg-emerald-500"></span>
              <span>Répondue</span>
            </div>
            <div class="flex items-center gap-1.5">
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
import { useMagasinNotification } from '../../magasins/notification.store';
import HorlogeChrono from '../../composants/candidat/HorlogeChrono.vue';
import LecteurEpreuve from '../../composants/candidat/LecteurEpreuve.vue';
import IndicateurSurveillance from '../../composants/candidat/IndicateurSurveillance.vue';
import EpButton from '../../composants/systeme/EpButton.vue';

const router = useRouter();
const magasinEpreuve = useMagasinEpreuve();
const magasinNotif = useMagasinNotification();

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
  magasinNotif.succes("Votre copie a été soumise avec succès ! Les résultats seront publiés sous peu par l'entreprise.", "Épreuve Terminée");
  router.push('/candidat/confirmation');
}
</script>
