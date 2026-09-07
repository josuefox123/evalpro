<template>
  <div class="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans overflow-x-hidden">

    <!-- =========================================================
         HEADER RESPONSIVE FIXE AVEC DÉFILEMENT TRANSPARENT / OPAQUE
    ========================================================== -->
    <header
      class="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      :class="estDefile ? 'bg-white/95 border-slate-200/80 shadow-sm backdrop-blur-md py-0' : 'bg-transparent border-transparent shadow-none backdrop-blur-sm py-1'"
    >
      <div
        class="max-w-7xl mx-auto h-16 sm:h-[72px] px-4 sm:px-6 lg:px-10 flex items-center justify-between"
      >

        <!-- LOGO BIEN EN ÉVIDENCE -->
        <router-link
          to="/"
          class="flex items-center gap-2 shrink-0 group transition-transform duration-200 hover:scale-105"
          aria-label="EvalPro"
        >
          <img
            src="/logo.png"
            alt="EvalPro Logo"
            class="h-9 sm:h-11 w-auto object-contain drop-shadow-sm"
          />
          <span class="sr-only">EvalPro</span>
        </router-link>


        <!-- NAV DESKTOP AVEC OFFSET SCROLL SMOOTH -->
        <nav class="hidden md:flex items-center gap-7 lg:gap-9 ml-auto mr-8">

          <a
            href="#fonctionnalites"
            @click.prevent="scrollToSection('fonctionnalites')"
            class="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Fonctionnalités
          </a>

          <a
            href="#securite"
            @click.prevent="scrollToSection('securite')"
            class="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Sécurité
          </a>

          <a
            href="#fonctionnement"
            @click.prevent="scrollToSection('fonctionnement')"
            class="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Fonctionnement
          </a>

        </nav>


        <!-- CTA -->
        <EpButton
          variant="primary"
          size="sm"
          @click="ouvrirDemande"
          class="shrink-0 font-semibold"
        >
          <span class="hidden sm:inline">
            Demander une démonstration
          </span>

          <span class="sm:hidden">
            Démonstration
          </span>
        </EpButton>

      </div>
    </header>


    <!-- =========================================================
         MAIN
    ========================================================== -->
    <main>


      <!-- =======================================================
           HERO
      ======================================================== -->
      <section class="relative overflow-hidden">

        <!-- Background -->
        <div
          class="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            class="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-[300px] sm:w-[520px] h-[300px] sm:h-[520px] rounded-full bg-blue-100/40 blur-3xl"
          ></div>

          <div
            class="absolute top-[450px] sm:top-80 -left-40 sm:-left-60 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-slate-200/40 blur-3xl"
          ></div>
        </div>


        <div
          class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-20"
        >

          <div
            class="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center"
          >

            <!-- =================================================
                 HERO TEXT
            ================================================== -->
            <div class="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">

              <div
                class="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-700 mb-4 sm:mb-6 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"
                ></span>

                Évaluation et recrutement en ligne
              </div>


              <h1
                class="text-[34px] leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[56px] font-bold text-slate-950 font-titre"
              >
                Évaluez les bons profils.

                <span class="block text-blue-600 mt-1">
                  Prenez de meilleures décisions.
                </span>
              </h1>


              <p
                class="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 max-w-xl mx-auto lg:mx-0"
              >
                EvalPro centralise vos campagnes d’évaluation,
                vos épreuves et vos résultats dans un environnement
                conçu pour les équipes RH et les recruteurs.
              </p>


              <!-- BUTTONS -->
              <div
                class="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
              >

                <EpButton
                  variant="primary"
                  size="lg"
                  @click="ouvrirDemande"
                  class="w-full sm:w-auto"
                >
                  Demander une démonstration
                </EpButton>


                <EpButton
                  variant="outline"
                  size="lg"
                  @click="scrollToFonctionnalites"
                  class="w-full sm:w-auto"
                >
                  Découvrir la plateforme
                </EpButton>

              </div>


              <!-- BENEFITS -->
              <div
                class="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-5 lg:gap-6 text-xs sm:text-sm text-slate-500"
              >

                <div class="flex items-center gap-2">
                  <span
                    class="material-symbols-outlined text-[17px] text-emerald-600"
                  >
                    check
                  </span>

                  Campagnes personnalisées
                </div>


                <div class="flex items-center gap-2">
                  <span
                    class="material-symbols-outlined text-[17px] text-emerald-600"
                  >
                    check
                  </span>

                  Résultats centralisés
                </div>


                <div class="flex items-center gap-2">
                  <span
                    class="material-symbols-outlined text-[17px] text-emerald-600"
                  >
                    check
                  </span>

                  Environnement sécurisé
                </div>

              </div>

            </div>


            <!-- =================================================
                 REALISTIC EVALPRO DASHBOARD MOCKUP WITH PRO ANIMATIONS
            ================================================== -->
            <div class="relative w-full max-w-[680px] mx-auto lg:max-w-none group">

              <!-- Ambient Breathing Glow -->
              <div
                class="absolute -inset-3 sm:-inset-5 rounded-[28px] bg-gradient-to-r from-blue-400/30 via-indigo-300/30 to-purple-400/30 blur-2xl animate-ep-glow"
              ></div>


              <!-- Mockup Container with Floating Motion and Elevate Hover -->
              <div
                class="relative rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.30)] overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_80px_-20px_rgba(37,99,235,0.25)] animate-ep-float"
              >

                <!-- Browser bar -->
                <div
                  class="h-9 sm:h-10 border-b border-slate-200 bg-slate-100/90 flex items-center px-3 sm:px-4 justify-between"
                >
                  <div class="flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-rose-400/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                  </div>

                  <div
                    class="h-5 sm:h-6 px-3 rounded-md bg-white border border-slate-200/80 flex items-center gap-1.5 text-[10px] text-slate-400 font-mono truncate max-w-[240px] sm:max-w-[320px] shadow-inner"
                  >
                    <span class="material-symbols-outlined text-[12px] text-slate-400">lock</span>
                    <span class="truncate">https://evalpro.app/admin/dashboard</span>
                  </div>

                  <div class="w-10"></div>
                </div>


                <!-- Dashboard Layout: Mini Sidebar + Main App Content -->
                <div class="grid grid-cols-[56px_1fr] sm:grid-cols-[140px_1fr] min-h-[360px] bg-slate-50/50">

                  <!-- Mini Sidebar -->
                  <div class="bg-slate-900 text-white p-2 sm:p-3 flex flex-col justify-between border-r border-slate-800">
                    <div class="space-y-4">
                      <!-- Logo Mini -->
                      <div class="flex items-center gap-2 px-1">
                        <div class="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 font-titre shadow-sm">
                          EP
                        </div>
                        <span class="hidden sm:inline text-xs font-bold font-titre tracking-wider text-slate-100">
                          EvalPro
                        </span>
                      </div>

                      <!-- Nav Items -->
                      <div class="space-y-1">
                        <div class="flex items-center gap-2 px-2 py-1.5 rounded-md bg-blue-600 text-white text-[10px] sm:text-xs font-medium cursor-default shadow-sm transition-transform hover:scale-[1.02]">
                          <span class="material-symbols-outlined text-[16px]">dashboard</span>
                          <span class="hidden sm:inline">Tableau</span>
                        </div>
                        <div class="flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 text-[10px] sm:text-xs font-medium cursor-default transition-colors">
                          <span class="material-symbols-outlined text-[16px]">campaign</span>
                          <span class="hidden sm:inline">Campagnes</span>
                        </div>
                        <div class="flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 text-[10px] sm:text-xs font-medium cursor-default transition-colors">
                          <span class="material-symbols-outlined text-[16px]">quiz</span>
                          <span class="hidden sm:inline">Épreuves</span>
                        </div>
                        <div class="flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 text-[10px] sm:text-xs font-medium cursor-default transition-colors">
                          <span class="material-symbols-outlined text-[16px]">group</span>
                          <span class="hidden sm:inline">Candidats</span>
                        </div>
                      </div>
                    </div>

                    <!-- User Profile Mini -->
                    <div class="flex items-center gap-2 p-1 pt-2 border-t border-slate-800">
                      <div class="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-blue-300">
                        RH
                      </div>
                      <span class="hidden sm:inline text-[10px] text-slate-300 font-medium truncate">
                        Admin HR
                      </span>
                    </div>
                  </div>

                  <!-- Main App Panel -->
                  <div class="p-3 sm:p-5 overflow-hidden space-y-4 bg-white">

                    <!-- Header dashboard -->
                    <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <div class="text-[9px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Espace Recrutement RH
                        </div>
                        <div class="text-xs sm:text-base font-bold text-slate-900 font-titre">
                          Développeur Full Stack
                        </div>
                      </div>

                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[9px] sm:text-xs font-semibold border border-emerald-200/60 shadow-xs">
                        <span class="relative flex h-2 w-2">
                          <span class="animate-ep-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>Active</span>
                      </span>
                    </div>

                    <!-- KPI Grid -->
                    <div class="grid grid-cols-3 gap-2">
                      <div class="rounded-lg border border-slate-200 p-2 sm:p-2.5 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xs">
                        <div class="text-[8px] sm:text-[10px] font-medium text-slate-500">Candidats</div>
                        <div class="mt-0.5 text-sm sm:text-lg font-bold text-slate-900 font-titre">148</div>
                      </div>

                      <div class="rounded-lg border border-slate-200 p-2 sm:p-2.5 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xs">
                        <div class="text-[8px] sm:text-[10px] font-medium text-slate-500">Évalués</div>
                        <div class="mt-0.5 text-sm sm:text-lg font-bold text-slate-900 font-titre">96</div>
                      </div>

                      <div class="rounded-lg border border-blue-100 p-2 sm:p-2.5 bg-blue-50/30 transition-all hover:bg-blue-50/60">
                        <div class="text-[8px] sm:text-[10px] font-medium text-blue-600">Score Moyen</div>
                        <div class="mt-0.5 text-sm sm:text-lg font-bold text-blue-600 font-titre">74%</div>
                      </div>
                    </div>

                    <!-- Chart Mini -->
                    <div class="rounded-lg border border-slate-200 p-2.5 bg-slate-50/30">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-[10px] sm:text-xs font-semibold text-slate-800">Progression des évaluations</span>
                        <span class="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+18.4%</span>
                      </div>
                      <div class="flex items-end gap-1 sm:gap-1.5 h-16 sm:h-20 pt-2">
                        <div v-for="(height, index) in chartBars" :key="index" class="flex-1 rounded-t bg-blue-500/80 hover:bg-blue-600 transition-all duration-300 hover:scale-y-110 origin-bottom" :style="{ height: `${height}%` }"></div>
                      </div>
                    </div>

                    <!-- Candidates List -->
                    <div class="rounded-lg border border-slate-200 overflow-hidden text-[10px] sm:text-xs">
                      <div class="px-3 py-1.5 bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 text-[9px] uppercase tracking-wider">
                        Évaluations récentes
                      </div>
                      <div class="divide-y divide-slate-100 bg-white">
                        <div v-for="c in candidates" :key="c.name" class="px-3 py-1.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                          <div class="flex items-center gap-2 min-w-0">
                            <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[9px]">
                              {{ c.initials }}
                            </div>
                            <span class="font-medium text-slate-800 truncate">{{ c.name }}</span>
                          </div>
                          <span class="font-bold" :class="c.score >= 70 ? 'text-emerald-600' : 'text-slate-500'">{{ c.score }}%</span>
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


      <!-- =======================================================
           TRUST STRIP
      ======================================================== -->
      <section class="border-y border-slate-200 bg-white">

        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8"
        >

          <div
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5"
          >

            <p
              class="text-xs sm:text-sm font-medium text-slate-500 text-center lg:text-left"
            >
              Une plateforme pensée pour les processus de sélection exigeants.
            </p>


            <div
              class="flex flex-wrap justify-center lg:justify-end gap-x-5 sm:gap-x-8 gap-y-2 text-xs sm:text-sm text-slate-400 font-medium"
            >

              <span>Recrutement</span>
              <span>Concours</span>
              <span>Évaluations techniques</span>
              <span>Formations</span>

            </div>

          </div>

        </div>

      </section>


      <!-- =======================================================
           FONCTIONNALITÉS
      ======================================================== -->
      <section
        id="fonctionnalites"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24"
      >

        <div
          class="max-w-2xl mb-10 sm:mb-14"
        >

          <div
            class="text-xs sm:text-sm font-semibold text-blue-600 mb-2 sm:mb-3"
          >
            LA PLATEFORME
          </div>


          <h2
            class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-titre"
          >
            Tout ce qu’il faut pour évaluer un candidat de façon fiable.
          </h2>


          <p
            class="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600"
          >
            De la préparation de l’épreuve à l’analyse des résultats,
            EvalPro vous permet de gérer l’ensemble du processus depuis
            un seul espace.
          </p>

        </div>


        <!-- FEATURES -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >

          <div
            v-for="feature in features"
            :key="feature.title"
            class="group bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-200"
          >

            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-blue-50 transition-colors"
            >

              <span
                class="material-symbols-outlined text-[19px] sm:text-[21px] text-slate-600 group-hover:text-blue-600"
              >
                {{ feature.icon }}
              </span>

            </div>


            <h3
              class="text-sm sm:text-base font-semibold text-slate-900 font-titre"
            >
              {{ feature.title }}
            </h3>


            <p
              class="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-500"
            >
              {{ feature.description }}
            </p>

          </div>

        </div>

      </section>


      <!-- =======================================================
           FONCTIONNEMENT
      ======================================================== -->
      <section
        id="fonctionnement"
        class="bg-white border-y border-slate-200"
      >

        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24"
        >

          <div
            class="max-w-2xl mb-10 sm:mb-14"
          >

            <div
              class="text-xs sm:text-sm font-semibold text-blue-600 mb-2 sm:mb-3"
            >
              COMMENT ÇA MARCHE
            </div>


            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-titre"
            >
              Un processus simple pour vos équipes.
            </h2>

          </div>


          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
          >

            <div
              v-for="(step, index) in steps"
              :key="step.title"
              class="relative"
            >

              <div
                class="text-4xl sm:text-5xl font-bold tracking-tight text-slate-200 font-titre"
              >
                0{{ index + 1 }}
              </div>


              <h3
                class="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-slate-900 font-titre"
              >
                {{ step.title }}
              </h3>


              <p
                class="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-500 max-w-sm"
              >
                {{ step.description }}
              </p>

            </div>

          </div>

        </div>

      </section>


      <!-- =======================================================
           SECURITE
      ======================================================== -->
      <section
        id="securite"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24"
      >

        <div
          class="rounded-2xl sm:rounded-3xl bg-slate-950 overflow-hidden"
        >

          <div
            class="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center p-6 sm:p-10 lg:p-16"
          >

            <!-- TEXT -->
            <div>

              <div
                class="text-xs sm:text-sm font-semibold text-blue-400 mb-3 sm:mb-4"
              >
                SÉCURITÉ ET INTÉGRITÉ
              </div>


              <h2
                class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-titre"
              >
                Des évaluations conçues pour préserver l’intégrité des résultats.
              </h2>


              <p
                class="mt-4 sm:mt-5 text-sm sm:text-base leading-6 sm:leading-7 text-slate-400 max-w-xl"
              >
                Contrôles de session, suivi des événements et mécanismes
                de surveillance permettent à vos équipes de disposer
                d’un environnement d’évaluation maîtrisé.
              </p>

            </div>


            <!-- SECURITY CARDS -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >

              <div
                v-for="security in securityFeatures"
                :key="security.title"
                class="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
              >

                <span
                  class="material-symbols-outlined text-blue-400 text-[21px]"
                >
                  {{ security.icon }}
                </span>


                <h3
                  class="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-white font-titre"
                >
                  {{ security.title }}
                </h3>


                <p
                  class="mt-2 text-[11px] sm:text-xs leading-5 text-slate-400"
                >
                  {{ security.description }}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      <!-- =======================================================
           FINAL CTA
      ======================================================== -->
      <section
        class="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-24"
      >

        <div
          class="max-w-5xl mx-auto text-center"
        >

          <h2
            class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-titre"
          >
            Voyez EvalPro en action.
          </h2>


          <p
            class="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600 max-w-xl mx-auto"
          >
            Échangez avec notre équipe et découvrez comment la plateforme
            peut s’intégrer à votre processus de recrutement.
          </p>


          <div class="mt-6 sm:mt-8">

            <EpButton
              variant="primary"
              size="lg"
              @click="ouvrirDemande"
              class="w-full sm:w-auto"
            >
              Demander une démonstration
            </EpButton>

          </div>

        </div>

      </section>

    </main>


    <!-- =========================================================
         MODAL
    ========================================================== -->
    <EpModal
      v-model="afficherModalDemande"
      title="Demander une démonstration"
      icon="business"
      size="md"
    >

      <!-- SUCCESS -->
      <div
        v-if="demandeEnvoyee"
        class="text-center py-6 sm:py-8 px-2"
      >

        <div
          class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto"
        >
          <span class="material-symbols-outlined text-2xl">
            check
          </span>
        </div>


        <h3
          class="mt-4 sm:mt-5 text-base sm:text-lg font-semibold text-slate-900 font-titre"
        >
          Demande envoyée
        </h3>


        <p
          class="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-500 max-w-sm mx-auto"
        >
          Merci. Notre équipe reviendra vers vous prochainement
          afin de convenir d’un rendez-vous.
        </p>


        <div class="mt-5 sm:mt-6">

          <EpButton
            variant="primary"
            size="sm"
            @click="fermerModal"
          >
            Fermer
          </EpButton>

        </div>

      </div>


      <!-- FORM -->
      <form
        v-else
        @submit.prevent="soumettreDemande"
        class="space-y-4 sm:space-y-5"
      >

        <div
          class="pb-3 sm:pb-4 border-b border-slate-200"
        >

          <p
            class="text-xs sm:text-sm text-slate-500 leading-5 sm:leading-6"
          >
            Quelques informations suffisent pour nous permettre
            de comprendre votre besoin.
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
          class="pt-4 sm:pt-5 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3"
        >

          <EpButton
            type="button"
            variant="outline"
            size="md"
            @click="afficherModalDemande = false"
            class="w-full sm:w-auto"
          >
            Annuler
          </EpButton>


          <EpButton
            type="submit"
            variant="primary"
            size="md"
            class="w-full sm:w-auto"
          >
            Envoyer la demande
          </EpButton>

        </div>

      </form>

    </EpModal>


    <!-- =========================================================
         FOOTER
    ========================================================== -->
    <footer
      class="border-t border-slate-200 bg-white"
    >

      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10"
      >

        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >

          <!-- BRAND -->
          <div class="text-center md:text-left">

            <img
              src="/logo.png"
              alt="EvalPro"
              class="h-8 sm:h-9 w-auto object-contain mx-auto md:mx-0"
            />


            <p
              class="mt-2 sm:mt-3 text-[11px] sm:text-xs text-slate-400"
            >
              Plateforme d’évaluation et de recrutement en ligne.
            </p>

          </div>


          <!-- LINKS -->
          <div
            class="flex flex-wrap justify-center md:justify-end gap-x-5 sm:gap-x-6 gap-y-3 text-xs text-slate-500"
          >

            <a
              href="#fonctionnalites"
              class="hover:text-slate-900 transition-colors"
            >
              Fonctionnalités
            </a>


            <a
              href="#securite"
              class="hover:text-slate-900 transition-colors"
            >
              Sécurité
            </a>


            <button
              type="button"
              @click="ouvrirDemande"
              class="hover:text-slate-900 transition-colors"
            >
              Contact
            </button>

          </div>

        </div>


        <div
          class="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 text-[10px] sm:text-xs text-slate-400 text-center md:text-left"
        >
          © {{ new Date().getFullYear() }} EvalPro. Tous droits réservés.
        </div>

      </div>

    </footer>

  </div>
</template>


<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

import EpButton from '../composants/systeme/EpButton.vue';
import EpModal from '../composants/systeme/EpModal.vue';
import EpInput from '../composants/systeme/EpInput.vue';

/* =========================================================
   HEADER STICKY TRANSPARENT / OPAQUE STATE
========================================================= */
const estDefile = ref(false);

function gererDefilement() {
  estDefile.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener('scroll', gererDefilement, { passive: true });
  gererDefilement();
});

onUnmounted(() => {
  window.removeEventListener('scroll', gererDefilement);
});

/* =========================================================
   MODAL
========================================================= */

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


/* =========================================================
   NAVIGATION FLUIDE AVEC DÉCALAGE HEADER
========================================================= */

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function scrollToFonctionnalites() {
  scrollToSection('fonctionnalites');
}


/* =========================================================
   FEATURES
========================================================= */

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


/* =========================================================
   STEPS
========================================================= */

const steps = [
  {
    title: 'Créez votre campagne',
    description:
      'Configurez votre campagne, définissez les épreuves et ajoutez les candidats.',
  },
  {
    title: 'Lancez les évaluations',
    description:
      'Les candidats reçoivent leur accès et réalisent leurs évaluations dans un environnement contrôlé.',
  },
  {
    title: 'Analysez les résultats',
    description:
      'Comparez les performances et identifiez rapidement les profils correspondant à vos critères.',
  },
];


/* =========================================================
   SECURITY
========================================================= */

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


/* =========================================================
   DASHBOARD MOCKUP
========================================================= */

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
