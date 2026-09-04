<template>
  <!-- 
    TableauDeBordSuperAdmin : Vue générale du propriétaire de la plateforme SaaS EvalPro.
    Affiche la liste des entreprises souscrites, le MRR global, les statistiques système et les logs.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    
    <!-- En-tête -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-1">
          <span class="material-symbols-outlined text-xs">admin_panel_settings</span>
          <span>Espace Super Administrateur</span>
        </div>
        <h1 class="text-2xl font-extrabold text-white">Supervision Globale de la Plateforme EvalPro</h1>
        <p class="text-xs text-slate-400">Vue d'ensemble des abonnements, entreprises clientes, revenus et logs de sécurité.</p>
      </div>

      <button class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center space-x-1.5">
        <span class="material-symbols-outlined text-base">domain_add</span>
        <span>Ajouter une Entreprise Cliente</span>
      </button>
    </div>

    <!-- Métriques Clés SaaS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique 
        titre="Revenu Mensuel Récurrent (MRR)" 
        valeur="29,590 €" 
        icone="payments" 
        tendance="+14.2%" 
        :tendancePositive="true"
        couleurFondIcone="bg-purple-500/10" 
        couleurTexteIcone="text-purple-400" 
      />

      <CarteStatistique 
        titre="Entreprises Actives" 
        valeur="6" 
        icone="domain" 
        tendance="+2 ce mois" 
        :tendancePositive="true"
        couleurFondIcone="bg-indigo-500/10" 
        couleurTexteIcone="text-indigo-400" 
      />

      <CarteStatistique 
        titre="Candidats Évalués au Total" 
        valeur="2,983" 
        icone="groups" 
        tendance="+18.5%" 
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-500/10" 
        couleurTexteIcone="text-emerald-400" 
      />

      <CarteStatistique 
        titre="Épreuves Simultanées" 
        valeur="48" 
        icone="monitor" 
        tendance="Capacité 10k max" 
        :tendancePositive="true"
        couleurFondIcone="bg-amber-500/10" 
        couleurTexteIcone="text-amber-400" 
      />
    </div>

    <!-- Tableau des Entreprises Clientes -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-white flex items-center space-x-2">
          <span class="material-symbols-outlined text-purple-400">corporate_fare</span>
          <span>Entreprises Clientes et Abonnements</span>
        </h3>
        <span class="text-xs text-slate-400">{{ entreprises.length }} entreprises répertoriées</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950 text-slate-400 uppercase font-semibold">
            <tr>
              <th class="p-3">Entreprise</th>
              <th class="p-3">Formule Plan</th>
              <th class="p-3">Utilisateurs</th>
              <th class="p-3">Campagnes</th>
              <th class="p-3">Candidats</th>
              <th class="p-3">Statut</th>
              <th class="p-3">MRR Généré</th>
              <th class="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="ent in entreprises" :key="ent.id" class="hover:bg-slate-800/40 transition-colors">
              <td class="p-3 font-semibold text-white flex items-center space-x-2.5">
                <div class="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-purple-400">
                  {{ ent.sigle }}
                </div>
                <span>{{ ent.nom }}</span>
              </td>
              <td class="p-3 font-medium text-slate-200">
                <span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                  {{ ent.plan }}
                </span>
              </td>
              <td class="p-3 font-mono text-slate-300">{{ ent.utilisateurs }}</td>
              <td class="p-3 font-mono text-slate-300">{{ ent.campagnes }}</td>
              <td class="p-3 font-mono text-slate-300">{{ ent.candidats }}</td>
              <td class="p-3">
                <BadgesStatut :statut="ent.statut" />
              </td>
              <td class="p-3 font-mono font-bold text-emerald-400">{{ ent.mrr }} € / mois</td>
              <td class="p-3 text-right">
                <button class="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer" title="Gérer l'entreprise">
                  <span class="material-symbols-outlined text-base">settings</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section Logs et Événements de Sécurité System -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-white flex items-center space-x-2">
          <span class="material-symbols-outlined text-rose-400">security_update_warning</span>
          <span>Journal d'Audit et Logs de Sécurité (TLS 1.3 & Proctoring)</span>
        </h3>
        <span class="text-xs text-slate-400">Temps réel</span>
      </div>

      <div class="space-y-2 font-mono text-xs">
        <div v-for="log in logs" :key="log.id" class="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <span class="text-slate-500">{{ log.horodatage }}</span>
            <span :class="[
              'px-2 py-0.5 rounded text-[10px] uppercase font-bold',
              log.type === 'securite' ? 'bg-indigo-500/10 text-indigo-400' :
              log.type === 'surveillance' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
            ]">
              {{ log.type }}
            </span>
            <span class="text-slate-200">{{ log.evenement }}</span>
          </div>
          <div class="text-slate-400 text-[11px]">
            <span>IP: {{ log.adresseIp }}</span>
            <span class="ml-2 text-slate-500">({{ log.utilisateur }})</span>
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
