<template>
  <!-- 
    HorlogeChrono.vue (Timer Examen Candidat B2B)
    Affiche le temps restant (ex: 42:18) de manière claire et lisible.
  -->
  <div 
    :class="[
      'flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors',
      tempsCritique 
        ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
        : 'bg-fond-principal text-texte-principal border-bordure'
    ]"
  >
    <span class="material-symbols-outlined text-base" :class="tempsCritique ? 'text-rose-600' : 'text-bleu-600'">timer</span>
    <span>TEMPS RESTANT : {{ tempsFormate }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  dureeMinutesInitiales: { type: Number, default: 45 },
});

const emit = defineEmits(['tempsEcoule']);

const tempsRestantSecondes = ref(props.dureeMinutesInitiales * 60);
let timerId = null;

const tempsFormate = computed(() => {
  const minutes = Math.floor(tempsRestantSecondes.value / 60);
  const secondes = tempsRestantSecondes.value % 60;
  const mStr = String(minutes).padStart(2, '0');
  const sStr = String(secondes).padStart(2, '0');
  return `${mStr}:${sStr}`;
});

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
