<template>
  <Teleport to="body">
    <Transition name="tiroir">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-hidden">
        <!-- Arrière plan semi-transparent -->
        <div class="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity" @click="$emit('update:modelValue', false)"></div>

        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div :class="['w-screen bg-white shadow-ep-lg border-l border-ep-border flex flex-col', widthClasses[width] || widthClasses.md]">

            <!-- Header du Drawer -->
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

            <!-- Contenu principal du Drawer -->
            <div class="flex-1 p-6 overflow-y-auto">
              <slot />
            </div>

            <!-- Footer optionnel -->
            <div v-if="$slots.footer" class="px-6 py-4 border-t border-ep-border bg-slate-50/50 flex items-center justify-end gap-3">
              <slot name="footer" />
            </div>

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
  width: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg' | 'xl'
  },
});

defineEmits(['update:modelValue']);

const widthClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-xl',
  xl: 'max-w-2xl',
};
</script>

<style scoped>
.tiroir-enter-active,
.tiroir-leave-active {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}

.tiroir-enter-from,
.tiroir-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
