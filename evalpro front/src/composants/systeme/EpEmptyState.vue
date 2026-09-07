<template>
  <div class="py-12 px-6 text-center bg-white border border-dashed border-ep-border rounded-xl flex flex-col items-center justify-center">
    <div class="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-ep-muted mb-4">
      <span class="material-symbols-outlined text-3xl">{{ icon }}</span>
    </div>

    <h3 class="text-base font-bold text-ep-text">{{ title }}</h3>
    <p v-if="description" class="text-xs text-ep-muted max-w-sm mt-1 mb-6 leading-relaxed">{{ description }}</p>

    <div v-if="$slots.action" class="mt-2">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'inbox',
  },
});
</script>
