<template>
  <div class="py-12 px-6 text-center flex flex-col items-center justify-center space-y-3">
    <div class="w-10 h-10 border-4 border-ep-primary/20 border-t-ep-primary rounded-full animate-spin"></div>
    <span class="text-xs font-semibold text-ep-muted tracking-wide">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Chargement en cours...',
  },
});
</script>
