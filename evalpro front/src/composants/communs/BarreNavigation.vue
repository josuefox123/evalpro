<template>
  <!-- 
    Barre de navigation principale réutilisable pour EvalPro.
    Affiche le logo, les raccourcis de navigation adaptés au rôle, 
    les notifications, le thème et le profil utilisateur.
  -->
  <header class="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo et Marque EvalPro -->
        <div class="flex items-center space-x-3">
          <router-link to="/" class="flex items-center space-x-2.5 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-white text-xl">fact_check</span>
            </div>
            <div>
              <span class="text-xl font-extrabold tracking-tight text-white font-sans">Eval<span class="text-indigo-400">Pro</span></span>
              <span class="hidden sm:inline-block ml-2 text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">SaaS RH</span>
            </div>
          </router-link>
        </div>

        <!-- Navigation Principale (Adaptée au Rôle) -->
        <nav class="hidden md:flex items-center space-x-1">
          <!-- Lien Tableau de bord spécifique -->
          <router-link 
            :to="lienTableauDeBord" 
            class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
            :class="estRouteActive('/tableau-de-bord') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'"
          >
            <span class="material-symbols-outlined text-lg">dashboard</span>
            <span>Tableau de bord</span>
          </router-link>

          <!-- Liens Entreprise & RH (Campagnes, Candidats) -->
          <template v-if="magasinAuth.estAdminEntreprise || magasinAuth.estSuperAdmin">
            <router-link 
              to="/campagnes" 
              class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
              :class="estRouteActive('/campagnes') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'"
            >
              <span class="material-symbols-outlined text-lg">campaign</span>
              <span>Campagnes</span>
            </router-link>

            <router-link 
              to="/candidats" 
              class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
              :class="estRouteActive('/candidats') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'"
            >
              <span class="material-symbols-outlined text-lg">group</span>
              <span>Candidats</span>
            </router-link>
          </template>

          <!-- Liens Épreuves & Banque de Questions (Consultant / Admin) -->
          <template v-if="magasinAuth.estConsultant || magasinAuth.estAdminEntreprise || magasinAuth.estSuperAdmin">
            <router-link 
              to="/banque-questions" 
              class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
              :class="estRouteActive('/banque-questions') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'"
            >
              <span class="material-symbols-outlined text-lg">quiz</span>
              <span>Banque de questions</span>
            </router-link>

            <router-link 
              to="/correction" 
              class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
              :class="estRouteActive('/correction') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'"
            >
              <span class="material-symbols-outlined text-lg">fact_check</span>
              <span>Correction</span>
            </router-link>
          </template>

          <!-- Lien Résultats & Classement -->
          <router-link 
            v-if="!magasinAuth.estCandidat"
            to="/resultats" 
            class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
            :class="estRouteActive('/resultats') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'"
          >
            <span class="material-symbols-outlined text-lg">analytics</span>
            <span>Résultats</span>
          </router-link>
        </nav>

        <!-- Actions et Profil Utilisateur -->
        <div class="flex items-center space-x-3">
          
          <!-- Bouton Nouvelle Campagne (Si Admin Entreprise) -->
          <router-link 
            v-if="magasinAuth.estAdminEntreprise"
            to="/campagnes/nouvelle"
            class="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Nouvelle Campagne</span>
          </router-link>

          <!-- Bouton Examen Candidat (Si Candidat) -->
          <router-link 
            v-if="magasinAuth.estCandidat"
            to="/epreuves/passage"
            class="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span class="material-symbols-outlined text-sm">play_arrow</span>
            <span>Commencer l'Épreuve</span>
          </router-link>

          <!-- Notification Bell -->
          <button class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative cursor-pointer" title="Notifications">
            <span class="material-symbols-outlined text-xl">notifications</span>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
          </button>

          <!-- Menu Profil Utilisateur -->
          <div class="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400">
              {{ initialsUtilisateur }}
            </div>
            <div class="hidden lg:block text-left">
              <div class="text-xs font-semibold text-slate-200">{{ magasinAuth.utilisateurConnecte.nom }}</div>
              <div class="text-[10px] text-slate-400">{{ magasinAuth.detailsRoleActif.libelle }}</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMagasinAuthentification } from '../../magasins/authentification.store';

const route = useRoute();
const magasinAuth = useMagasinAuthentification();

/**
 * Calculer les initiales de l'utilisateur connecté
 */
const initialsUtilisateur = computed(() => {
  const nom = magasinAuth.utilisateurConnecte.nom || 'User';
  return nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});

/**
 * Lien vers le tableau de bord approprié
 */
const lienTableauDeBord = computed(() => {
  if (magasinAuth.estSuperAdmin) return '/tableau-de-bord/superadmin';
  if (magasinAuth.estAdminEntreprise) return '/tableau-de-bord/entreprise';
  if (magasinAuth.estConsultant) return '/tableau-de-bord/consultant';
  return '/tableau-de-bord/candidat';
});

/**
 * Vérifier si une route est active
 * @param {string} routePath 
 */
function estRouteActive(routePath) {
  return route.path.startsWith(routePath);
}
</script>
