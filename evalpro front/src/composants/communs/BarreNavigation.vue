<template>
  <!--
    BarreNavigation.vue - Header supérieur de l'interface B2B EvalPro
    Fond blanc, bordure fine, barre de recherche, notifications et profil
  -->
  <header class="bg-white border-b border-ep-border h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-ep-subtle">

    <!-- Partie gauche : Mobile toggle & Titre de l'espace -->
    <div class="flex items-center gap-3">
      <!-- Bouton Menu Mobile (masqué sur desktop) -->
      <button
        class="lg:hidden p-1.5 text-ep-muted hover:text-ep-text hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        @click="$emit('toggle-mobile-menu')"
      >
        <span class="material-symbols-outlined text-2xl">menu</span>
      </button>

      <!-- Titre Espace / Entreprise -->
      <div class="flex items-center gap-2 max-w-[180px] xs:max-w-[240px] sm:max-w-none">
        <h2 class="text-xs sm:text-sm font-bold text-ep-text flex items-center gap-2 truncate">
          <span class="truncate">Espace {{ magasinAuth.detailsRoleActif.libelle }}</span>
        </h2>
        <span class="text-slate-300 text-xs hidden sm:inline">|</span>
        <span class="text-xs font-semibold text-ep-primary bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 hidden sm:inline truncate">
          {{ magasinAuth.utilisateurConnecte.entreprise || 'EvalPro' }}
        </span>
      </div>
    </div>

    <!-- Partie droite : Recherche, notifications, candidat CTA, profil -->
    <div class="flex items-center gap-3">

      <!-- Recherche globale (masquée sur très petit écran) -->
      <div class="hidden md:flex items-center relative">
        <span class="material-symbols-outlined absolute left-3 text-ep-muted text-lg pointer-events-none">search</span>
        <input
          type="text"
          placeholder="Rechercher une campagne, un candidat..."
          class="bg-slate-50 border border-ep-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-ep-text placeholder:text-ep-muted focus:outline-none focus:border-ep-primary focus:ring-2 focus:ring-ep-primary/20 w-64 transition-all"
        />
      </div>

      <!-- CTA Candidat : Passer l'épreuve -->
      <router-link
        v-if="magasinAuth.estCandidat"
        to="/epreuves/passage"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ep-success hover:bg-emerald-600 text-white text-xs font-semibold shadow-ep-subtle transition-all cursor-pointer"
      >
        <span class="material-symbols-outlined text-sm">play_arrow</span>
        <span>Commencer l'épreuve</span>
      </router-link>

      <!-- Bouton Notifications -->
      <button
        class="p-2 text-ep-muted hover:text-ep-text hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
        title="Notifications"
      >
        <span class="material-symbols-outlined text-xl">notifications</span>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-ep-primary animate-pulse"></span>
      </button>

      <!-- Profil Utilisateur Connecté -->
      <div class="flex items-center gap-2.5 pl-3 border-l border-ep-border">
        <div class="w-8 h-8 rounded-full bg-ep-primary/10 border border-ep-primary/20 flex items-center justify-center text-xs font-bold text-ep-primary">
          {{ initialsUtilisateur }}
        </div>
        <div class="hidden sm:block text-left">
          <div class="text-xs font-semibold text-ep-text leading-tight">
            {{ magasinAuth.utilisateurConnecte.nom }}
          </div>
          <div class="text-[10px] text-ep-muted">
            {{ magasinAuth.detailsRoleActif.libelle }}
          </div>
        </div>
      </div>

    </div>

  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useMagasinAuthentification } from '../../magasins/authentification.store';

defineEmits(['toggle-mobile-menu']);

const magasinAuth = useMagasinAuthentification();

const initialsUtilisateur = computed(() => {
  const nom = magasinAuth.utilisateurConnecte.nom || 'Utilisateur';
  return nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});
</script>
