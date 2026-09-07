<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="block text-xs font-semibold text-ep-text uppercase tracking-wider">
      {{ label }}
      <span v-if="required" class="text-ep-danger ml-0.5">*</span>
    </label>

    <div class="relative rounded-lg shadow-ep-subtle">
      <div v-if="iconLeft" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ep-muted">
        <span class="material-symbols-outlined text-lg">{{ iconLeft }}</span>
      </div>

      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full bg-white border rounded-lg py-2 pr-10 text-sm text-ep-text appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-ep-primary/20 focus:border-ep-primary disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer',
          error ? 'border-ep-danger focus:ring-red-200 focus:border-ep-danger' : 'border-ep-border',
          iconLeft ? 'pl-10' : 'pl-3.5',
        ]"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <slot />
      </select>

      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-ep-muted">
        <span class="material-symbols-outlined text-lg">unfold_more</span>
      </div>
    </div>

    <p v-if="error" class="text-xs text-ep-danger flex items-center gap-1 mt-1">
      <span class="material-symbols-outlined text-xs">error</span>
      <span>{{ error }}</span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => 'ep-select-' + Math.random().toString(36).substring(2, 9),
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  iconLeft: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>
