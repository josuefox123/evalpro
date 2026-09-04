<template>
  <!-- 
    Carte d'affichage de statistique/métrique réutilisable.
    Prend en charge une valeur, un libellé, une icône Material Symbols, 
    une tendance (+/- %) et une couleur d'accentuation.
  -->
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-sm">
    <div class="flex items-center justify-between">
      <span class="text-xs font-medium text-slate-400 uppercase tracking-wider">{{ titre }}</span>
      <div :class="['w-9 h-9 rounded-lg flex items-center justify-center', couleurFondIcone]">
        <span class="material-symbols-outlined text-lg" :class="couleurTexteIcone">{{ icone }}</span>
      </div>
    </div>

    <div class="mt-3 flex items-baseline justify-between">
      <div class="text-2xl font-extrabold text-white tracking-tight">{{ valeur }}</div>
      
      <div v-if="tendance" class="flex items-center text-xs font-semibold" :class="tendancePositive ? 'text-emerald-400' : 'text-rose-400'">
        <span class="material-symbols-outlined text-sm mr-0.5">
          {{ tendancePositive ? 'trending_up' : 'trending_down' }}
        </span>
        <span>{{ tendance }}</span>
      </div>
    </div>

    <p v-if="description" class="mt-2 text-xs text-slate-500">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  titre: { type: String, required: true },
  valeur: { type: [String, Number], required: true },
  icone: { type: String, default: 'analytics' },
  tendance: { type: String, default: null },
  tendancePositive: { type: Boolean, default: true },
  description: { type: String, default: null },
  couleurFondIcone: { type: String, default: 'bg-indigo-500/10' },
  couleurTexteIcone: { type: String, default: 'text-indigo-400' },
});
</script>
