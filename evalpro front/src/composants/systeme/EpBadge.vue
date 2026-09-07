<template>
  <span
    :class="[
      'inline-flex items-center font-medium rounded-full transition-colors',
      varianteClasses[variant] || varianteClasses.neutral,
      tailleClasses[size] || tailleClasses.sm,
    ]"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full mr-1.5" :class="dotClasses[variant] || 'bg-slate-400'"></span>
    <span v-if="icon" class="material-symbols-outlined text-xs mr-1">{{ icon }}</span>
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'neutral', // 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'navy'
  },
  size: {
    type: String,
    default: 'sm', // 'xs' | 'sm' | 'md'
  },
  dot: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
});

const varianteClasses = {
  primary: 'bg-blue-50 text-ep-primary border border-blue-200/60',
  secondary: 'bg-purple-50 text-ep-secondary border border-purple-200/60',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
  danger: 'bg-red-50 text-red-700 border border-red-200/60',
  info: 'bg-sky-50 text-sky-700 border border-sky-200/60',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200/60',
  navy: 'bg-slate-900 text-slate-100',
};

const dotClasses = {
  primary: 'bg-ep-primary',
  secondary: 'bg-ep-secondary',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-sky-500',
  neutral: 'bg-slate-400',
  navy: 'bg-white',
};

const tailleClasses = {
  xs: 'px-2 py-0.5 text-[10px]',
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm font-semibold',
};
</script>
