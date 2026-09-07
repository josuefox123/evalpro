<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <TransitionGroup name="toast">
        <div
          v-for="notif in magasinNotif.notifications"
          :key="notif.id"
          :class="[
            'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-ep-lg bg-white transition-all overflow-hidden',
            styleVariantes[notif.type] || styleVariantes.info
          ]"
        >
          <!-- Icône du toast -->
          <div :class="['w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold', iconBgVariantes[notif.type]]">
            <span class="material-symbols-outlined text-base">{{ icones[notif.type] || 'info' }}</span>
          </div>

          <!-- Message & Titre -->
          <div class="flex-1 space-y-0.5 text-xs">
            <h4 class="font-bold text-ep-text text-sm leading-tight">{{ notif.titre }}</h4>
            <p class="text-ep-muted leading-relaxed">{{ notif.message }}</p>
          </div>

          <!-- Bouton fermer -->
          <button
            @click="magasinNotif.supprimerNotification(notif.id)"
            class="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
          >
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useMagasinNotification } from '../../magasins/notification.store';

const magasinNotif = useMagasinNotification();

const icones = {
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const styleVariantes = {
  success: 'border-emerald-200/80 shadow-emerald-500/5',
  warning: 'border-amber-200/80 shadow-amber-500/5',
  error: 'border-rose-200/80 shadow-rose-500/5',
  info: 'border-blue-200/80 shadow-blue-500/5',
};

const iconBgVariantes = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
  info: 'bg-ep-primary',
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
</style>
