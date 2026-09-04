<template>
  <!-- 
    Composant de surveillance anti-fraude (Proctoring) pour le Candidat.
    Affiche le statut en direct de la webcam, de la détection de focus et du score d'intégrité.
  -->
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Surveillance Anti-Fraude (Niveau {{ magasinProctoring.niveauSecurite }})</h4>
      </div>
      <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        Intégrité : {{ magasinProctoring.scoreIntegrite }}%
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 text-xs">
      <!-- Aperçu Webcam Simulée -->
      <div class="relative bg-slate-950 rounded-lg h-24 overflow-hidden border border-slate-800 flex items-center justify-center">
        <template v-if="magasinProctoring.webcamActive">
          <div class="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-slate-400">
            <span class="material-symbols-outlined text-3xl text-indigo-400 mb-1">videocam</span>
            <span class="text-[10px] text-slate-400">Flux Webcam Actif</span>
          </div>
          <div class="absolute top-1.5 left-1.5 flex items-center space-x-1 bg-slate-900/80 px-1.5 py-0.5 rounded text-[10px] text-emerald-400">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Visage Détecté</span>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-col items-center text-rose-400">
            <span class="material-symbols-outlined text-2xl">videocam_off</span>
            <span class="text-[10px]">Webcam Inactive</span>
          </div>
        </template>
      </div>

      <!-- Métriques de Détection -->
      <div class="space-y-2">
        <div class="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
          <span class="text-slate-400">Changements d'onglet :</span>
          <span :class="magasinProctoring.pertesDeFocusCount > 0 ? 'text-amber-400 font-bold' : 'text-slate-300'">
            {{ magasinProctoring.pertesDeFocusCount }}
          </span>
        </div>

        <div class="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
          <span class="text-slate-400">Copier/Coller bloqués :</span>
          <span class="text-slate-300 font-bold">{{ magasinProctoring.tentativesCopierCollerCount }}</span>
        </div>

        <button 
          @click="magasinProctoring.basculerWebcam()" 
          class="w-full py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-medium transition-colors cursor-pointer"
        >
          {{ magasinProctoring.webcamActive ? 'Simuler arrêt webcam' : 'Réactiver webcam' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMagasinProctoring } from '../../magasins/proctoring.store';

const magasinProctoring = useMagasinProctoring();
</script>
