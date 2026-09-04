<template>
  <!-- 
    TableauDeBordSuperAdmin.vue (SuperAdmin SaaS B2B)
    Supervision globale de la plateforme SaaS EvalPro : entreprises clients, MRR, logs système et sécurité.
  -->
  <div class="space-y-8">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded bg-bleu-50 text-bleu-700 border border-bleu-200 mb-1">
          <span class="material-symbols-outlined text-xs">admin_panel_settings</span>
          <span>Espace Super Administrateur</span>
        </div>
        <h1 class="text-2xl font-extrabold text-texte-principal tracking-tight">Supervision Globale EvalPro SaaS</h1>
        <p class="text-xs text-texte-secondaire">Gestion des entreprises clientes, abonnements MRR et événements d'audit.</p>
      </div>

      <button class="px-4 py-2 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1.5">
        <span class="material-symbols-outlined text-base">domain_add</span>
        <span>Ajouter une Entreprise Cliente</span>
      </button>
    </div>

    <!-- Métriques Clés SaaS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique 
        titre="Revenu Mensuel (MRR)" 
        valeur="29,590 €" 
        icone="payments" 
        tendance="+14.2%" 
        :tendancePositive="true"
        couleurFondIcone="bg-bleu-50" 
        couleurTexteIcone="text-bleu-600" 
      />

      <CarteStatistique 
        titre="Entreprises Clientes" 
        valeur="6" 
        icone="corporate_fare" 
        tendance="+2 ce mois" 
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-50" 
        couleurTexteIcone="text-emerald-600" 
      />

      <CarteStatistique 
        titre="Candidats Totaux" 
        valeur="2,983" 
        icone="groups" 
        tendance="+18.5%" 
        :tendancePositive="true"
        couleurFondIcone="bg-indigo-50" 
        couleurTexteIcone="text-indigo-600" 
      />

      <CarteStatistique 
        titre="Sessions Simultanées" 
        valeur="48" 
        icone="monitor" 
        tendance="Capacité 10k" 
        :tendancePositive="true"
        couleurFondIcone="bg-amber-50" 
        couleurTexteIcone="text-amber-600" 
      />
    </div>

    <!-- Tableau des Entreprises Clientes -->
    <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-texte-principal flex items-center space-x-2">
          <span class="material-symbols-outlined text-bleu-600">domain</span>
          <span>Entreprises Clientes et Formules d'Abonnement</span>
        </h3>
        <span class="text-xs text-texte-secondaire">{{ entreprises.length }} entreprises répertoriées</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-texte-principal">
          <thead class="bg-fond-principal text-texte-secondaire uppercase font-semibold border-y border-bordure">
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
          <tbody class="divide-y divide-bordure">
            <tr v-for="ent in entreprises" :key="ent.id" class="hover:bg-fond-secondaire/50 transition-colors">
              <td class="p-3 font-semibold text-texte-principal flex items-center space-x-2.5">
                <div class="w-7 h-7 rounded bg-bleu-50 border border-bleu-100 flex items-center justify-center font-bold text-bleu-600 text-xs">
                  {{ ent.sigle }}
                </div>
                <span>{{ ent.nom }}</span>
              </td>
              <td class="p-3 font-medium">
                <span class="px-2 py-0.5 rounded bg-bleu-50 text-bleu-700 border border-bleu-200 font-semibold text-[11px]">
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
                <button class="p-1 text-texte-secondaire hover:text-texte-principal rounded transition-colors" title="Paramètres">
                  <span class="material-symbols-outlined text-base">settings</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Logs de Sécurité et Audit -->
    <div class="bg-white border border-bordure rounded-2xl p-6 shadow-carte space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-texte-principal flex items-center space-x-2">
          <span class="material-symbols-outlined text-rose-600">shield</span>
          <span>Journal d'Audit et Événements Sécurité (TLS 1.3 & Proctoring)</span>
        </h3>
        <span class="text-xs text-texte-secondaire">Journalisation en temps réel</span>
      </div>

      <div class="space-y-2 font-mono text-xs">
        <div v-for="log in logs" :key="log.id" class="bg-fond-principal p-3 rounded-lg border border-bordure flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <span class="text-texte-muet">{{ log.horodatage }}</span>
            <span :class="[
              'px-2 py-0.5 rounded text-[10px] uppercase font-bold',
              log.type === 'securite' ? 'bg-bleu-50 text-bleu-700' :
              log.type === 'surveillance' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
            ]">
              {{ log.type }}
            </span>
            <span class="text-texte-principal font-medium">{{ log.evenement }}</span>
          </div>
          <div class="text-texte-secondaire text-[11px]">
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

const magasinCampagne = useMagasinCampagne();
const entreprises = computed(() => magasinCampagne.entreprises);
const logs = LOGS_SYSTEME_INITIALS;
</script>
