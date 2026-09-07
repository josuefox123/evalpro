<template>
  <Teleport to="body">
    <Transition name="fondu-modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <!-- Overlay arrière-plan -->
        <div class="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity" @click="$emit('update:modelValue', false)"></div>

        <!-- Fenêtre modale -->
        <div
          :class="[
            'relative bg-white border border-ep-border rounded-2xl shadow-ep-lg w-full z-10 my-8 overflow-hidden transform transition-all',
            tailleClasses[size] || tailleClasses.md,
          ]"
        >
          <!-- En-tête -->
          <div class="px-6 py-4 border-b border-ep-border flex items-center justify-between bg-slate-50/50">
            <h3 class="text-base font-bold text-ep-text flex items-center gap-2">
              <span v-if="icon" class="material-symbols-outlined text-ep-primary">{{ icon }}</span>
              <span>{{ title }}</span>
            </h3>
            <button
              class="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors cursor-pointer"
              @click="$emit('update:modelValue', false)"
            >
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <!-- Corps -->
          <div class="p-6 max-h-[75vh] overflow-y-auto">
            <slot />
          </div>

          <!-- Pied de page -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-ep-border bg-slate-50/50 flex items-center justify-end gap-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg' | 'xl'
  },
});

defineEmits(['update:modelValue']);

const tailleClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};
</script>

<style scoped>
.fondu-modal-enter-active,
.fondu-modal-leave-active {
  transition: opacity 0.2s ease;
}

.fondu-modal-enter-from,
.fondu-modal-leave-to {
  opacity: 0;
}
</style>
