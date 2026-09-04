<template>
  <!-- 
    SelecteurRole.vue (Démonstration Rôle B2B)
    Bandeau discret supérieur de basculement rapide des 4 profils utilisateurs exigés par le CDC.
  -->
  <div class="bg-bleu-900 border-b border-bleu-800 px-6 py-2 text-xs text-white">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center space-x-2 text-bleu-100">
        <span class="material-symbols-outlined text-sm text-bleu-300">touch_app</span>
        <span class="font-medium">Sélecteur de Rôle (Démonstration SaaS) :</span>
      </div>

      <div class="flex items-center space-x-2 overflow-x-auto py-0.5">
        <button
          v-for="(infoRole, codeRole) in roles"
          :key="codeRole"
          @click="changerRole(codeRole)"
          :class="[
            'px-3 py-1 rounded-full flex items-center space-x-1.5 transition-all text-xs font-semibold cursor-pointer',
            magasinAuth.roleActif === codeRole
              ? 'bg-white text-bleu-900 shadow-sm font-bold ring-2 ring-white/30'
              : 'bg-bleu-800/80 text-bleu-100 hover:bg-bleu-700 hover:text-white'
          ]"
          :title="infoRole.description"
        >
          <span class="material-symbols-outlined text-xs">{{ infoRole.icone }}</span>
          <span>{{ infoRole.libelle }}</span>
        </button>
      </div>

      <div class="hidden lg:flex items-center space-x-2 text-bleu-200 text-xs">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Session : <strong class="text-white">{{ magasinAuth.utilisateurConnecte.nom }}</strong></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import { ROLES_UTILISATEURS } from '../../donnees/donneesInitiales';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();
const roles = computed(() => ROLES_UTILISATEURS);

function changerRole(codeRole) {
  magasinAuth.definirRoleActif(codeRole);
  switch (codeRole) {
    case 'superadmin':
      router.push('/tableau-de-bord/superadmin');
      break;
    case 'companyadmin':
      router.push('/tableau-de-bord/entreprise');
      break;
    case 'consultant':
      router.push('/tableau-de-bord/consultant');
      break;
    case 'candidate':
      router.push('/tableau-de-bord/candidat');
      break;
    default:
      router.push('/');
  }
}
</script>
