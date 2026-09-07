<template>
  <!--
    TableauDeBordCandidat.vue - Espace Candidat Zéro Distraction
  -->
  <div class="max-w-3xl mx-auto py-8 sm:py-12 px-4 space-y-8">

    <div class="bg-white border border-ep-border rounded-2xl p-6 sm:p-8 shadow-ep-card space-y-6">

      <div class="flex items-start justify-between pb-6 border-b border-ep-border">
        <div class="space-y-1">
          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-ep-primary border border-blue-200/60 text-xs font-semibold">
            Invitation Officielle d'Évaluation
          </span>
          <h1 class="text-2xl font-extrabold text-ep-text tracking-tight font-titre mt-2">
            Bienvenue, {{ magasinAuth.utilisateurConnecte?.nom || 'Candidat' }}
          </h1>
          <p class="text-xs text-ep-muted">
            Poste : <strong class="text-ep-text">Développeur Web Full-Stack Senior</strong> • TechCorp Algérie
          </p>
        </div>

        <div class="w-12 h-12 rounded-xl bg-blue-50 text-ep-primary flex items-center justify-center border border-blue-100 flex-shrink-0">
          <span class="material-symbols-outlined text-2xl">assignment_ind</span>
        </div>
      </div>

      <!-- Métriques de l'épreuve -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-ep-border text-xs">
        <div class="space-y-1">
          <div class="text-ep-muted">Durée Maximale</div>
          <div class="text-sm font-bold text-ep-text font-mono">45 Minutes</div>
        </div>
        <div class="space-y-1">
          <div class="text-ep-muted">Structure</div>
          <div class="text-sm font-bold text-ep-text font-mono">4 Épreuves Techniques</div>
        </div>
        <div class="space-y-1">
          <div class="text-ep-muted">Sécurité</div>
          <div class="text-sm font-bold text-emerald-600 flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">verified_user</span>
            <span>Proctoring Actif</span>
          </div>
        </div>
      </div>

      <!-- Instructions officielles -->
      <div class="space-y-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100/60">
        <h3 class="text-xs font-bold text-ep-text uppercase tracking-wider flex items-center gap-2">
          <span class="material-symbols-outlined text-ep-primary text-base">info</span>
          <span>Instructions Avant le Démarrage</span>
        </h3>
        <ul class="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
          <li>Assurez-vous d'être dans un environnement calme avec une connexion internet stable.</li>
          <li>Votre webcam et votre micro doivent rester activés pendant toute la session.</li>
          <li>Les changements d'onglets et le copier-coller seront détectés et enregistrés.</li>
          <li>Vos réponses sont automatiquement sauvegardées de manière continue.</li>
        </ul>
      </div>

      <!-- Boutons Lancement & Vérification Technique -->
      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <EpButton
          variant="outline"
          size="lg"
          iconLeft="build"
          fullWidth
          class="sm:w-auto"
          @click="$router.push('/epreuves/passage')"
        >
          Vérifier mon Matériel
        </EpButton>

        <EpButton
          variant="primary"
          size="lg"
          iconLeft="play_arrow"
          fullWidth
          class="sm:w-auto"
          @click="$router.push('/epreuves/passage')"
        >
          Démarrer l'Épreuve
        </EpButton>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import EpButton from '../../composants/systeme/EpButton.vue';

const magasinAuth = useMagasinAuthentification();
</script>
