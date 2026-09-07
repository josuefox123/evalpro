<template>
  <!--
    SelecteurRole.vue - Barre de démonstration EvalPro (Optionnelle)
    Permet de basculer facilement entre les 4 rôles lors des tests.
    Peut être masquée d'un clic grâce au bouton de réduction.
  -->
  <div v-if="afficheBarre" class="bg-slate-900 text-slate-300 border-b border-slate-800 px-4 py-1.5 text-xs z-50 relative transition-all">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-2">

      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-sm text-ep-primary">smart_button</span>
        <span class="font-semibold text-xs text-white hidden sm:inline">Rôles de démo :</span>
      </div>

      <div class="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <button
          v-for="(infoRole, codeRole) in roles"
          :key="codeRole"
          @click="changerRole(codeRole)"
          :class="[
            'px-2.5 py-0.5 rounded flex items-center gap-1.5 transition-all text-xs font-medium cursor-pointer border',
            magasinAuth.roleActif === codeRole
              ? 'bg-ep-primary text-white font-semibold border-ep-primary shadow-ep-subtle'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
          ]"
          :title="infoRole.description"
        >
          <span class="material-symbols-outlined text-xs">{{ infoRole.icone }}</span>
          <span class="hidden md:inline">{{ infoRole.libelle }}</span>
        </button>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden lg:flex items-center gap-1.5 text-slate-400 text-xs">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span><strong class="text-white">{{ magasinAuth.utilisateurConnecte.nom }}</strong></span>
        </div>

        <button @click="afficheBarre = false" class="text-slate-400 hover:text-white transition-colors p-0.5" title="Masquer le sélecteur">
          <span class="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import { ROLES_UTILISATEURS } from '../../donnees/donneesInitiales';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();
const roles = computed(() => ROLES_UTILISATEURS);
const afficheBarre = ref(true);

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
