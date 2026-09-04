<template>
  <!-- 
    VueConnexion : Page d'authentification et de choix d'espace utilisateur.
    Permet de se connecter avec identifiants ou d'accéder directement par token candidat.
  -->
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
      
      <div class="text-center space-y-2">
        <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-indigo-600/30">
          <span class="material-symbols-outlined text-2xl">lock</span>
        </div>
        <h2 class="text-2xl font-bold text-white">Connexion à EvalPro</h2>
        <p class="text-xs text-slate-400">Sélectionnez votre profil ou saisissez votre code d'accès candidat</p>
      </div>

      <!-- Onglets : Connexion Compte vs Code Invitation Candidat -->
      <div class="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
        <button 
          @click="modeSelection = 'compte'"
          :class="[
            'flex-1 py-2 font-medium rounded-md transition-colors cursor-pointer',
            modeSelection === 'compte' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
          ]"
        >
          Compte Administrateur / Consultant
        </button>
        <button 
          @click="modeSelection = 'candidat'"
          :class="[
            'flex-1 py-2 font-medium rounded-md transition-colors cursor-pointer',
            modeSelection === 'candidat' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
          ]"
        >
          Lien Candidat (JWT)
        </button>
      </div>

      <!-- Formulaire Connexion Administrateur / Consultant -->
      <form v-if="modeSelection === 'compte'" @submit.prevent="connexionCompte" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Choisir le Rôle de Démonstration</label>
          <select 
            v-model="roleChoisi" 
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="companyadmin">Administrateur Entreprise (TechCorp Algérie)</option>
            <option value="superadmin">Super Administrateur (EvalPro HQ)</option>
            <option value="consultant">Consultant / Évaluateur (Dr. Karim Benali)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Adresse Email</label>
          <input 
            type="email" 
            required 
            v-model="emailForm" 
            placeholder="votre.email@entreprise.dz" 
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Mot de Passe</label>
          <input 
            type="password" 
            required 
            value="••••••••••••" 
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button 
          type="submit" 
          class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Se Connecter</span>
          <span class="material-symbols-outlined text-base">login</span>
        </button>
      </form>

      <!-- Formulaire Accès Candidat via Token -->
      <form v-else @submit.prevent="connexionCandidat" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Code d'Invitation Unique (JWT)</label>
          <input 
            type="text" 
            required 
            v-model="tokenCandidat" 
            placeholder="ex: EVAL-2025-8942-JWT" 
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-amber-400 font-mono focus:outline-none focus:border-amber-500"
          />
          <p class="text-[11px] text-slate-500 mt-1.5">Inséré automatiquement lorsque le candidat clique sur son lien sécurisé d'invitation.</p>
        </div>

        <button 
          type="submit" 
          class="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Rejoindre l'Épreuve Candidat</span>
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
