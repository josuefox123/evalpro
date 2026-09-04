<template>
  <!-- 
    Composant Chronomètre pour l'examen candidat.
    Affiche le temps restant, calcule les minutes et secondes, 
    et change de couleur si le temps devient critique (< 5 minutes).
  -->
  <div 
    :class="[
      'flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-sm font-mono font-bold transition-colors',
      tempsCritique 
        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' 
        : 'bg-slate-800 text-amber-400 border-slate-700'
    ]"
  >
    <span class="material-symbols-outlined text-base">timer</span>
    <span>TEMPS RESTANT : {{ tempsFormate }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  dureeMinutesInitiales: { type: Number, default: 45 },
});

const emit = defineEmits(['tempsEcoule']);

// Temps restant en secondes
const tempsRestantSecondes = ref(props.dureeMinutesInitiales * 60);
let timerId = null;

/**
 * Calcul des minutes et secondes formates MM:SS
 */
const tempsFormate = computed(() => {
  const minutes = Math.floor(tempsRestantSecondes.value / 60);
  const secondes = tempsRestantSecondes.value % 60;
  const mStr = String(minutes).padStart(2, '0');
  const sStr = String(secondes).padStart(2, '0');
  return `${mStr}:${sStr}`;
});

/**
 * Indique si le temps est sous le seuil critique (moins de 5 minutes)
 */
const tempsCritique = computed(() => tempsRestantSecondes.value < 300);

onMounted(() => {
  timerId = setInterval(() => {
    if (tempsRestantSecondes.value > 0) {
      tempsRestantSecondes.value--;
    } else {
      clearInterval(timerId);
      emit('tempsEcoule');
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerId) clearInterval(timerId);
});
</script>
