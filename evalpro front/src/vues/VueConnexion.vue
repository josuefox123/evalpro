<template>
  <!--
    VueConnexion.vue - Page de connexion épurée et 100% dédiée EvalPro
  -->
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
    <div class="w-full max-w-md my-auto">

      <!-- Carte Principale de Connexion -->
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">

        <!-- En-tête avec Logo de la Carte -->
        <div class="text-center space-y-2">
          <router-link to="/" class="inline-block group mb-1">
            <img src="/logo.png" alt="EvalPro" class="h-14 sm:h-18 w-auto mx-auto object-contain transition-transform group-hover:scale-105" />
          </router-link>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 font-titre">Connexion à votre Espace</h1>
          <p class="text-xs sm:text-sm text-slate-500">
            Saisissez vos identifiants pour accéder à votre espace
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
            <label class="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
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

      </div>

      <!-- Copyright discret bas de page -->
      <div class="mt-6 text-center text-xs text-slate-400">
        © {{ currentYear }} EvalPro. Tous droits réservés.
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../magasins/authentification.store';
import { useMagasinNotification } from '../magasins/notification.store';
import EpButton from '../composants/systeme/EpButton.vue';
import EpInput from '../composants/systeme/EpInput.vue';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();
const magasinNotif = useMagasinNotification();

const currentYear = computed(() => new Date().getFullYear());

// Champs vides par défaut pour une saisie 100% réelle
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
