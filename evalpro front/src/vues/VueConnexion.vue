<template>
  <!--
    VueConnexion.vue - Page de connexion officielle EvalPro
    Authentification réelle par email et mot de passe avec masquage/affichage interactif du mot de passe.
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
              Saisissez vos identifiants autorisés pour accéder à la plateforme
            </p>
          </div>

          <!-- Formulaire de Connexion Réel -->
          <form @submit.prevent="connexionCompte" class="space-y-4">
            <EpInput
              v-model="emailForm"
              type="email"
              label="Adresse Email Professionnelle"
              required
              placeholder="adresse@entreprise.com"
              iconLeft="mail"
              :error="erreurChamps.email"
            />

            <EpInput
              v-model="motDePasse"
              :type="afficherMotDePasse ? 'text' : 'password'"
              label="Mot de Passe"
              required
              placeholder="••••••••"
              iconLeft="key"
              :iconRight="afficherMotDePasse ? 'visibility_off' : 'visibility'"
              :hasRightIconClick="true"
              @click-icon-right="afficherMotDePasse = !afficherMotDePasse"
              :error="erreurChamps.motDePasse"
            />

            <div class="flex items-center justify-between text-xs pt-1">
              <label class="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" v-model="seSouvenirDeMoi" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span>Se souvenir de moi</span>
              </label>

              <a href="#" @click.prevent="motDePasseOublie" class="text-blue-600 hover:underline font-semibold">
                Mot de passe oublié ?
              </a>
            </div>

            <EpButton
              type="submit"
              variant="primary"
              size="md"
              iconRight="login"
              fullWidth
              :disabled="chargement"
              class="font-semibold py-2.5 mt-2"
            >
              {{ chargement ? 'Vérification...' : 'Se Connecter' }}
            </EpButton>
          </form>

          <!-- Lien spécifique candidat -->
          <div class="pt-4 border-t border-slate-100 text-center space-y-1.5">
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
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../magasins/authentification.store';
import { useMagasinNotification } from '../magasins/notification.store';
import EpButton from '../composants/systeme/EpButton.vue';
import EpInput from '../composants/systeme/EpInput.vue';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();
const magasinNotif = useMagasinNotification();

// Champs vides par défaut pour un vrai comportement de connexion
const emailForm = ref('');
const motDePasse = ref('');
const seSouvenirDeMoi = ref(true);
const afficherMotDePasse = ref(false);
const chargement = ref(false);

const erreurChamps = reactive({
  email: '',
  motDePasse: '',
});

function connexionCompte() {
  erreurChamps.email = '';
  erreurChamps.motDePasse = '';

  if (!emailForm.value) {
    erreurChamps.email = 'Veuillez saisir votre adresse email.';
    return;
  }
  if (!motDePasse.value) {
    erreurChamps.motDePasse = 'Veuillez saisir votre mot de passe.';
    return;
  }

  chargement.value = true;

  setTimeout(() => {
    const resultat = magasinAuth.connexionSecuriseeB2B(emailForm.value, motDePasse.value);
    chargement.value = false;
    
    if (resultat.success) {
      if (resultat.role === 'superadmin') router.push('/tableau-de-bord/superadmin');
      else if (resultat.role === 'companyadmin') router.push('/tableau-de-bord/entreprise');
      else if (resultat.role === 'candidate') router.push('/tableau-de-bord/candidat');
      else router.push('/tableau-de-bord/consultant');
    }
  }, 300);
}

function motDePasseOublie() {
  magasinNotif.ajouterNotification({
    type: 'info',
    titre: 'Réinitialisation du Mot de Passe',
    message: 'Pour réinitialiser votre mot de passe, veuillez contacter l\'administrateur de votre entreprise ou le support EvalPro.'
  });
}
</script>
