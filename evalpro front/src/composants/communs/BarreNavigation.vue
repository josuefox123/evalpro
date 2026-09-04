<template>
  <!--
    BarreNavigation.vue - Header supérieur de l'interface B2B EvalPro
    Header blanc fixe avec : titre de l'espace actuel, recherche globale,
    notifications et avatar de l'utilisateur connecté.
  -->
  <header class="bg-white border-b border-bordure h-16 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">

    <!-- Partie gauche : Titre de l'espace en cours -->
    <div class="flex items-center space-x-3">
      <h2 class="text-sm font-bold text-texte-principal flex items-center space-x-2">
        <span>Espace {{ magasinAuth.detailsRoleActif.libelle }}</span>
      </h2>
      <span class="text-bordure text-sm">|</span>
      <span class="text-xs font-semibold text-bleu-600">
        {{ magasinAuth.utilisateurConnecte.entreprise || 'EvalPro SaaS' }}
      </span>
    </div>

    <!-- Partie droite : Recherche, notifications, profil -->
    <div class="flex items-center space-x-3">

      <!-- Barre de recherche globale (masquée sur petits écrans) -->
      <div class="hidden sm:flex items-center relative">
        <span class="material-symbols-outlined absolute left-3 text-texte-muet text-sm">search</span>
        <input
          type="text"
          placeholder="Rechercher une campagne, candidat..."
          class="bg-fond-secondaire border border-bordure rounded-xl pl-9 pr-3 py-1.5 text-xs text-texte-principal placeholder:text-texte-muet focus:outline-none focus:border-bleu-500 focus:ring-2 focus:ring-bleu-500/20 w-64 transition-colors"
        />
      </div>

      <!-- Bouton "Commencer l'Épreuve" (affiché uniquement pour les candidats) -->
      <router-link
        v-if="magasinAuth.estCandidat"
        to="/epreuves/passage"
        class="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-succes hover:opacity-90 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
      >
        <span class="material-symbols-outlined text-sm">play_arrow</span>
        <span>Commencer l'Épreuve</span>
      </router-link>

      <!-- Bouton Notifications avec indicateur -->
      <button
        class="p-2 text-texte-secondaire hover:text-texte-principal hover:bg-fond-secondaire rounded-xl transition-colors relative cursor-pointer"
        title="Notifications"
      >
        <span class="material-symbols-outlined text-lg">notifications</span>
        <!-- Point rouge : indique des notifications non lues -->
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-bleu-600"></span>
      </button>

      <!-- Avatar et informations de l'utilisateur connecté -->
      <div class="flex items-center space-x-2.5 pl-3 border-l border-bordure">
        <!-- Cercle avec les initiales de l'utilisateur -->
        <div class="w-8 h-8 rounded-full bg-bleu-100 border border-bleu-200 flex items-center justify-center text-xs font-bold text-bleu-600">
          {{ initialsUtilisateur }}
        </div>
        <!-- Nom et rôle (masqués sur petits écrans) -->
        <div class="hidden md:block text-left">
          <div class="text-xs font-semibold text-texte-principal">
            {{ magasinAuth.utilisateurConnecte.nom }}
          </div>
          <div class="text-[10px] text-texte-muet">
            {{ magasinAuth.detailsRoleActif.libelle }}
          </div>
        </div>
        <!-- Flèche déroulante (futur menu de déconnexion) -->
        <span class="material-symbols-outlined text-sm text-texte-muet">expand_more</span>
      </div>

    </div>

  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useMagasinAuthentification } from '../../magasins/authentification.store';

const magasinAuth = useMagasinAuthentification();

/**
 * Calcule les initiales de l'utilisateur connecté pour l'avatar.
 * Exemple : "Salima Hadjab" -> "SH"
 */
const initialsUtilisateur = computed(() => {
  const nom = magasinAuth.utilisateurConnecte.nom || 'Utilisateur';
  return nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});
</script>
