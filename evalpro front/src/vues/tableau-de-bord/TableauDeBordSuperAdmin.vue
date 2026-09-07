<template>
  <!--
    TableauDeBordSuperAdmin.vue - Dashboard Super Administrateur EvalPro SaaS
  -->
  <div class="space-y-8">

    <!-- En-tête de page -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-ep-border shadow-ep-card">
      <div>
        <div class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-ep-secondary border border-purple-100 mb-2">
          <span class="material-symbols-outlined text-xs">admin_panel_settings</span>
          <span>Super Administrateur</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">Supervision Globale EvalPro</h1>
        <p class="text-xs text-ep-muted mt-1">Gestion du parc clients, santé financière (MRR) et journalisation de sécurité.</p>
      </div>

      <EpButton variant="primary" size="sm" iconLeft="domain_add">
        Ajouter une Entreprise
      </EpButton>
    </div>

    <!-- KPIs Clés SaaS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique
        titre="Revenu Mensuel (MRR)"
        valeur="29 590 €"
        icone="payments"
        tendance="+14.2%"
        :tendancePositive="true"
        couleurFondIcone="bg-purple-50 text-ep-secondary"
      />

      <CarteStatistique
        titre="Entreprises Clientes"
        valeur="6"
        icone="corporate_fare"
        tendance="+2 ce mois"
        :tendancePositive="true"
        couleurFondIcone="bg-blue-50 text-ep-primary"
      />

      <CarteStatistique
        titre="Candidats Totaux"
        valeur="2 983"
        icone="groups"
        tendance="+18.5%"
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-50 text-emerald-600"
      />

      <CarteStatistique
        titre="Sessions Simultanées"
        valeur="48"
        icone="monitor"
        tendance="Capacité 10k"
        :tendancePositive="true"
        couleurFondIcone="bg-amber-50 text-amber-600"
      />
    </div>

    <!-- Tableau des Entreprises Clientes -->
    <div class="bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-4">
      <div class="flex items-center justify-between border-b border-ep-border pb-4">
        <div>
          <h3 class="text-base font-bold text-ep-text flex items-center gap-2">
            <span class="material-symbols-outlined text-ep-secondary">domain</span>
            <span>Entreprises Clientes et Abonnements</span>
          </h3>
          <p class="text-xs text-ep-muted mt-0.5">{{ entreprises.length }} entreprises répertoriées en production</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-ep-text">
          <thead class="bg-slate-50 text-ep-muted uppercase font-semibold border-y border-ep-border">
            <tr>
              <th class="p-3">Entreprise</th>
              <th class="p-3">Plan Abonnement</th>
              <th class="p-3">Utilisateurs</th>
              <th class="p-3">Campagnes</th>
              <th class="p-3">Candidats</th>
              <th class="p-3">Statut</th>
              <th class="p-3">MRR Généré</th>
              <th class="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ep-border">
            <tr v-for="ent in entreprises" :key="ent.id" class="hover:bg-slate-50/60 transition-colors">
              <td class="p-3 font-semibold text-ep-text flex items-center gap-2.5">
                <div class="w-7 h-7 rounded bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-ep-primary text-xs">
                  {{ ent.sigle }}
                </div>
                <span>{{ ent.nom }}</span>
              </td>
              <td class="p-3">
                <span class="px-2 py-0.5 rounded bg-purple-50 text-ep-secondary border border-purple-200/60 font-semibold text-[11px]">
                  {{ ent.plan }}
                </span>
              </td>
              <td class="p-3 font-mono">{{ ent.utilisateurs }}</td>
              <td class="p-3 font-mono">{{ ent.campagnes }}</td>
              <td class="p-3 font-mono">{{ ent.candidats }}</td>
              <td class="p-3">
                <BadgesStatut :statut="ent.statut" />
              </td>
              <td class="p-3 font-mono font-bold text-emerald-600">{{ ent.mrr }} € / mois</td>
              <td class="p-3 text-right">
                <button class="p-1 text-ep-muted hover:text-ep-text rounded transition-colors" title="Paramètres">
                  <span class="material-symbols-outlined text-base">settings</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Logs de Sécurité et Audit -->
    <div class="bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-4">
      <div class="flex items-center justify-between border-b border-ep-border pb-4">
        <div>
          <h3 class="text-base font-bold text-ep-text flex items-center gap-2">
            <span class="material-symbols-outlined text-rose-600">shield</span>
            <span>Journal d'Audit et Événements Sécurité</span>
          </h3>
          <p class="text-xs text-ep-muted mt-0.5">Supervision proctoring et connexions en temps réel</p>
        </div>
      </div>

      <div class="space-y-2 font-mono text-xs">
        <div v-for="log in logs" :key="log.id" class="bg-slate-50 p-3 rounded-lg border border-ep-border flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-ep-muted text-[11px]">{{ log.horodatage }}</span>
            <span :class="[
              'px-2 py-0.5 rounded text-[10px] uppercase font-bold',
              log.type === 'securite' ? 'bg-blue-50 text-ep-primary' :
              log.type === 'surveillance' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
            ]">
              {{ log.type }}
            </span>
            <span class="text-ep-text font-medium">{{ log.evenement }}</span>
          </div>
          <div class="text-ep-muted text-[11px]">
            <span>IP: {{ log.adresseIp }}</span>
            <span class="ml-2">({{ log.utilisateur }})</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMagasinCampagne } from '../../magasins/campagne.store';
import { LOGS_SYSTEME_INITIALS } from '../../donnees/donneesInitiales';
import CarteStatistique from '../../composants/communs/CarteStatistique.vue';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';
import EpButton from '../../composants/systeme/EpButton.vue';

const magasinCampagne = useMagasinCampagne();
const entreprises = computed(() => magasinCampagne.entreprises);
const logs = LOGS_SYSTEME_INITIALS;
</script>
