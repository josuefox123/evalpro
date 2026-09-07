<template>
  <!--
    VueConnexion.vue - Page de connexion B2B EvalPro (Entreprises & Administrateurs)
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

    <!-- Zone centrale de connexion -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-md">

        <div class="bg-white border border-ep-border rounded-2xl p-8 shadow-ep-lg space-y-6">

          <div class="text-center space-y-2">
            <img src="/logo.png" alt="EvalPro" class="h-20 w-auto mx-auto object-contain mb-3 drop-shadow-sm" />
            <h1 class="text-xl font-extrabold text-ep-text font-titre">Connexion Espace Entreprise</h1>
            <p class="text-xs text-ep-muted">
              Plateforme de recrutement et d'évaluation en ligne
            </p>
          </div>

          <!-- Formulaire Compte B2B -->
          <form @submit.prevent="connexionCompte" class="space-y-4">
            <EpSelect v-model="roleChoisi" label="Sélectionner un Rôle (Démonstration)" @change="mettreAJourIdentifiants">
              <option value="companyadmin">Administrateur Entreprise (TechCorp Algérie)</option>
              <option value="superadmin">Super Administrateur (EvalPro HQ)</option>
              <option value="consultant">Consultant / Évaluateur (Cabinet Expert RH)</option>
            </EpSelect>

            <EpInput v-model="emailForm" type="email" label="Adresse Email Professionnelle" required placeholder="adresse@entreprise.com" iconLeft="mail" />
            <EpInput v-model="motDePasse" type="password" label="Mot de Passe" required iconLeft="key" />

            <EpButton type="submit" variant="primary" size="md" iconRight="login" fullWidth>
              Se Connecter au Dashboard
            </EpButton>
          </form>

          <!-- Liens spécifiques candidat -->
          <div class="pt-4 border-t border-ep-border text-center space-y-2">
            <p class="text-[11px] text-ep-muted">
              Vous êtes candidat et avez reçu une invitation ?
            </p>
            <router-link
              to="/acces-candidat"
              class="inline-flex items-center gap-1 text-xs font-semibold text-ep-primary hover:underline"
            >
              <span class="material-symbols-outlined text-sm">badge</span>
              <span>Saisir mon Code d'Invitation Candidat</span>
            </router-link>
          </div>

        </div>

      </div>
    </div>

    <!-- Footer minimal -->
    <footer class="py-4 text-center text-[11px] text-ep-muted border-t border-ep-border bg-white">
      EvalPro © 2025 — Tous droits réservés
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../magasins/authentification.store';
import EpButton from '../composants/systeme/EpButton.vue';
import EpInput from '../composants/systeme/EpInput.vue';
import EpSelect from '../composants/systeme/EpSelect.vue';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();

const roleChoisi = ref('companyadmin');
const emailForm  = ref('s.hadjab@techcorp.dz');
const motDePasse = ref('AdminTech2025!');

const identifiantsParDefaut = {
  companyadmin: { email: 's.hadjab@techcorp.dz', mdp: 'AdminTech2025!' },
  superadmin: { email: 'kamel.meziane@evalpro.dz', mdp: 'SuperAdmin2025!' },
  consultant: { email: 'k.benali@evalpro.dz', mdp: 'Consultant2025!' },
};

function mettreAJourIdentifiants() {
  const def = identifiantsParDefaut[roleChoisi.value];
  if (def) {
    emailForm.value = def.email;
    motDePasse.value = def.mdp;
  }
}

function connexionCompte() {
  const resultat = magasinAuth.connexionSecuriseeB2B(emailForm.value, motDePasse.value);
  
  if (resultat.success) {
    if (resultat.role === 'superadmin') router.push('/tableau-de-bord/superadmin');
    else if (resultat.role === 'companyadmin') router.push('/tableau-de-bord/entreprise');
    else router.push('/tableau-de-bord/consultant');
  }
}
</script>
