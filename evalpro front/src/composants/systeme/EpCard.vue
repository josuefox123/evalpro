<template>
  <div
    :class="[
      'bg-white border border-ep-border rounded-xl transition-all duration-150',
      hover ? 'hover:border-slate-300 hover:shadow-ep-md' : 'shadow-ep-card',
      paddingClasses[padding] || paddingClasses.md,
    ]"
  >
    <div v-if="$slots.header || title" class="pb-4 mb-4 border-b border-ep-border flex items-center justify-between">
      <div>
        <h3 v-if="title" class="text-base font-bold text-ep-text flex items-center gap-2">
          <span v-if="icon" class="material-symbols-outlined text-ep-primary">{{ icon }}</span>
          <span>{{ title }}</span>
        </h3>
        <p v-if="subtitle" class="text-xs text-ep-muted mt-0.5">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <slot />

    <div v-if="$slots.footer" class="pt-4 mt-4 border-t border-ep-border">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  hover: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: String,
    default: 'md', // 'none' | 'sm' | 'md' | 'lg'
  },
});

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};
</script>
