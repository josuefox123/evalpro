<template>
  <!--
    SelecteurRole.vue - Barre de démonstration EvalPro (Figma Dev Mode)
    Bandeau clair en haut de l'interface permettant de basculer entre les 4 rôles.
    Utile pour les testeurs et démonstrateurs de la maquette.
    Masqué en production via une variable d'environnement.
  -->
  <div class="bg-bleu-50 border-b border-bleu-100 px-4 py-2 text-xs">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">

      <!-- Libellé de la barre de demo -->
      <div class="flex items-center space-x-2 text-bleu-700">
        <span class="material-symbols-outlined text-sm text-bleu-600">touch_app</span>
        <span class="font-semibold">Demonstration Roles (Maquette Figma) :</span>
      </div>

      <!-- Boutons de sélection des rôles -->
      <div class="flex items-center space-x-1.5 overflow-x-auto py-1">
        <button
          v-for="(infoRole, codeRole) in roles"
          :key="codeRole"
          @click="changerRole(codeRole)"
          :class="[
            'px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all text-xs font-medium cursor-pointer border',
            magasinAuth.roleActif === codeRole
              ? `${infoRole.couleur} text-white shadow-sm font-semibold border-transparent`
              : 'bg-white text-texte-secondaire border-bordure hover:border-bleu-300 hover:text-bleu-600'
          ]"
          :title="infoRole.description"
        >
          <span class="material-symbols-outlined text-xs">{{ infoRole.icone }}</span>
          <span>{{ infoRole.libelle }}</span>
        </button>
      </div>

      <!-- Indicateur de session active -->
      <div class="hidden lg:flex items-center space-x-2 text-bleu-600 text-xs">
        <span class="w-2 h-2 rounded-full bg-succes animate-pulse"></span>
        <span>Session active : <strong>{{ magasinAuth.utilisateurConnecte.nom }}</strong></span>
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
 * Change le rôle actif et redirige vers le tableau de bord correspondant.
 * @param {string} codeRole - Code du rôle sélectionné
 */
function changerRole(codeRole) {
  magasinAuth.definirRoleActif(codeRole);
  switch (codeRole) {
    case 'superadmin':   router.push('/tableau-de-bord/superadmin');  break;
    case 'companyadmin': router.push('/tableau-de-bord/entreprise');  break;
    case 'consultant':   router.push('/tableau-de-bord/consultant');  break;
    case 'candidate':    router.push('/tableau-de-bord/candidat');    break;
    default:             router.push('/');
  }
}
</script>
