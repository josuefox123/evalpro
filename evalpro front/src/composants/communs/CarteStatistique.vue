<template>
  <!--
    CarteStatistique.vue - Composant KPI réutilisable du Design System EvalPro
  -->
  <div class="bg-white border border-ep-border rounded-xl p-5 shadow-ep-card hover:border-slate-300 transition-all flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold text-ep-muted uppercase tracking-wider">{{ titre }}</span>
      <div :class="['w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-105', couleurFondIcone]">
        <span class="material-symbols-outlined text-xl" :class="couleurTexteIcone">{{ icone }}</span>
      </div>
    </div>

    <div class="mt-3 flex items-baseline justify-between">
      <div class="text-2xl font-extrabold text-ep-text tracking-tight font-titre">{{ valeur }}</div>

      <div
        v-if="tendance"
        class="flex items-center text-xs font-semibold"
        :class="tendancePositive ? 'text-ep-success' : 'text-ep-danger'"
      >
        <span class="material-symbols-outlined text-sm mr-0.5">
          {{ tendancePositive ? 'trending_up' : 'trending_down' }}
        </span>
        <span>{{ tendance }}</span>
      </div>
    </div>

    <p v-if="description" class="mt-2 text-xs text-ep-muted border-t border-slate-100 pt-2">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  titre:             { type: String, required: true },
  valeur:            { type: [String, Number], required: true },
  icone:             { type: String, default: 'analytics' },
  tendance:          { type: String, default: null },
  tendancePositive:  { type: Boolean, default: true },
  description:       { type: String, default: null },
  couleurFondIcone:  { type: String, default: 'bg-blue-50' },
  couleurTexteIcone: { type: String, default: 'text-ep-primary' },
});
</script>
