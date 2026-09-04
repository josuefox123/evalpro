<template>
  <!-- 
    App.vue : Composant Racine EvalPro SaaS B2B.
    Bascule entre le layout B2B SaaS d'administration et la vue épurée du candidat.
  -->
  <div class="min-h-screen bg-fond-principal text-texte-principal flex flex-col font-sans">
    
    <!-- Sélecteur rapide de rôle (Banner de démonstration) -->
    <SelecteurRole />

    <!-- Si l'utilisateur est en train de passer l'épreuve (Page Candidat Zéro Distraction) -->
    <template v-if="estModeExamenCandidat">
      <main class="flex-grow">
        <router-view v-slot="{ Component }">
          <transition name="fondu-entre" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>

    <!-- Sinon : Disposition B2B SaaS avec Sidebar fixe & Topbar -->
    <template v-else-if="estPageAuthentiqueOuAccueil">
      <main class="flex-grow">
        <router-view v-slot="{ Component }">
          <transition name="fondu-entre" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>

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

const estModeExamenCandidat = computed(() => route.path === '/epreuves/passage');
const estPageAuthentiqueOuAccueil = computed(() => route.path === '/' || route.path === '/connexion');
</script>
