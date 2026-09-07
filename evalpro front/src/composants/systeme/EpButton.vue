<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
      varianteClasses[variant] || varianteClasses.primary,
      tailleClasses[size] || tailleClasses.md,
      fullWidth ? 'w-full' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="material-symbols-outlined animate-spin text-base mr-2">progress_activity</span>
    <span v-else-if="iconLeft" class="material-symbols-outlined text-lg mr-2">{{ iconLeft }}</span>

    <slot />

    <span v-if="!loading && iconRight" class="material-symbols-outlined text-lg ml-2">{{ iconRight }}</span>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success'
  },
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg'
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  iconLeft: {
    type: String,
    default: '',
  },
  iconRight: {
    type: String,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);

const varianteClasses = {
  primary: 'bg-ep-primary text-white hover:bg-ep-primary-dark shadow-ep-subtle active:scale-[0.98]',
  secondary: 'bg-slate-100 text-ep-text hover:bg-slate-200 active:scale-[0.98]',
  outline: 'bg-white text-ep-text border border-ep-border hover:bg-slate-50 hover:border-slate-300 shadow-ep-subtle active:scale-[0.98]',
  danger: 'bg-ep-danger text-white hover:bg-red-600 shadow-ep-subtle active:scale-[0.98]',
  ghost: 'bg-transparent text-ep-muted hover:text-ep-text hover:bg-slate-100',
  success: 'bg-ep-success text-white hover:bg-emerald-600 shadow-ep-subtle active:scale-[0.98]',
};

const tailleClasses = {
  sm: 'px-3 py-1.5 text-xs rounded-md gap-1',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-base rounded-xl gap-2 font-semibold',
};
</script>
