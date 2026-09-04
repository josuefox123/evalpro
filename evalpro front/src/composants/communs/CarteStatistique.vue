<template>
  <!-- 
    CarteStatistique.vue / CarteKpi (B2B SaaS HR Tech)
    Carte d'indicateur RH réutilisable avec métrique principale, tendance et icône.
  -->
  <div class="bg-white border border-bordure rounded-xl p-5 shadow-carte hover:border-slate-300 transition-all">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold text-texte-secondaire uppercase tracking-wider">{{ titre }}</span>
      <div :class="['w-9 h-9 rounded-lg flex items-center justify-center', couleurFondIcone]">
        <span class="material-symbols-outlined text-lg" :class="couleurTexteIcone">{{ icone }}</span>
      </div>
    </div>

    <div class="mt-3 flex items-baseline justify-between">
      <div class="text-2xl font-extrabold text-texte-principal tracking-tight font-sans">{{ valeur }}</div>
      
      <div v-if="tendance" class="flex items-center text-xs font-semibold" :class="tendancePositive ? 'text-emerald-600' : 'text-rose-600'">
        <span class="material-symbols-outlined text-sm mr-0.5">
          {{ tendancePositive ? 'trending_up' : 'trending_down' }}
        </span>
        <span>{{ tendance }}</span>
      </div>
    </div>

    <p v-if="description" class="mt-2 text-xs text-texte-muet">
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
  couleurFondIcone: { type: String, default: 'bg-bleu-50' },
  couleurTexteIcone: { type: String, default: 'text-bleu-600' },
});
</script>
