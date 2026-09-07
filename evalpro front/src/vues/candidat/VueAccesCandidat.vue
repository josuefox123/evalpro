<template>
  <!--
    VueAccesCandidat.vue - Page d'accès candidat épurée et 100% libre de saisie
  -->
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
    <div class="w-full max-w-md my-auto">

      <!-- Carte Principale d'Accès Candidat -->
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">

        <!-- En-tête avec Logo & Badge -->
        <div class="text-center space-y-3">
          <router-link to="/" class="inline-block group mb-1">
            <img src="/logo.png" alt="EvalPro" class="h-14 sm:h-18 w-auto mx-auto object-contain transition-transform group-hover:scale-105" />
          </router-link>

          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto shadow-xs">
            <span class="material-symbols-outlined text-2xl">badge</span>
          </div>

          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 font-titre">Accès Épreuve Candidat</h1>
          <p class="text-xs sm:text-sm text-slate-500">
            Saisissez le code d'invitation unique transmis par votre recruteur
          </p>
        </div>

        <!-- Formulaire Code d'Invitation Libre -->
        <form @submit.prevent="validerCodeCandidat" class="space-y-4">
          <EpInput
            v-model="codeInvitation"
            label="Code d'Invitation Unique"
            required
            placeholder="ex: EVAL-2025-8942"
            iconLeft="key"
            hint="Format habituel : EVAL-XXXX-XXXX"
            :error="erreurCode"
          />

          <EpButton
            type="submit"
            variant="primary"
            size="md"
            iconRight="arrow_forward"
            fullWidth
            :disabled="chargement"
            class="font-semibold py-2.5 mt-2"
          >
            {{ chargement ? 'Vérification en cours...' : 'Accéder à l\'Épreuve' }}
          </EpButton>
        </form>

        <!-- Redirection Recruteur / Entreprise -->
        <div class="pt-4 border-t border-slate-100 text-center space-y-1.5">
          <p class="text-[11px] text-slate-500">
            Vous êtes un recruteur ou un administrateur ?
          </p>
          <router-link
            to="/connexion"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span class="material-symbols-outlined text-sm">domain</span>
            <span>Connexion Espace Entreprise</span>
          </router-link>
        </div>

      </div>

      <!-- Copyright discret bas de page -->
      <div class="mt-6 text-center text-xs text-slate-400">
        © {{ currentYear }} EvalPro — Évaluation & Recrutement Sécurisé
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import EpButton from '../../composants/systeme/EpButton.vue';
import EpInput from '../../composants/systeme/EpInput.vue';

const router = useRouter();
const route = useRoute();
const magasinAuth = useMagasinAuthentification();

const currentYear = computed(() => new Date().getFullYear());

// Champ vide par défaut pour une vraie saisie candidat libre
const codeInvitation = ref('');
const erreurCode = ref('');
const chargement = ref(false);

// Pré-remplissage uniquement si le code est transmis dans l'URL (?code=EVAL-XXXX-XXXX)
onMounted(() => {
  if (route.query.code) {
    codeInvitation.value = String(route.query.code).trim();
  }
});

function validerCodeCandidat() {
  erreurCode.value = '';

  if (!codeInvitation.value || !codeInvitation.value.trim()) {
    erreurCode.value = 'Veuillez saisir votre code d\'invitation candidat.';
    return;
  }

  chargement.value = true;

  setTimeout(() => {
    const resultat = magasinAuth.connexionSecuriseeCandidat(codeInvitation.value);
    chargement.value = false;

    if (resultat.success) {
      router.push('/candidat/verification');
    } else {
      erreurCode.value = 'Code d\'invitation invalide ou expiré. Vérifiez la saisie.';
    }
  }, 300);
}
</script>
