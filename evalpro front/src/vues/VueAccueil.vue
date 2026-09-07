<template>
  <!--
    VueAccueil.vue - Landing Page SaaS EvalPro B2B
    100% Sécurisée : aucun accès direct aux tableaux de bord internes.
    Toutes les actions incitent l'utilisateur à faire une demande d'accès ou de démonstration entreprise.
  -->
  <div class="min-h-screen bg-slate-50 text-ep-text font-sans">

    <!-- Header Public -->
    <header class="bg-white border-b border-ep-border sticky top-0 z-30 shadow-ep-subtle">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <!-- Logo EvalPro -->
        <router-link to="/" class="flex items-center group">
          <img src="/logo.png" alt="EvalPro" class="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105" />
        </router-link>

        <!-- CTA Header : Demande d'accès uniquement (Aucun accès direct au dashboard) -->
        <div class="flex items-center gap-4">
          <EpButton variant="primary" size="sm" iconRight="arrow_forward" @click="afficherModalDemande = true">
            Demander un Accès Entreprise
          </EpButton>
        </div>

      </div>
    </header>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">

      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-ep-primary text-xs font-semibold mb-6">
        <span class="material-symbols-outlined text-sm">rocket_launch</span>
        <span>Plateforme B2B de Recrutement & Évaluation</span>
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ep-text leading-tight font-titre max-w-4xl mx-auto mb-6">
        Recrutez avec précision.
        <span class="text-ep-primary block mt-1">Sécurisez vos épreuves en ligne.</span>
      </h1>

      <p class="text-ep-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10">
        De la création de campagnes au classement final : organisez des examens sur-mesure,
        surveillez les passages sous proctoring anti-fraude et évaluez vos talents avec rigueur.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4">
        <EpButton variant="primary" size="lg" iconRight="assignment_ind" @click="afficherModalDemande = true">
          Demander une Démo Entreprise
        </EpButton>
        <EpButton variant="outline" size="lg" iconLeft="info" @click="afficherModalDemande = true">
          Solliciter un Compte d'Évaluation
        </EpButton>
      </div>

    </section>

    <!-- Section Métriques & Stats -->
    <section class="bg-white border-y border-ep-border py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-extrabold text-ep-text font-titre">10 000+</div>
            <div class="text-xs font-semibold text-ep-muted uppercase tracking-wider mt-1">Candidats Évalués</div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-extrabold text-ep-primary font-titre">6 Types</div>
            <div class="text-xs font-semibold text-ep-muted uppercase tracking-wider mt-1">Épreuves & Exercices</div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-extrabold text-emerald-600 font-titre">Niveau 3</div>
            <div class="text-xs font-semibold text-ep-muted uppercase tracking-wider mt-1">Sécurité & Proctoring</div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-extrabold text-amber-600 font-titre">99.9%</div>
            <div class="text-xs font-semibold text-ep-muted uppercase tracking-wider mt-1">Disponibilité SaaS</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Présentation des Fonctionnalités -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-ep-text font-titre">
          Une Solution Complète pour Vos Recrutements
        </h2>
        <p class="text-ep-muted text-xs sm:text-sm mt-2">
          Simplifiez l'évaluation des compétences et sécurisez vos concours RH.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Carte 1 -->
        <div class="bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-3">
          <div class="w-10 h-10 rounded-lg bg-blue-50 text-ep-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-xl">campaign</span>
          </div>
          <h3 class="text-base font-bold text-ep-text">Gestion des Campagnes</h3>
          <p class="text-xs text-ep-muted leading-relaxed">
            Créez des campagnes de recrutement ciblées, importez vos candidats et suivez les invitations en temps réel.
          </p>
        </div>

        <!-- Carte 2 -->
        <div class="bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-3">
          <div class="w-10 h-10 rounded-lg bg-purple-50 text-ep-secondary flex items-center justify-center">
            <span class="material-symbols-outlined text-xl">quiz</span>
          </div>
          <h3 class="text-base font-bold text-ep-text">Épreuves Sur-Mesure</h3>
          <p class="text-xs text-ep-muted leading-relaxed">
            QCM, questions ouvertes, code informatique et requêtes SQL avec barèmes personnalisables.
          </p>
        </div>

        <!-- Carte 3 -->
        <div class="bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-xl">shield</span>
          </div>
          <h3 class="text-base font-bold text-ep-text">Surveillance Proctoring</h3>
          <p class="text-xs text-ep-muted leading-relaxed">
            Détection des sorties de fenêtre, enregistrement webcam et journal d'intégrité anti-fraude.
          </p>
        </div>

      </div>

      <!-- Banner d'Appel à l'Action Inscription -->
      <div class="mt-16 bg-white border border-ep-border rounded-2xl p-8 sm:p-10 shadow-ep-lg text-center space-y-4 max-w-3xl mx-auto">
        <h3 class="text-xl sm:text-2xl font-extrabold text-ep-text font-titre">
          Prêt à transformer vos processus de sélection RH ?
        </h3>
        <p class="text-xs sm:text-sm text-ep-muted max-w-xl mx-auto leading-relaxed">
          Demandez un compte entreprise et obtenez un accès administrateur personnalisé pour évaluer vos talents dès aujourd'hui.
        </p>
        <div class="pt-2">
          <EpButton variant="primary" size="lg" iconLeft="mail" @click="afficherModalDemande = true">
            Demander une Inscription Entreprise
          </EpButton>
        </div>
      </div>

    </section>

    <!-- Modale de Demande d'Inscription / Démo -->
    <EpModal v-model="afficherModalDemande" title="Demande d'Inscription Entreprise" icon="business" size="md">
      <div v-if="demandeEnvoyee" class="text-center py-6 space-y-4">
        <div class="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <span class="material-symbols-outlined text-3xl">check_circle</span>
        </div>
        <h3 class="text-base font-bold text-ep-text">Demande Transmise avec Succès !</h3>
        <p class="text-xs text-ep-muted max-w-sm mx-auto leading-relaxed">
          Merci ! Votre demande d'accès entreprise a été enregistrée. Notre équipe administrateur prendra contact avec vous et vous transmettra votre identifiant par email sous 24h.
        </p>
        <EpButton variant="primary" size="sm" @click="afficherModalDemande = false">
          Fermer
        </EpButton>
      </div>

      <form v-else @submit.prevent="soumettreDemande" class="space-y-4">
        <EpInput v-model="formDemande.nomEntreprise" label="Nom de l'Entreprise" required placeholder="ex: TechCorp" iconLeft="domain" />
        <EpInput v-model="formDemande.nomResponsable" label="Nom du Responsable RH" required placeholder="ex: Samira Hadjab" iconLeft="person" />
        <EpInput v-model="formDemande.emailPro" type="email" label="Email Professionnel" required placeholder="nom@entreprise.com" iconLeft="mail" />
        <EpInput v-model="formDemande.telephone" type="tel" label="Numéro de Téléphone" placeholder="+213 550 00 00 00" iconLeft="phone" />

        <div class="pt-2 flex justify-end gap-3 border-t border-ep-border">
          <EpButton type="button" variant="outline" size="md" @click="afficherModalDemande = false">
            Annuler
          </EpButton>
          <EpButton type="submit" variant="primary" size="md" iconLeft="send">
            Envoyer la Demande d'Accès
          </EpButton>
        </div>
      </form>
    </EpModal>

    <!-- Footer -->
    <footer class="bg-white border-t border-ep-border py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-ep-muted">
        EvalPro SaaS — Plateforme B2B de Recrutement et d'Évaluation en Ligne
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import EpButton from '../composants/systeme/EpButton.vue';
import EpModal from '../composants/systeme/EpModal.vue';
import EpInput from '../composants/systeme/EpInput.vue';

const afficherModalDemande = ref(false);
const demandeEnvoyee = ref(false);

const formDemande = reactive({
  nomEntreprise: '',
  nomResponsable: '',
  emailPro: '',
  telephone: '',
});

function soumettreDemande() {
  demandeEnvoyee.value = true;
}
</script>
