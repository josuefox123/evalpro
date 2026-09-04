<template>
  <!--
    App.vue - Composant racine de l'application EvalPro SaaS B2B
    Gère le routage des layouts selon le contexte :
    - Mode examen candidat (plein ecran, sans distractions)
    - Pages publiques (accueil, connexion)
    - Dashboard B2B (avec sidebar + topbar)
  -->
  <div class="min-h-screen bg-fond-principal text-texte-principal font-sans">

    <!-- Bandeau de selection de role (visible en mode demonstration) -->
    <SelecteurRole />

    <!-- MODE EXAMEN CANDIDAT : Plein ecran sans navigation -->
    <template v-if="estModeExamenCandidat">
      <main class="flex-grow">
        <router-view v-slot="{ Component }">
          <transition name="fondu-entre" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>

    <!-- PAGES PUBLIQUES : Accueil et connexion (sans sidebar) -->
    <template v-else-if="estPagePublique">
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fondu-entre" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>

    <!-- DASHBOARD B2B : Avec sidebar fixe et topbar -->
    <template v-else>
      <DispositionB2B>
        <router-view v-slot="{ Component }">
          <transition name="fondu-entre" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </DispositionB2B>
    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SelecteurRole from './composants/communs/SelecteurRole.vue';
import DispositionB2B from './composants/communs/DispositionB2B.vue';

const route = useRoute();

/**
 * Verifie si l'utilisateur est en train de passer une epreuve.
 * Dans ce cas, l'interface est en mode plein ecran sans sidebar.
 */
const estModeExamenCandidat = computed(() => route.path === '/epreuves/passage');

/**
 * Verifie si la page actuelle est une page publique (accueil ou connexion).
 * Ces pages utilisent leur propre layout sans sidebar B2B.
 */
const estPagePublique = computed(() =>
  route.path === '/' || route.path === '/connexion' || route.path === '/login'
);
</script>
