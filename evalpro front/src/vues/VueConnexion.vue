<template>
  <!--
    VueConnexion.vue - Page de connexion EvalPro (/connexion ou /login)
    Thème clair : fond gris très clair avec carte blanche centrée.
    Deux modes : connexion compte B2B (email/mot de passe) ou token candidat JWT.
  -->
  <div class="min-h-screen bg-fond-secondaire flex flex-col">

    <!-- Header minimal de connexion -->
    <header class="bg-white border-b border-bordure h-14 px-6 flex items-center">
      <router-link to="/" class="flex items-center space-x-2 group">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-bleu-600 to-bleu-400 flex items-center justify-center text-white font-extrabold text-xs group-hover:scale-105 transition-transform">
          E
        </div>
        <span class="text-sm font-extrabold tracking-tight text-texte-principal font-titre">
          Eval<span class="text-bleu-600">Pro</span>
        </span>
      </router-link>
    </header>

    <!-- Zone centrale avec la carte de connexion -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-md">

        <!-- Carte principale de connexion -->
        <div class="carte p-8 shadow-carte-lg space-y-6">

          <!-- En-tête de la carte -->
          <div class="text-center space-y-2">
            <div class="w-12 h-12 rounded-2xl bg-bleu-600 flex items-center justify-center mx-auto text-white font-extrabold text-xl shadow-md">
              E
            </div>
            <h1 class="text-2xl font-extrabold text-texte-principal font-titre">Connexion à EvalPro</h1>
            <p class="text-xs text-texte-secondaire">
              Accédez à votre espace B2B ou saisissez votre code d'invitation candidat
            </p>
          </div>

          <!-- Onglets de sélection du mode de connexion -->
          <div class="flex rounded-xl bg-fond-secondaire p-1 border border-bordure">
            <button
              id="btn-mode-compte"
              @click="modeSelection = 'compte'"
              :class="[
                'flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer',
                modeSelection === 'compte'
                  ? 'bg-white text-bleu-600 shadow-carte'
                  : 'text-texte-secondaire hover:text-texte-principal'
              ]"
            >
              Administrateur / Evaluateur
            </button>
            <button
              id="btn-mode-candidat"
              @click="modeSelection = 'candidat'"
              :class="[
                'flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer',
                modeSelection === 'candidat'
                  ? 'bg-white text-bleu-600 shadow-carte'
                  : 'text-texte-secondaire hover:text-texte-principal'
              ]"
            >
              Lien Candidat (JWT)
            </button>
          </div>

          <!-- Formulaire : Connexion Compte B2B -->
          <form v-if="modeSelection === 'compte'" @submit.prevent="connexionCompte" class="space-y-4">

            <!-- Sélection du rôle de démo -->
            <div>
              <label class="block text-xs font-semibold text-texte-secondaire uppercase tracking-wider mb-1.5">
                Rôle de Démonstration
              </label>
              <select
                v-model="roleChoisi"
                class="champ-saisie text-sm"
              >
                <option value="companyadmin">Administrateur Entreprise (TechCorp Algérie)</option>
                <option value="superadmin">Super Administrateur (EvalPro HQ)</option>
                <option value="consultant">Consultant / Evaluateur (Dr. Karim Benali)</option>
              </select>
            </div>

            <!-- Champ Email -->
            <div>
              <label class="block text-xs font-semibold text-texte-secondaire uppercase tracking-wider mb-1.5">
                Adresse Email
              </label>
              <input
                type="email"
                required
                v-model="emailForm"
                placeholder="adresse@entreprise.com"
                class="champ-saisie"
              />
            </div>

            <!-- Champ Mot de passe -->
            <div>
              <label class="block text-xs font-semibold text-texte-secondaire uppercase tracking-wider mb-1.5">
                Mot de Passe
              </label>
              <input
                type="password"
                required
                value="••••••••••••"
                class="champ-saisie"
              />
            </div>

            <!-- Bouton de connexion -->
            <button
              id="btn-connexion"
              type="submit"
              class="btn-principal w-full py-3 text-sm mt-2"
            >
              <span>Se Connecter</span>
              <span class="material-symbols-outlined text-base">login</span>
            </button>

          </form>

          <!-- Formulaire : Connexion par Token Candidat JWT -->
          <form v-else @submit.prevent="connexionCandidat" class="space-y-4">

            <div>
              <label class="block text-xs font-semibold text-texte-secondaire uppercase tracking-wider mb-1.5">
                Token Candidat Unique (JWT)
              </label>
              <input
                type="text"
                required
                v-model="tokenCandidat"
                placeholder="ex: EVAL-2025-8942-JWT"
                class="champ-saisie font-mono text-bleu-600 font-bold"
              />
              <p class="text-[11px] text-texte-muet mt-1.5">
                Fourni via le lien d'invitation sécurisé reçu par email.
              </p>
            </div>

            <!-- Bouton d'accès à l'épreuve -->
            <button
              id="btn-acces-epreuve"
              type="submit"
              class="btn-principal w-full py-3 text-sm mt-2"
            >
              <span>Accéder à l'Epreuve Candidat</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </button>

          </form>

        </div>

        <!-- Lien retour vers l'accueil -->
        <div class="text-center mt-6">
          <router-link to="/" class="text-xs text-texte-muet hover:text-texte-secondaire transition-colors inline-flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">arrow_back</span>
            Retour à l'accueil
          </router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../magasins/authentification.store';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();

// Etat réactif du formulaire
const modeSelection = ref('compte');         // 'compte' | 'candidat'
const roleChoisi    = ref('companyadmin');   // Rôle sélectionné pour la démo
const emailForm     = ref('s.hadjab@techcorp.dz');
const tokenCandidat = ref('EVAL-2025-8942');

/**
 * Connexion compte B2B (administrateur, consultant, super admin).
 * Utilise le magasin d'authentification Pinia pour définir le rôle actif.
 */
function connexionCompte() {
  magasinAuth.connexion(roleChoisi.value);

  if (roleChoisi.value === 'superadmin')   router.push('/tableau-de-bord/superadmin');
  else if (roleChoisi.value === 'companyadmin') router.push('/tableau-de-bord/entreprise');
  else router.push('/tableau-de-bord/consultant');
}

/**
 * Connexion candidat par token JWT.
 * Redirige vers le tableau de bord du candidat.
 */
function connexionCandidat() {
  magasinAuth.connexion('candidate');
  router.push('/tableau-de-bord/candidat');
}
</script>
