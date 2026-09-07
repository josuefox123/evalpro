<template>
  <!--
    VueConnexion.vue - Page de connexion professionnelle EvalPro
    Authentification basée sur les identifiants utilisateur avec détection automatique du rôle
  -->
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">

    <!-- Header minimal -->
    <header class="bg-white border-b border-slate-200 h-16 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      <router-link to="/" class="flex items-center group">
        <img src="/logo.png" alt="EvalPro" class="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
      </router-link>

      <router-link to="/" class="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold">
        <span class="material-symbols-outlined text-base">arrow_back</span>
        <span>Retour à l'accueil</span>
      </router-link>
    </header>

    <!-- Zone centrale de connexion -->
    <div class="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div class="w-full max-w-md">

        <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">

          <!-- En-tête de la carte -->
          <div class="text-center space-y-2">
            <img src="/logo.png" alt="EvalPro" class="h-16 sm:h-20 w-auto mx-auto object-contain mb-2 drop-shadow-xs" />
            <h1 class="text-xl sm:text-2xl font-bold text-slate-900 font-titre">Connexion à votre Espace</h1>
            <p class="text-xs sm:text-sm text-slate-500">
              Renseignez vos identifiants pour accéder à votre tableau de bord
            </p>
          </div>

          <!-- Formulaire de Connexion Standard par Identifiants -->
          <form @submit.prevent="connexionCompte" class="space-y-4">
            <EpInput
              v-model="emailForm"
              type="email"
              label="Adresse Email Professionnelle"
              required
              placeholder="adresse@entreprise.com"
              iconLeft="mail"
            />

            <EpInput
              v-model="motDePasse"
              type="password"
              label="Mot de Passe"
              required
              placeholder="••••••••"
              iconLeft="key"
            />

            <EpButton type="submit" variant="primary" size="md" iconRight="login" fullWidth class="font-semibold py-2.5">
              Se Connecter
            </EpButton>
          </form>

          <!-- Raccourcis de test rapides pour la démonstration -->
          <div class="pt-4 border-t border-slate-100 space-y-2.5">
            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
              Raccourcis de démonstration
            </div>

            <div class="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                @click="remplirIdentifiants('companyadmin')"
                class="px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-700 font-medium truncate transition-colors text-center"
                title="Administrateur Entreprise"
              >
                Admin RH
              </button>

              <button
                type="button"
                @click="remplirIdentifiants('superadmin')"
                class="px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-slate-700 font-medium truncate transition-colors text-center"
                title="Super Administrateur HQ"
              >
                SuperAdmin
              </button>

              <button
                type="button"
                @click="remplirIdentifiants('consultant')"
                class="px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 text-slate-700 font-medium truncate transition-colors text-center"
                title="Consultant Évaluateur"
              >
                Consultant
              </button>
            </div>
          </div>

          <!-- Lien spécifique candidat -->
          <div class="pt-3 border-t border-slate-100 text-center space-y-1.5">
            <p class="text-[11px] text-slate-500">
              Vous êtes candidat et participez à une épreuve ?
            </p>
            <router-link
              to="/acces-candidat"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span class="material-symbols-outlined text-sm">badge</span>
              <span>Accéder avec mon Code Candidat</span>
            </router-link>
          </div>

        </div>

      </div>
    </div>

    <!-- Footer minimal -->
    <footer class="py-4 text-center text-[11px] text-slate-400 border-t border-slate-200 bg-white">
      EvalPro © {{ new Date().getFullYear() }} — Tous droits réservés
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../magasins/authentification.store';
import EpButton from '../composants/systeme/EpButton.vue';
import EpInput from '../composants/systeme/EpInput.vue';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();

// Identifiants par défaut (Admin RH)
const emailForm  = ref('s.hadjab@techcorp.dz');
const motDePasse = ref('AdminTech2025!');

const identifiantsProfils = {
  companyadmin: { email: 's.hadjab@techcorp.dz', mdp: 'AdminTech2025!' },
  superadmin: { email: 'kamel.meziane@evalpro.dz', mdp: 'SuperAdmin2025!' },
  consultant: { email: 'k.benali@evalpro.dz', mdp: 'Consultant2025!' },
};

function remplirIdentifiants(codeRole) {
  const compte = identifiantsProfils[codeRole];
  if (compte) {
    emailForm.value = compte.email;
    motDePasse.value = compte.mdp;
  }
}

function connexionCompte() {
  const resultat = magasinAuth.connexionSecuriseeB2B(emailForm.value, motDePasse.value);
  
  if (resultat.success) {
    if (resultat.role === 'superadmin') router.push('/tableau-de-bord/superadmin');
    else if (resultat.role === 'companyadmin') router.push('/tableau-de-bord/entreprise');
    else if (resultat.role === 'candidate') router.push('/tableau-de-bord/candidat');
    else router.push('/tableau-de-bord/consultant');
  }
}
</script>
