<template>
  <!-- 
    DispositionB2B.vue - Structure Principale B2B SaaS EvalPro
    Sidebar fixe / tiroir mobile + Topbar fixe + Zone de contenu réactive
  -->
  <div class="min-h-screen bg-slate-50 text-ep-text flex font-sans">


    <!-- ================================================
         SIDEBAR DESKTOP & TABLETTE (Fixed Navy SaaS Style)
         ================================================ -->
    <aside
      class="hidden lg:flex w-64 bg-ep-navy text-slate-300 border-r border-slate-800 flex-col fixed inset-y-0 left-0 z-40 shadow-ep-lg"
    >
      <!-- Logo EvalPro Header -->
      <div class="h-20 px-6 border-b border-slate-800 flex items-center justify-start">
        <router-link to="/" class="flex items-center group">
          <img src="/logo.png" alt="EvalPro" class="h-14 w-auto max-h-14 object-contain transition-transform group-hover:scale-105" />
        </router-link>
      </div>

      <!-- Navigation Principale -->
      <nav class="flex-1 overflow-y-auto px-3 py-5 space-y-6">

        <!-- Section : Vue d'ensemble & Recrutement -->
        <div class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Recrutement
          </div>

          <router-link
            :to="lienTableauDeBord"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group"
            :class="estRouteActive('/tableau-de-bord') ? 'bg-ep-primary text-white font-semibold shadow-ep-subtle' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg" :class="estRouteActive('/tableau-de-bord') ? 'text-white' : 'text-slate-400 group-hover:text-white'">dashboard</span>
            <span>Tableau de bord</span>
          </router-link>

          <router-link
            v-if="!magasinAuth.estCandidat"
            to="/campagnes"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group"
            :class="estRouteActive('/campagnes') ? 'bg-ep-primary text-white font-semibold shadow-ep-subtle' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg" :class="estRouteActive('/campagnes') ? 'text-white' : 'text-slate-400 group-hover:text-white'">campaign</span>
            <span>Campagnes</span>
          </router-link>

          <router-link
            v-if="!magasinAuth.estCandidat"
            to="/candidats"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group"
            :class="estRouteActive('/candidats') ? 'bg-ep-primary text-white font-semibold shadow-ep-subtle' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg" :class="estRouteActive('/candidats') ? 'text-white' : 'text-slate-400 group-hover:text-white'">group</span>
            <span>Candidats</span>
          </router-link>
        </div>

        <!-- Section : Épreuves & Banques -->
        <div v-if="!magasinAuth.estCandidat" class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Évaluations
          </div>

          <router-link
            to="/epreuves/creation"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group"
            :class="estRouteActive('/epreuves/creation') ? 'bg-ep-primary text-white font-semibold shadow-ep-subtle' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg" :class="estRouteActive('/epreuves/creation') ? 'text-white' : 'text-slate-400 group-hover:text-white'">quiz</span>
            <span>Épreuves</span>
          </router-link>

          <router-link
            to="/banque-questions"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group"
            :class="estRouteActive('/banque-questions') ? 'bg-ep-primary text-white font-semibold shadow-ep-subtle' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg" :class="estRouteActive('/banque-questions') ? 'text-white' : 'text-slate-400 group-hover:text-white'">menu_book</span>
            <span>Banque de questions</span>
          </router-link>
        </div>

        <!-- Section : Corrections & Résultats -->
        <div v-if="!magasinAuth.estCandidat" class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Analyse & Notes
          </div>

          <router-link
            to="/correction"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group"
            :class="estRouteActive('/correction') ? 'bg-ep-primary text-white font-semibold shadow-ep-subtle' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg" :class="estRouteActive('/correction') ? 'text-white' : 'text-slate-400 group-hover:text-white'">fact_check</span>
            <span>Corrections</span>
          </router-link>

          <router-link
            to="/resultats"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group"
            :class="estRouteActive('/resultats') ? 'bg-ep-primary text-white font-semibold shadow-ep-subtle' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
          >
            <span class="material-symbols-outlined text-lg" :class="estRouteActive('/resultats') ? 'text-white' : 'text-slate-400 group-hover:text-white'">leaderboard</span>
            <span>Résultats</span>
          </router-link>
        </div>

      </nav>

      <!-- Section Bas de Sidebar : Organisation & Profil -->
      <div class="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2">
        <div class="px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between text-xs">
          <div class="truncate">
            <span class="block text-[10px] text-slate-400 font-semibold uppercase">Organisation</span>
            <span class="font-bold text-white truncate block">{{ magasinAuth.utilisateurConnecte.entreprise || 'TechCorp Algérie' }}</span>
          </div>
          <span class="material-symbols-outlined text-slate-400 text-base">domain</span>
        </div>

        <div class="flex items-center justify-between px-3 py-2 text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-ep-primary text-white font-bold flex items-center justify-center text-xs">
              {{ initialsUtilisateur }}
            </div>
            <div class="truncate">
              <span class="block font-semibold text-white truncate text-xs">{{ magasinAuth.utilisateurConnecte.nom }}</span>
              <span class="block text-[10px] text-slate-400">{{ magasinAuth.detailsRoleActif.libelle }}</span>
            </div>
          </div>
          <button @click="deconnecter" title="Déconnexion" class="text-slate-400 hover:text-rose-400 transition-colors p-1">
            <span class="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>

    </aside>

    <!-- ================================================
         DRAWER MOBILE SIDEBAR
         ================================================ -->
    <Teleport to="body">
      <Transition name="fondu-modal">
        <div v-if="mobileMenuOuvert" class="lg:hidden fixed inset-0 z-50 flex">
          <div class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" @click="mobileMenuOuvert = false"></div>

          <div class="relative w-72 bg-ep-navy text-slate-300 flex flex-col z-10 shadow-ep-lg h-full">
            <div class="h-20 px-6 border-b border-slate-800 flex items-center justify-between">
              <router-link to="/" class="flex items-center group" @click="mobileMenuOuvert = false">
                <img src="/logo.png" alt="EvalPro" class="h-12 w-auto object-contain" />
              </router-link>
              <button @click="mobileMenuOuvert = false" class="text-slate-400 hover:text-white p-1">
                <span class="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <nav class="flex-1 overflow-y-auto p-4 space-y-4">
              <router-link
                :to="lienTableauDeBord"
                @click="mobileMenuOuvert = false"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                :class="estRouteActive('/tableau-de-bord') ? 'bg-ep-primary text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'"
              >
                <span class="material-symbols-outlined">dashboard</span>
                <span>Tableau de bord</span>
              </router-link>

              <router-link
                v-if="!magasinAuth.estCandidat"
                to="/campagnes"
                @click="mobileMenuOuvert = false"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                :class="estRouteActive('/campagnes') ? 'bg-ep-primary text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'"
              >
                <span class="material-symbols-outlined">campaign</span>
                <span>Campagnes</span>
              </router-link>

              <router-link
                v-if="!magasinAuth.estCandidat"
                to="/candidats"
                @click="mobileMenuOuvert = false"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                :class="estRouteActive('/candidats') ? 'bg-ep-primary text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'"
              >
                <span class="material-symbols-outlined">group</span>
                <span>Candidats</span>
              </router-link>

              <router-link
                v-if="!magasinAuth.estCandidat"
                to="/epreuves/creation"
                @click="mobileMenuOuvert = false"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                :class="estRouteActive('/epreuves/creation') ? 'bg-ep-primary text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'"
              >
                <span class="material-symbols-outlined">quiz</span>
                <span>Épreuves</span>
              </router-link>

              <router-link
                v-if="!magasinAuth.estCandidat"
                to="/banque-questions"
                @click="mobileMenuOuvert = false"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                :class="estRouteActive('/banque-questions') ? 'bg-ep-primary text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'"
              >
                <span class="material-symbols-outlined">menu_book</span>
                <span>Banque de questions</span>
              </router-link>

              <router-link
                v-if="!magasinAuth.estCandidat"
                to="/correction"
                @click="mobileMenuOuvert = false"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                :class="estRouteActive('/correction') ? 'bg-ep-primary text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'"
              >
                <span class="material-symbols-outlined">fact_check</span>
                <span>Corrections</span>
              </router-link>

              <router-link
                v-if="!magasinAuth.estCandidat"
                to="/resultats"
                @click="mobileMenuOuvert = false"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                :class="estRouteActive('/resultats') ? 'bg-ep-primary text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'"
              >
                <span class="material-symbols-outlined">leaderboard</span>
                <span>Résultats</span>
              </router-link>
            </nav>

            <div class="p-4 border-t border-slate-800 bg-slate-950">
              <button @click="deconnecter" class="w-full flex items-center justify-center gap-2 py-2 text-rose-400 text-sm font-semibold rounded-lg bg-rose-950/40">
                <span class="material-symbols-outlined text-sm">logout</span>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ================================================
         ZONE DE CONTENU PRINCIPAL
         ================================================ -->
    <div class="flex-1 lg:ml-64 flex flex-col min-w-0">

      <!-- Header Supérieur Fixe -->
      <BarreNavigation @toggle-mobile-menu="mobileMenuOuvert = !mobileMenuOuvert" />

      <!-- Contenu Dynamique de la Vue -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 pt-20 sm:pt-22 lg:pt-22 max-w-7xl w-full mx-auto min-w-0">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import BarreNavigation from './BarreNavigation.vue';

const route = useRoute();
const router = useRouter();
const magasinAuth = useMagasinAuthentification();
const mobileMenuOuvert = ref(false);

const lienTableauDeBord = computed(() => {
  if (magasinAuth.estSuperAdmin)      return '/tableau-de-bord/superadmin';
  if (magasinAuth.estAdminEntreprise) return '/tableau-de-bord/entreprise';
  if (magasinAuth.estConsultant)      return '/tableau-de-bord/consultant';
  return '/tableau-de-bord/candidat';
});

const initialsUtilisateur = computed(() => {
  const nom = magasinAuth.utilisateurConnecte.nom || 'Utilisateur';
  return nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});

function estRouteActive(routePath) {
  return route.path.startsWith(routePath);
}

function deconnecter() {
  router.push('/connexion');
}
</script>
