<template>
  <!--
    TableauDeBordConsultant.vue - Espace Consultant / Évaluateur Pédagogique B2B
  -->
  <div class="space-y-8 font-sans">

    <!-- En-tête de page -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-ep-border shadow-ep-card">
      <div>
        <div class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2">
          <span class="material-symbols-outlined text-xs">edit_note</span>
          <span>Espace Pédagogique — {{ magasinAuth.utilisateurConnecte?.nom || 'Consultant' }}</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">Tableau de Bord Consultant & Évaluateur</h1>
        <p class="text-xs text-ep-muted mt-1">Conception des banques de questions, création des épreuves et correction manuelle des copies.</p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <EpButton variant="outline" size="sm" iconLeft="menu_book" @click="$router.push('/banque-questions')">
          Banque de Questions
        </EpButton>
        <EpButton variant="primary" size="sm" iconLeft="note_add" @click="$router.push('/epreuves/creation')">
          Concevoir une Épreuve
        </EpButton>
      </div>
    </div>

    <!-- Métriques Clés Évaluateur -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique
        titre="Questions en Banque"
        valeur="142"
        icone="menu_book"
        tendance="+12 ce mois"
        :tendancePositive="true"
        couleurFondIcone="bg-blue-50 text-ep-primary"
      />

      <CarteStatistique
        titre="Copies à Corriger"
        valeur="8"
        icone="rule"
        tendance="Priorité Haute"
        :tendancePositive="false"
        couleurFondIcone="bg-amber-50 text-amber-600"
      />

      <CarteStatistique
        titre="Épreuves Conçues"
        valeur="19"
        icone="quiz"
        tendance="4 modèles actifs"
        :tendancePositive="true"
        couleurFondIcone="bg-purple-50 text-ep-secondary"
      />

      <CarteStatistique
        titre="Temps Moyen Correction"
        valeur="11.5 min"
        icone="schedule"
        tendance="Optimal"
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-50 text-emerald-600"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Colonne Gauche (2 cols) : Queue des Copies à Corriger -->
      <div class="lg:col-span-2 bg-white border border-ep-border rounded-2xl p-6 shadow-ep-card space-y-5">
        <div class="flex items-center justify-between border-b border-ep-border pb-4">
          <div>
            <h3 class="text-base font-bold text-ep-text flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-500">fact_check</span>
              <span>Copies en Attente d'Évaluation Manuelle</span>
            </h3>
            <p class="text-xs text-ep-muted mt-0.5">Notation des questions à développement et révision du code informatique</p>
          </div>

          <router-link to="/correction" class="text-xs font-semibold text-ep-primary hover:underline flex items-center gap-1">
            <span>Accéder au module de correction</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </router-link>
        </div>

        <div class="space-y-3">
          <div
            v-for="candidat in candidatsAcorriger"
            :key="candidat.id"
            class="bg-slate-50 border border-ep-border hover:border-slate-300 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-xs text-ep-primary">
                {{ candidat.prenom[0] }}{{ candidat.nom[0] }}
              </div>
              <div>
                <div class="text-sm font-bold text-ep-text">{{ candidat.prenom }} {{ candidat.nom }}</div>
                <div class="text-xs text-ep-muted">{{ candidat.poste }} • Soumis le 14 Jan 2025</div>
              </div>
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-semibold">
                Évaluation Manuelle
              </span>

              <EpButton variant="primary" size="sm" iconLeft="edit" @click="$router.push('/correction')">
                Noter la Copie
              </EpButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne Droite (1 col) : Banque de questions & Répartition par niveau -->
      <div class="space-y-6">

        <div class="bg-white border border-ep-border rounded-2xl p-5 shadow-ep-card space-y-4">
          <h3 class="text-sm font-bold text-ep-text flex items-center gap-2 border-b border-ep-border pb-3">
            <span class="material-symbols-outlined text-ep-primary text-lg">pie_chart</span>
            <span>Répartition Banque de Questions</span>
          </h3>

          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between text-ep-muted mb-1">
                <span>JavaScript & Frameworks (Vue.js / Node)</span>
                <span class="font-bold text-ep-text">54 q.</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div class="h-full bg-ep-primary rounded-full" style="width: 45%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-ep-muted mb-1">
                <span>Bases de Données (PostgreSQL / SQL)</span>
                <span class="font-bold text-ep-text">38 q.</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div class="h-full bg-purple-600 rounded-full" style="width: 32%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-ep-muted mb-1">
                <span>DevOps, Docker & CI/CD</span>
                <span class="font-bold text-ep-text">28 q.</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 23%"></div>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-ep-border">
            <EpButton variant="outline" size="sm" iconLeft="add" fullWidth @click="$router.push('/banque-questions')">
              Ajouter une Question
            </EpButton>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import { useMagasinCandidat } from '../../magasins/candidat.store';
import CarteStatistique from '../../composants/communs/CarteStatistique.vue';
import EpButton from '../../composants/systeme/EpButton.vue';

const magasinAuth = useMagasinAuthentification();
const magasinCandidat = useMagasinCandidat();
const candidatsAcorriger = computed(() => magasinCandidat.candidats.slice(0, 3));
</script>
