<template>
  <div class="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans">

    <!-- HEADER -->
    <header
      class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur"
    >
      <div
        class="max-w-7xl mx-auto h-[72px] px-5 sm:px-8 lg:px-10 flex items-center justify-between"
      >

        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center shrink-0"
          aria-label="EvalPro"
        >
          <img
            src="/logo.png"
            alt="EvalPro"
            class="h-10 sm:h-11 w-auto object-contain"
          />
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8 ml-10">
          <a
            href="#fonctionnalites"
            class="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors"
          >
            Fonctionnalités
          </a>

          <a
            href="#securite"
            class="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors"
          >
            Sécurité
          </a>

          <a
            href="#fonctionnement"
            class="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors"
          >
            Fonctionnement
          </a>
        </nav>

        <!-- CTA -->
        <div class="flex items-center">
          <EpButton
            variant="primary"
            size="sm"
            @click="ouvrirDemande"
          >
            Demander une démonstration
          </EpButton>
        </div>
      </div>
    </header>


    <!-- HERO -->
    <main>

      <section class="relative overflow-hidden">

        <!-- Background discret -->
        <div
          class="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            class="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-blue-100/40 blur-3xl"
          ></div>

          <div
            class="absolute top-80 -left-60 w-[420px] h-[420px] rounded-full bg-slate-200/50 blur-3xl"
          ></div>
        </div>

        <div
          class="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20"
        >

          <div class="grid lg:grid-cols-[1fr_0.95fr] gap-12 lg:gap-16 items-center">

            <!-- Texte -->
            <div class="max-w-2xl">

              <div
                class="inline-flex items-center gap-2 text-sm font-medium text-blue-700 mb-6"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Évaluation et recrutement en ligne
              </div>

              <h1
                class="text-[36px] sm:text-5xl lg:text-[56px] leading-[1.08] tracking-[-0.035em] font-bold text-slate-950 font-titre"
              >
                Évaluez les bons profils.
                <span class="block text-blue-600 mt-1">
                  Prenez de meilleures décisions.
                </span>
              </h1>

              <p
                class="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl"
              >
                EvalPro centralise vos campagnes d’évaluation, vos épreuves
                et vos résultats dans un environnement conçu pour les
                équipes RH et les recruteurs.
              </p>

              <div class="mt-8 flex flex-col sm:flex-row gap-3">

                <EpButton
                  variant="primary"
                  size="lg"
                  @click="ouvrirDemande"
                >
                  Demander une démonstration
                </EpButton>

                <EpButton
                  variant="outline"
                  size="lg"
                  @click="scrollToFonctionnalites"
                >
                  Découvrir la plateforme
                </EpButton>

              </div>

              <div
                class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500"
              >
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-600">
                    check
                  </span>
                  Campagnes personnalisées
                </div>

                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-600">
                    check
                  </span>
                  Résultats centralisés
                </div>

                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-600">
                    check
                  </span>
                  Environnement sécurisé
                </div>
              </div>

            </div>


            <!-- MOCKUP DASHBOARD -->
            <div class="relative">

              <div
                class="absolute -inset-4 rounded-[28px] bg-blue-100/40 blur-2xl"
              ></div>

              <div
                class="relative rounded-2xl border border-slate-200 bg-white shadow-[0_25px_70px_-30px_rgba(15,23,42,0.35)] overflow-hidden"
              >

                <!-- Browser header -->
                <div
                  class="h-11 border-b border-slate-200 bg-slate-50 flex items-center px-4 gap-1.5"
                >
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>

                  <div
                    class="ml-4 h-6 flex-1 max-w-xs rounded-md bg-white border border-slate-200 px-3 flex items-center text-[10px] text-slate-400 truncate"
                  >
                    https://evalpro.app/campagnes/développeur-fullstack
                  </div>
                </div>


                <!-- Dashboard -->
                <div class="p-5 sm:p-6 space-y-5">

                  <div class="flex items-center justify-between">

                    <div>
                      <div class="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-1">
                        CAMPAGNE ACTIVE
                      </div>

                      <div class="font-bold text-slate-900 text-base font-titre">
                        Développeur Full Stack
                      </div>
                    </div>

                    <span
                      class="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold"
                    >
                      En cours
                    </span>

                  </div>


                  <!-- KPI -->
                  <div class="grid grid-cols-3 gap-3">

                    <div
                      class="rounded-xl border border-slate-200 p-3 bg-slate-50/50"
                    >
                      <div class="text-[11px] text-slate-500 font-medium">
                        Candidats
                      </div>

                      <div class="mt-1 text-xl font-bold text-slate-900 font-titre">
                        148
                      </div>
                    </div>

                    <div
                      class="rounded-xl border border-slate-200 p-3 bg-slate-50/50"
                    >
                      <div class="text-[11px] text-slate-500 font-medium">
                        Évalués
                      </div>

                      <div class="mt-1 text-xl font-bold text-slate-900 font-titre">
                        96
                      </div>
                    </div>

                    <div
                      class="rounded-xl border border-slate-200 p-3 bg-blue-50/30 border-blue-100"
                    >
                      <div class="text-[11px] text-blue-600 font-medium">
                        Score moyen
                      </div>

                      <div class="mt-1 text-xl font-bold text-blue-600 font-titre">
                        74%
                      </div>
                    </div>

                  </div>


                  <!-- Chart -->
                  <div
                    class="rounded-xl border border-slate-200 p-4 bg-white"
                  >

                    <div class="flex justify-between items-center mb-4">

                      <div>
                        <div class="text-xs font-bold text-slate-900">
                          Progression des évaluations
                        </div>

                        <div class="text-[11px] text-slate-400">
                          Sessions complétées cette semaine
                        </div>
                      </div>

                      <span
                        class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded"
                      >
                        +18.4%
                      </span>

                    </div>


                    <div class="flex items-end gap-2 h-24">

                      <div
                        v-for="(height, index) in chartBars"
                        :key="index"
                        class="flex-1 rounded-t bg-blue-500/80 hover:bg-blue-600 transition-colors"
                        :style="{ height: `${height}%` }"
                      ></div>

                    </div>

                  </div>


                  <!-- Candidate -->
                  <div
                    class="rounded-xl border border-slate-200 overflow-hidden bg-white"
                  >

                    <div
                      class="px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      Dernières évaluations soumises
                    </div>

                    <div class="divide-y divide-slate-100">

                      <div
                        v-for="candidate in candidates"
                        :key="candidate.name"
                        class="px-4 py-2.5 flex items-center justify-between"
                      >

                        <div class="flex items-center gap-3">

                          <div
                            class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs"
                          >
                            {{ candidate.initials }}
                          </div>

                          <div>
                            <div class="text-xs font-semibold text-slate-800">
                              {{ candidate.name }}
                            </div>

                            <div class="text-[10px] text-slate-400">
                              {{ candidate.status }}
                            </div>
                          </div>

                        </div>

                        <div
                          class="text-xs font-bold font-titre"
                          :class="candidate.score >= 70
                            ? 'text-emerald-600'
                            : 'text-slate-500'"
                        >
                          {{ candidate.score }}%
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      <!-- TRUST STRIP -->
      <section class="border-y border-slate-200 bg-white">

        <div
          class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-7"
        >

          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >

            <p class="text-sm font-semibold text-slate-600">
              Conçu pour les exigences des processus de sélection professionnels.
            </p>

            <div
              class="flex flex-wrap gap-x-8 gap-y-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              <span>Recrutement RH</span>
              <span>Concours d'entrée</span>
              <span>Évaluations techniques</span>
              <span>Certifications</span>
            </div>

          </div>

        </div>

      </section>


      <!-- FONCTIONNALITÉS -->
      <section
        id="fonctionnalites"
        class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 sm:py-24"
      >

        <div class="max-w-2xl mb-14">

          <div
            class="text-xs font-bold tracking-wider text-blue-600 uppercase mb-3"
          >
            FONCTIONNALITÉS CLÉS
          </div>

          <h2
            class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-titre"
          >
            Tout ce qu’il faut pour évaluer un candidat de façon fiable.
          </h2>

          <p
            class="mt-4 text-base leading-relaxed text-slate-600"
          >
            De la préparation de l’épreuve à l’analyse des résultats,
            EvalPro vous permet de gérer l’ensemble du processus depuis
            un seul espace.
          </p>

        </div>


        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div
            v-for="feature in features"
            :key="feature.title"
            class="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-200"
          >

            <div
              class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-5 group-hover:bg-blue-50 transition-colors"
            >
              <span
                class="material-symbols-outlined text-[22px] text-slate-600 group-hover:text-blue-600"
              >
                {{ feature.icon }}
              </span>
            </div>

            <h3
              class="text-base font-bold text-slate-900 font-titre"
            >
              {{ feature.title }}
            </h3>

            <p
              class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500"
            >
              {{ feature.description }}
            </p>

          </div>

        </div>

      </section>


      <!-- FONCTIONNEMENT -->
      <section
        id="fonctionnement"
        class="bg-white border-y border-slate-200 py-20 sm:py-24"
      >

        <div
          class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10"
        >

          <div class="max-w-2xl mb-14">

            <div
              class="text-xs font-bold tracking-wider text-blue-600 uppercase mb-3"
            >
              PROCESSUS DE SÉLECTION
            </div>

            <h2
              class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-titre"
            >
              Un workflow clair et structuré en 3 étapes.
            </h2>

          </div>


          <div class="grid md:grid-cols-3 gap-10">

            <div
              v-for="(step, index) in steps"
              :key="step.title"
              class="relative space-y-3"
            >

              <div
                class="text-5xl font-extrabold tracking-tight text-slate-200 font-titre"
              >
                0{{ index + 1 }}
              </div>

              <h3
                class="text-lg font-bold text-slate-900 font-titre"
              >
                {{ step.title }}
              </h3>

              <p
                class="text-sm leading-relaxed text-slate-500 max-w-sm"
              >
                {{ step.description }}
              </p>

            </div>

          </div>

        </div>

      </section>


      <!-- SECURITE -->
      <section
        id="securite"
        class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 sm:py-24"
      >

        <div
          class="rounded-3xl bg-slate-950 overflow-hidden shadow-2xl"
        >

          <div
            class="grid lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 lg:p-16"
          >

            <div>

              <div
                class="text-xs font-bold tracking-wider text-blue-400 uppercase mb-4"
              >
                SÉCURITÉ ET INTÉGRITÉ
              </div>

              <h2
                class="text-3xl sm:text-4xl font-bold tracking-tight text-white font-titre"
              >
                Des évaluations conçues pour préserver l’intégrité des résultats.
              </h2>

              <p
                class="mt-5 text-sm sm:text-base leading-relaxed text-slate-400 max-w-xl"
              >
                Contrôles de session, suivi des événements et mécanismes
                de surveillance permettent à vos équipes de disposer
                d’un environnement d’évaluation maîtrisé.
              </p>

            </div>


            <div class="grid sm:grid-cols-2 gap-4">

              <div
                v-for="security in securityFeatures"
                :key="security.title"
                class="rounded-xl border border-white/10 bg-white/[0.04] p-5"
              >

                <span
                  class="material-symbols-outlined text-blue-400 text-[24px]"
                >
                  {{ security.icon }}
                </span>

                <h3
                  class="mt-4 text-sm font-bold text-white font-titre"
                >
                  {{ security.title }}
                </h3>

                <p
                  class="mt-2 text-xs leading-relaxed text-slate-400"
                >
                  {{ security.description }}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      <!-- CTA FINAL -->
      <section class="px-5 sm:px-8 lg:px-10 pb-20 sm:pb-24">

        <div
          class="max-w-4xl mx-auto text-center bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-lg"
        >

          <h2
            class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-titre"
          >
            Découvrez EvalPro en action
          </h2>

          <p
            class="mt-4 text-base leading-relaxed text-slate-600 max-w-xl mx-auto"
          >
            Échangez avec notre équipe et découvrez comment la plateforme
            peut s’intégrer à votre processus d'évaluation et de recrutement.
          </p>

          <div class="mt-8 flex justify-center">
            <EpButton
              variant="primary"
              size="lg"
              @click="ouvrirDemande"
            >
              Demander une démonstration
            </EpButton>
          </div>

        </div>

      </section>

    </main>


    <!-- MODALE -->
    <EpModal
      v-model="afficherModalDemande"
      title="Demander une démonstration"
      icon="business"
      size="md"
    >

      <!-- Succès -->
      <div
        v-if="demandeEnvoyee"
        class="text-center py-8 space-y-4"
      >

        <div
          class="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto"
        >
          <span class="material-symbols-outlined text-3xl">
            check_circle
          </span>
        </div>

        <h3
          class="text-lg font-bold text-slate-900 font-titre"
        >
          Demande enregistrée
        </h3>

        <p
          class="text-sm leading-relaxed text-slate-500 max-w-sm mx-auto"
        >
          Merci ! Notre équipe administrateur traitera votre demande
          et vous recontactera sous 24h.
        </p>

        <div class="pt-4">
          <EpButton
            variant="primary"
            size="sm"
            @click="fermerModal"
          >
            Fermer
          </EpButton>
        </div>

      </div>


      <!-- Formulaire -->
      <form
        v-else
        @submit.prevent="soumettreDemande"
        class="space-y-4"
      >

        <div
          class="pb-3 border-b border-slate-200"
        >
          <p class="text-xs text-slate-500 leading-relaxed">
            Renseignez vos coordonnées professionnelles pour recevoir une présentation personnalisée d'EvalPro.
          </p>
        </div>

        <EpInput
          v-model="formDemande.nomEntreprise"
          label="Entreprise"
          required
          placeholder="Nom de votre entreprise"
          iconLeft="domain"
        />

        <EpInput
          v-model="formDemande.nomResponsable"
          label="Nom et prénom"
          required
          placeholder="Votre nom"
          iconLeft="person"
        />

        <EpInput
          v-model="formDemande.emailPro"
          type="email"
          label="Adresse email professionnelle"
          required
          placeholder="vous@entreprise.com"
          iconLeft="mail"
        />

        <EpInput
          v-model="formDemande.telephone"
          type="tel"
          label="Téléphone"
          placeholder="+229 ..."
          iconLeft="phone"
        />

        <div
          class="pt-4 border-t border-slate-200 flex justify-end gap-3"
        >

          <EpButton
            type="button"
            variant="outline"
            size="md"
            @click="afficherModalDemande = false"
          >
            Annuler
          </EpButton>

          <EpButton
            type="submit"
            variant="primary"
            size="md"
          >
            Envoyer la demande
          </EpButton>

        </div>

      </form>

    </EpModal>


    <!-- FOOTER -->
    <footer class="border-t border-slate-200 bg-white">

      <div
        class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10"
      >

        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >

          <div>

            <img
              src="/logo.png"
              alt="EvalPro"
              class="h-9 w-auto object-contain"
            />

            <p
              class="mt-2 text-xs text-slate-500"
            >
              Plateforme d’évaluation et de recrutement en ligne.
            </p>

          </div>


          <div
            class="flex flex-wrap gap-6 text-xs font-semibold text-slate-600"
          >

            <a
              href="#fonctionnalites"
              class="hover:text-slate-950 transition-colors"
            >
              Fonctionnalités
            </a>

            <a
              href="#securite"
              class="hover:text-slate-950 transition-colors"
            >
              Sécurité
            </a>

            <a
              href="#fonctionnement"
              class="hover:text-slate-950 transition-colors"
            >
              Fonctionnement
            </a>

            <button
              type="button"
              @click="ouvrirDemande"
              class="hover:text-slate-950 transition-colors"
            >
              Contact
            </button>

          </div>

        </div>


        <div
          class="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span>© {{ currentYear }} EvalPro. Tous droits réservés.</span>
          <span>Version Professionnelle</span>
        </div>

      </div>

    </footer>

  </div>
</template>


<script setup>
import { ref, reactive, computed } from 'vue';

import EpButton from '../composants/systeme/EpButton.vue';
import EpModal from '../composants/systeme/EpModal.vue';
import EpInput from '../composants/systeme/EpInput.vue';

const currentYear = computed(() => new Date().getFullYear());

/*
|--------------------------------------------------------------------------
| Modal
|--------------------------------------------------------------------------
*/

const afficherModalDemande = ref(false);
const demandeEnvoyee = ref(false);

const formDemande = reactive({
  nomEntreprise: '',
  nomResponsable: '',
  emailPro: '',
  telephone: '',
});


function ouvrirDemande() {
  demandeEnvoyee.value = false;
  afficherModalDemande.value = true;
}


function fermerModal() {
  afficherModalDemande.value = false;

  setTimeout(() => {
    demandeEnvoyee.value = false;
  }, 300);
}


function soumettreDemande() {
  demandeEnvoyee.value = true;
}


/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

function scrollToFonctionnalites() {
  document
    .getElementById('fonctionnalites')
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
}


/*
|--------------------------------------------------------------------------
| Fonctionnalités
|--------------------------------------------------------------------------
*/

const features = [
  {
    icon: 'campaign',
    title: 'Campagnes de recrutement',
    description:
      'Créez vos campagnes, gérez les candidats et suivez l’avancement de chaque session depuis un espace centralisé.',
  },
  {
    icon: 'quiz',
    title: 'Épreuves personnalisées',
    description:
      'Construisez des évaluations adaptées à vos besoins : QCM, questions ouvertes, logique, technique, code et SQL.',
  },
  {
    icon: 'bar_chart',
    title: 'Analyse des résultats',
    description:
      'Comparez les performances, identifiez les meilleurs profils et disposez de résultats structurés pour vos décisions.',
  },
  {
    icon: 'group',
    title: 'Gestion des candidats',
    description:
      'Importez, invitez et organisez vos candidats facilement tout au long du processus de sélection.',
  },
  {
    icon: 'schedule',
    title: 'Sessions maîtrisées',
    description:
      'Définissez les périodes d’accès, les durées d’épreuve et les règles applicables à chaque évaluation.',
  },
  {
    icon: 'dashboard',
    title: 'Tableau de bord RH',
    description:
      'Retrouvez les indicateurs essentiels de vos campagnes dans une interface claire et directement exploitable.',
  },
];


/*
|--------------------------------------------------------------------------
| Fonctionnement en 3 étapes
|--------------------------------------------------------------------------
*/

const steps = [
  {
    title: 'Création & Épreuves',
    description:
      'Configurez vos campagnes de recrutement et préparez vos banques d’épreuves sur-mesure.',
  },
  {
    title: 'Passage Sécurisé',
    description:
      'Invitez les candidats à composer dans un environnement minuté et contrôlé.',
  },
  {
    title: 'Analyse & Décision',
    description:
      'Accédez aux résultats centralisés, classements automatiques et grilles de correction.',
  },
];


/*
|--------------------------------------------------------------------------
| Sécurité
|--------------------------------------------------------------------------
*/

const securityFeatures = [
  {
    icon: 'visibility_off',
    title: 'Contrôle de session',
    description:
      'Surveillez les événements importants pendant une évaluation.',
  },
  {
    icon: 'web_asset_off',
    title: 'Détection des sorties',
    description:
      'Identifiez les changements de fenêtre et comportements inhabituels.',
  },
  {
    icon: 'videocam',
    title: 'Proctoring',
    description:
      'Possibilité d’intégrer des mécanismes de surveillance adaptés.',
  },
  {
    icon: 'history',
    title: 'Journal d’activité',
    description:
      'Conservez une trace des événements liés à chaque session.',
  },
];


/*
|--------------------------------------------------------------------------
| Dashboard mockup
|--------------------------------------------------------------------------
*/

const chartBars = [
  35,
  48,
  42,
  67,
  58,
  78,
  70,
  92,
  76,
  86,
  68,
  96,
];


const candidates = [
  {
    initials: 'AM',
    name: 'A. Mensah',
    status: 'Évaluation terminée',
    score: 91,
  },
  {
    initials: 'SK',
    name: 'S. Koffi',
    status: 'Évaluation terminée',
    score: 84,
  },
  {
    initials: 'YD',
    name: 'Y. Dossou',
    status: 'En cours',
    score: 67,
  },
];
</script>
