<template>
  <!-- 
    VueConnexion.vue (Authentification & Accès JWT B2B SaaS)
    Formulaire de connexion épuré avec option de démo par rôle ou lien direct candidat.
  -->
  <div class="min-h-[85vh] flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white border border-bordure rounded-2xl p-8 shadow-carte space-y-6">
      
      <div class="text-center space-y-2">
        <div class="w-12 h-12 rounded-xl bg-bleu-600 flex items-center justify-center mx-auto text-white font-extrabold text-xl shadow-carte">
          E
        </div>
        <h2 class="text-2xl font-extrabold text-texte-principal tracking-tight">Connexion à EvalPro</h2>
        <p class="text-xs text-texte-secondaire">Accédez à votre espace B2B ou saisissez votre code invitation candidat</p>
      </div>

      <!-- Onglets Compte vs Lien Candidat -->
      <div class="flex rounded-lg bg-fond-principal p-1 border border-bordure text-xs">
        <button 
          @click="modeSelection = 'compte'"
          :class="[
            'flex-1 py-2 font-semibold rounded-md transition-colors cursor-pointer',
            modeSelection === 'compte' ? 'bg-white text-bleu-600 shadow-carte' : 'text-texte-secondaire hover:text-texte-principal'
          ]"
        >
          Administrateur / Évaluateur
        </button>
        <button 
          @click="modeSelection = 'candidat'"
          :class="[
            'flex-1 py-2 font-semibold rounded-md transition-colors cursor-pointer',
            modeSelection === 'candidat' ? 'bg-white text-bleu-600 shadow-carte' : 'text-texte-secondaire hover:text-texte-principal'
          ]"
        >
          Lien Candidat (JWT)
        </button>
      </div>

      <!-- Formulaire Connexion Compte -->
      <form v-if="modeSelection === 'compte'" @submit.prevent="connexionCompte" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-texte-secondaire uppercase tracking-wider mb-1">Rôle de Démonstration</label>
          <select 
            v-model="roleChoisi" 
            class="w-full bg-fond-principal border border-bordure rounded-lg px-3.5 py-2.5 text-xs text-texte-principal focus:outline-none focus:border-bleu-600"
          >
            <option value="companyadmin">Administrateur Entreprise (TechCorp Algérie)</option>
            <option value="superadmin">Super Administrateur (EvalPro HQ)</option>
            <option value="consultant">Consultant / Évaluateur (Dr. Karim Benali)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-texte-secondaire uppercase tracking-wider mb-1">Adresse Email</label>
          <input 
            type="email" 
            required 
            v-model="emailForm" 
            placeholder="adresse@entreprise.dz" 
            class="w-full bg-fond-principal border border-bordure rounded-lg px-3.5 py-2.5 text-xs text-texte-principal focus:outline-none focus:border-bleu-600"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-texte-secondaire uppercase tracking-wider mb-1">Mot de Passe</label>
          <input 
            type="password" 
            required 
            value="••••••••••••" 
            class="w-full bg-fond-principal border border-bordure rounded-lg px-3.5 py-2.5 text-xs text-texte-principal focus:outline-none focus:border-bleu-600"
          />
        </div>

        <button 
          type="submit" 
          class="w-full py-3 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-bold shadow-carte transition-colors cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Se Connecter</span>
          <span class="material-symbols-outlined text-base">login</span>
        </button>
      </form>

      <!-- Formulaire Token Candidat -->
      <form v-else @submit.prevent="connexionCandidat" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-texte-secondaire uppercase tracking-wider mb-1">Token Candidat Unique (JWT)</label>
          <input 
            type="text" 
            required 
            v-model="tokenCandidat" 
            placeholder="ex: EVAL-2025-8942-JWT" 
            class="w-full bg-fond-principal border border-bordure rounded-lg px-3.5 py-2.5 text-xs text-bleu-600 font-mono font-bold focus:outline-none focus:border-bleu-600"
          />
          <p class="text-[11px] text-texte-muet mt-1">Fourni via le lien d'invitation sécurisé reçu par email.</p>
        </div>

        <button 
          type="submit" 
          class="w-full py-3 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-bold shadow-carte transition-colors cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Accéder à l'Épreuve Candidat</span>
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../magasins/authentification.store';

const router = useRouter();
const magasinAuth = useMagasinAuthentification();

const modeSelection = ref('compte');
const roleChoisi = ref('companyadmin');
const emailForm = ref('s.hadjab@techcorp.dz');
const tokenCandidat = ref('EVAL-2025-8942');

function connexionCompte() {
  magasinAuth.connexion(roleChoisi.value);
  if (roleChoisi.value === 'superadmin') router.push('/tableau-de-bord/superadmin');
  else if (roleChoisi.value === 'companyadmin') router.push('/tableau-de-bord/entreprise');
  else router.push('/tableau-de-bord/consultant');
}

function connexionCandidat() {
  magasinAuth.connexion('candidate');
  router.push('/tableau-de-bord/candidat');
}
</script>
