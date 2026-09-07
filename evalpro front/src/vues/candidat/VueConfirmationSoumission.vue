<template>
  <!--
    VueConfirmationSoumission.vue - Page de confirmation de soumission épreuve pour le candidat
  -->
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">

    <!-- Header minimal -->
    <header class="bg-white border-b border-ep-border h-16 px-6 flex items-center justify-between shadow-ep-subtle">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="EvalPro" class="h-12 w-auto object-contain" />
        <span class="text-xs font-semibold text-ep-primary bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
          Session Candidat Clôturée
        </span>
      </div>

      <button
        @click="deconnecter"
        class="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
      >
        <span class="material-symbols-outlined text-base">logout</span>
        <span>Déconnexion</span>
      </button>
    </header>

    <!-- Zone centrale de confirmation -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-lg">

        <div class="bg-white border border-ep-border rounded-2xl p-8 shadow-ep-lg text-center space-y-6">

          <!-- Icône Succès Animée -->
          <div class="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-ep-subtle animate-bounce">
            <span class="material-symbols-outlined text-5xl">task_alt</span>
          </div>

          <div class="space-y-2">
            <h1 class="text-2xl font-extrabold text-ep-text font-titre">Copie Soumise avec Succès !</h1>
            <p class="text-xs text-ep-muted max-w-md mx-auto leading-relaxed">
              Votre composition a été enregistrée et transmise à l'équipe de recrutement. Les résultats vous seront communiqués directement par l'entreprise.
            </p>
          </div>

          <!-- Récapitulatif de la session -->
          <div class="bg-slate-50 border border-ep-border rounded-xl p-4 text-left text-xs space-y-2.5">
            <div class="flex justify-between border-b border-ep-border pb-2">
              <span class="text-ep-muted">Candidat :</span>
              <span class="font-bold text-ep-text">{{ magasinAuth.utilisateurConnecte.nom }}</span>
            </div>
            <div class="flex justify-between border-b border-ep-border pb-2">
              <span class="text-ep-muted">Épreuve :</span>
              <span class="font-bold text-ep-primary">Développeur Full-Stack Senior</span>
            </div>
            <div class="flex justify-between border-b border-ep-border pb-2">
              <span class="text-ep-muted">Horodatage de soumission :</span>
              <span class="font-mono text-slate-700">{{ dateFormatee }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ep-muted">Statut de la copie :</span>
              <span class="font-bold text-emerald-600 flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">verified</span>
                <span>En attente de correction</span>
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <EpButton
              variant="outline"
              size="md"
              iconLeft="home"
              fullWidth
              class="sm:w-auto"
              @click="$router.push('/tableau-de-bord/candidat')"
            >
              Mon Espace Candidat
            </EpButton>

            <EpButton
              variant="primary"
              size="md"
              iconLeft="logout"
              fullWidth
              class="sm:w-auto"
              @click="deconnecter"
            >
              Quitter la Session
            </EpButton>
          </div>

        </div>

      </div>
    </div>

    <!-- Footer minimal -->
    <footer class="py-4 text-center text-[11px] text-ep-muted border-t border-ep-border bg-white">
      EvalPro B2B SaaS © 2025 — Évaluation & Recrutement Sécurisé
    </footer>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import EpButton from '../../composants/systeme/EpButton.vue';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();

const dateFormatee = computed(() => {
  const maintenant = new Date();
  return maintenant.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
});

function deconnecter() {
  magasinAuth.deconnexion();
  router.push('/connexion');
}
</script>
