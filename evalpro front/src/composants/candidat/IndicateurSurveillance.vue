<template>
  <!-- 
    IndicateurSurveillance.vue (Module Anti-Fraude B2B)
    Indicateur discret de proctoring pour l'examen candidat (webcam, microphone, pertes de focus).
  -->
  <div class="bg-white border border-bordure rounded-xl p-4 shadow-carte space-y-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <h4 class="text-xs font-bold text-texte-principal uppercase tracking-wider">Surveillance Active (Niveau {{ magasinProctoring.niveauSecurite }})</h4>
      </div>
      <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
        Intégrité : {{ magasinProctoring.scoreIntegrite }}%
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 text-xs">
      <div class="relative bg-slate-900 rounded-lg h-24 overflow-hidden border border-slate-800 flex items-center justify-center">
        <template v-if="magasinProctoring.webcamActive">
          <div class="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center text-slate-300">
            <span class="material-symbols-outlined text-2xl text-bleu-400 mb-1">videocam</span>
            <span class="text-[10px] text-slate-400">Flux Webcam Enregistré</span>
          </div>
          <div class="absolute top-1.5 left-1.5 flex items-center space-x-1 bg-slate-950/90 px-1.5 py-0.5 rounded text-[9px] text-emerald-400 font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Visage Conforme</span>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-col items-center text-rose-400">
            <span class="material-symbols-outlined text-2xl">videocam_off</span>
            <span class="text-[10px]">Webcam Inactive</span>
          </div>
        </template>
      </div>

      <div class="space-y-2">
        <div class="bg-fond-principal p-2 rounded-lg border border-bordure flex items-center justify-between">
          <span class="text-texte-secondaire">Sorties de fenêtre :</span>
          <span :class="magasinProctoring.pertesDeFocusCount > 0 ? 'text-amber-600 font-bold' : 'text-texte-principal'">
            {{ magasinProctoring.pertesDeFocusCount }}
          </span>
        </div>

        <div class="bg-fond-principal p-2 rounded-lg border border-bordure flex items-center justify-between">
          <span class="text-texte-secondaire">Presse-papier bloqué :</span>
          <span class="text-texte-principal font-bold">{{ magasinProctoring.tentativesCopierCollerCount }}</span>
        </div>

        <button 
          @click="magasinProctoring.basculerWebcam()" 
          class="w-full py-1 px-2 rounded bg-fond-secondaire hover:bg-slate-200 text-texte-secondaire hover:text-texte-principal text-[10px] font-semibold transition-colors cursor-pointer"
        >
          {{ magasinProctoring.webcamActive ? 'Simuler incident webcam' : 'Rétablir webcam' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMagasinProctoring } from '../../magasins/proctoring.store';

const magasinProctoring = useMagasinProctoring();
</script>
