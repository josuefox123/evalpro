<template>
  <!-- 
    Composant de sélecteur dynamique de rôle pour la démonstration d'EvalPro.
    Permet aux évaluateurs et développeurs de tester instantanément l'application
    selon les 4 profils utilisateurs exigés dans le cahier des charges.
  -->
  <div class="bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center space-x-2 text-slate-400">
        <span class="material-symbols-outlined text-sm text-indigo-400">touch_app</span>
        <span class="font-medium text-slate-300">Sélecteur Rapide de Rôle (Démonstration) :</span>
      </div>

      <div class="flex items-center space-x-1.5 overflow-x-auto py-1">
        <button
          v-for="(infoRole, codeRole) in roles"
          :key="codeRole"
          @click="changerRole(codeRole)"
          :class="[
            'px-3 py-1 rounded-full flex items-center space-x-1.5 transition-all text-xs font-medium cursor-pointer',
            magasinAuth.roleActif === codeRole
              ? `${infoRole.couleur} text-white shadow-md shadow-indigo-900/30 font-semibold ring-2 ring-white/20`
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          ]"
          :title="infoRole.description"
        >
          <span class="material-symbols-outlined text-xs">{{ infoRole.icone }}</span>
          <span>{{ infoRole.libelle }}</span>
        </button>
      </div>

      <div class="hidden lg:flex items-center space-x-2 text-slate-400 text-xs">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Session active : <strong class="text-slate-200">{{ magasinAuth.utilisateurConnecte.nom }}</strong></span>
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

/**
 * Basculer le rôle actif et diriger l'utilisateur vers son tableau de bord correspondant
 * @param {string} codeRole 
 */
function changerRole(codeRole) {
  magasinAuth.definirRoleActif(codeRole);
  
  // Redirection automatique vers le tableau de bord spécifique au rôle
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
