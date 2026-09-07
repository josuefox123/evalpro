<template>
  <!--
    VueAccesCandidat.vue - Page d'accès dédiée au candidat avec son Code d'Invitation
  -->
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">

    <!-- Header minimal -->
    <header class="bg-white border-b border-ep-border h-16 px-6 flex items-center justify-between shadow-ep-subtle">
      <router-link to="/" class="flex items-center group">
        <img src="/logo.png" alt="EvalPro" class="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
      </router-link>

      <router-link to="/" class="text-xs text-ep-muted hover:text-ep-text transition-colors flex items-center gap-1 font-semibold">
        <span class="material-symbols-outlined text-base">arrow_back</span>
        <span>Retour au site</span>
      </router-link>
    </header>

    <!-- Zone centrale d'accès candidat -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-md">

        <div class="bg-white border border-ep-border rounded-2xl p-8 shadow-ep-lg space-y-6">

          <!-- En-tête de la carte -->
          <div class="text-center space-y-2">
            <div class="w-14 h-14 rounded-2xl bg-blue-50 text-ep-primary border border-blue-100 flex items-center justify-center mx-auto shadow-ep-subtle">
              <span class="material-symbols-outlined text-3xl">badge</span>
            </div>
            <h1 class="text-xl font-extrabold text-ep-text font-titre">Espace Épreuve Candidat</h1>
            <p class="text-xs text-ep-muted">
              Saisissez le code d'invitation unique transmis par votre recruteur
            </p>
          </div>

          <!-- Formulaire Code d'Invitation -->
          <form @submit.prevent="validerCodeCandidat" class="space-y-4">
            <EpInput
              v-model="codeInvitation"
              label="Code d'Invitation Unique"
              required
              placeholder="ex: EVAL-2025-8942"
              iconLeft="key"
              hint="Format habituel : EVAL-AAAA-XXXX"
            />

            <EpButton type="submit" variant="primary" size="md" iconRight="arrow_forward" fullWidth>
              Accéder à l'Épreuve
            </EpButton>
          </form>

          <!-- Liens d'aide et navigation -->
          <div class="pt-4 border-t border-ep-border text-center space-y-2">
            <p class="text-[11px] text-ep-muted">
              Vous êtes un recruteur ou un administrateur ?
            </p>
            <router-link
              to="/connexion"
              class="inline-flex items-center gap-1 text-xs font-semibold text-ep-primary hover:underline"
            >
              <span class="material-symbols-outlined text-sm">domain</span>
              <span>Connexion Espace Entreprise & B2B</span>
            </router-link>
          </div>

        </div>

      </div>
    </div>

    <!-- Footer minimal -->
    <footer class="py-4 text-center text-[11px] text-ep-muted border-t border-ep-border bg-white">
      EvalPro SaaS B2B © 2025 — Évaluation & Recrutement Sécurisé
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import EpButton from '../../composants/systeme/EpButton.vue';
import EpInput from '../../composants/systeme/EpInput.vue';

const router = useRouter();
const route = useRoute();
const magasinAuth = useMagasinAuthentification();

const codeInvitation = ref('EVAL-2025-8942');

// Pré-remplissage automatique si le code est passé dans l'URL (?code=EVAL-2025-8942)
onMounted(() => {
  if (route.query.code) {
    codeInvitation.value = String(route.query.code).trim();
  }
});

function validerCodeCandidat() {
  const resultat = magasinAuth.connexionSecuriseeCandidat(codeInvitation.value);
  if (resultat.success) {
    router.push('/candidat/verification');
  }
}
</script>
