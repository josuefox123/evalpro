<template>
  <div class="bg-white border border-ep-border rounded-xl p-5 shadow-ep-card hover:border-slate-300 transition-all flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold text-ep-muted uppercase tracking-wider">{{ label }}</span>
      <div
        :class="[
          'w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold transition-transform hover:scale-105',
          couleurVariantes[color] || couleurVariantes.blue
        ]"
      >
        <span class="material-symbols-outlined">{{ icon }}</span>
      </div>
    </div>

    <div class="mt-3 flex items-baseline justify-between">
      <div class="text-2xl font-extrabold text-ep-text tracking-tight font-titre">
        {{ value }}
      </div>

      <div v-if="trend !== null && trend !== undefined" class="flex items-center text-xs font-semibold" :class="trendIsPositive ? 'text-emerald-600' : 'text-rose-600'">
        <span class="material-symbols-outlined text-sm mr-0.5">{{ trendIsPositive ? 'arrow_upward' : 'arrow_downward' }}</span>
        <span>{{ Math.abs(trend) }}%</span>
      </div>
    </div>

    <div v-if="subtitle" class="mt-2 text-xs text-ep-muted border-t border-slate-100 pt-2 flex items-center justify-between">
      <span>{{ subtitle }}</span>
      <span v-if="badge" class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-600">{{ badge }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String,
    default: 'analytics',
  },
  color: {
    type: String,
    default: 'blue', // 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'navy'
  },
  trend: {
    type: Number,
    default: null,
  },
  trendPositive: {
    type: Boolean,
    default: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  badge: {
    type: String,
    default: '',
  },
});

const trendIsPositive = computed(() => props.trendPositive && props.trend >= 0);

const couleurVariantes = {
  blue: 'bg-blue-50 text-ep-primary border border-blue-100',
  purple: 'bg-purple-50 text-ep-secondary border border-purple-100',
  emerald: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  amber: 'bg-amber-50 text-amber-600 border border-amber-100',
  rose: 'bg-rose-50 text-rose-600 border border-rose-100',
  navy: 'bg-slate-900 text-white',
};
</script>
