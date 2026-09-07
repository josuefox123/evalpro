<template>
  <div
    :class="[
      'p-4 rounded-xl border flex items-start gap-3 text-xs transition-all',
      styleVariantes[variant] || styleVariantes.info
    ]"
  >
    <div :class="['w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-white font-bold', iconBgVariantes[variant]]">
      <span class="material-symbols-outlined text-sm">{{ icones[variant] || 'info' }}</span>
    </div>

    <div class="flex-1 space-y-0.5">
      <h4 v-if="title" class="font-bold text-ep-text text-xs leading-tight">{{ title }}</h4>
      <div class="text-slate-600 leading-relaxed">
        <slot />
      </div>
    </div>

    <button v-if="dismissible" @click="$emit('dismiss')" class="text-slate-400 hover:text-slate-600 p-0.5">
      <span class="material-symbols-outlined text-base">close</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'info', // 'success' | 'warning' | 'error' | 'info'
  },
  title: {
    type: String,
    default: '',
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['dismiss']);

const icones = {
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const styleVariantes = {
  success: 'bg-emerald-50/70 border-emerald-200 text-emerald-900',
  warning: 'bg-amber-50/70 border-amber-200 text-amber-900',
  error: 'bg-rose-50/70 border-rose-200 text-rose-900',
  info: 'bg-blue-50/70 border-blue-200 text-blue-900',
};

const iconBgVariantes = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
  info: 'bg-ep-primary',
};
</script>
