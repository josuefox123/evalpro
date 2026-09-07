<template>
  <!--
    VueVerificationTechnique.vue - Page de test du matériel avant l'épreuve
  -->
  <div class="max-w-2xl mx-auto py-10 px-4 space-y-6">

    <div class="bg-white border border-ep-border rounded-2xl p-6 sm:p-8 shadow-ep-card space-y-6">

      <div class="flex items-center justify-between border-b border-ep-border pb-4">
        <div>
          <span class="text-xs font-bold text-ep-primary uppercase tracking-wider">Étape Préparatoire</span>
          <h1 class="text-xl font-extrabold text-ep-text font-titre mt-0.5">Préparez votre Environnement</h1>
          <p class="text-xs text-ep-muted mt-1">Vérification de la compatibilité technique avant le lancement du test.</p>
        </div>

        <div class="w-10 h-10 rounded-xl bg-blue-50 text-ep-primary flex items-center justify-center border border-blue-100">
          <span class="material-symbols-outlined text-xl">fact_check</span>
        </div>
      </div>

      <!-- Liste des tests de compatibilité -->
      <div class="space-y-3">
        <!-- Test 1 : Navigateur Web -->
        <div class="p-4 rounded-xl border flex items-center justify-between transition-colors bg-slate-50 border-ep-border">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-lg">public</span>
            </div>
            <div>
              <div class="text-xs font-bold text-ep-text">Navigateur Web Compatible</div>
              <div class="text-[10px] text-ep-muted">Google Chrome / Edge / Firefox détecté</div>
            </div>
          </div>
          <EpBadge variant="success" dot icon="check_circle">Vérifié</EpBadge>
        </div>

        <!-- Test 2 : Connexion Internet -->
        <div class="p-4 rounded-xl border flex items-center justify-between transition-colors bg-slate-50 border-ep-border">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-lg">wifi</span>
            </div>
            <div>
              <div class="text-xs font-bold text-ep-text">Connexion Internet Haut Débit</div>
              <div class="text-[10px] text-ep-muted">Débit mesuré : 45 Mbps (Latence 12ms)</div>
            </div>
          </div>
          <EpBadge variant="success" dot icon="check_circle">Vérifié</EpBadge>
        </div>

        <!-- Test 3 : Caméra / Flux Vidéo -->
        <div class="p-4 rounded-xl border flex items-center justify-between transition-colors bg-slate-50 border-ep-border">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-ep-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-lg">videocam</span>
            </div>
            <div>
              <div class="text-xs font-bold text-ep-text">Webcam & Flux Vidéo HD</div>
              <div class="text-[10px] text-ep-muted">Autorisation caméra accordée</div>
            </div>
          </div>
          <EpBadge variant="success" dot icon="check_circle">Vérifié</EpBadge>
        </div>

        <!-- Test 4 : Microphone -->
        <div class="p-4 rounded-xl border flex items-center justify-between transition-colors bg-slate-50 border-ep-border">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-lg">mic</span>
            </div>
            <div>
              <div class="text-xs font-bold text-ep-text">Capteur Microphonique</div>
              <div class="text-[10px] text-ep-muted">Niveau sonore ambiant conforme</div>
            </div>
          </div>
          <EpBadge variant="success" dot icon="check_circle">Vérifié</EpBadge>
        </div>
      </div>

      <!-- Consentement & Lancement -->
      <div class="pt-4 border-t border-ep-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs text-ep-muted">
          <span class="material-symbols-outlined text-emerald-600 text-base">verified</span>
          <span>Tous les systèmes sont opérationnels</span>
        </div>

        <EpButton variant="primary" size="lg" iconLeft="play_arrow" @click="$router.push('/epreuves/passage')">
          Lancer l'Épreuve Maintenant
        </EpButton>
      </div>

    </div>

  </div>
</template>

<script setup>
import EpButton from '../../composants/systeme/EpButton.vue';
import EpBadge from '../../composants/systeme/EpBadge.vue';
</script>
