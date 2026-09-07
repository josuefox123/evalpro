<template>
  <!--
    TableauDeBordEntreprise.vue - Tableau de bord B2B Administrateur Entreprise
  -->
  <div class="space-y-8">

    <!-- En-tête de page & Salutation -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-ep-border shadow-ep-card">
      <div>
        <div class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-ep-primary border border-blue-100 mb-2">
          <span class="material-symbols-outlined text-xs">domain</span>
          <span>{{ magasinAuth.utilisateurConnecte.entreprise || 'TechCorp Algérie' }}</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ep-text font-titre">
          Bonjour, {{ magasinAuth.utilisateurConnecte.nom }} 👋
        </h1>
        <p class="text-xs text-ep-muted mt-1">
          Voici un aperçu de vos activités de recrutement et de la progression de vos campagnes d'évaluation.
        </p>
      </div>

      <!-- Actions rapides -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <EpButton variant="outline" size="sm" iconLeft="upload_file" @click="afficherModalImport = true">
          Import Massif
        </EpButton>
        <EpButton variant="primary" size="sm" iconLeft="add" @click="$router.push('/campagnes/nouvelle')">
          Nouvelle Campagne
        </EpButton>
      </div>
    </div>

    <!-- KPIs RH Principal -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CarteStatistique
        titre="Campagnes Actives"
        valeur="12"
        icone="campaign"
        tendance="+2 ce mois"
        :tendancePositive="true"
        couleurFondIcone="bg-blue-50 text-ep-primary"
      />

      <CarteStatistique
        titre="Candidats Évalués"
        valeur="1 245"
        icone="group"
        tendance="+120 cette semaine"
        :tendancePositive="true"
        couleurFondIcone="bg-purple-50 text-ep-secondary"
      />

      <CarteStatistique
        titre="Taux de Réussite"
        valeur="78.4%"
        icone="fact_check"
        tendance="+3.2% vs dernier mois"
        :tendancePositive="true"
        couleurFondIcone="bg-emerald-50 text-emerald-600"
      />

      <CarteStatistique
        titre="Copies à Corriger"
        valeur="14"
        icone="assignment_late"
        tendance="Action requise"
        :tendancePositive="false"
        couleurFondIcone="bg-amber-50 text-amber-600"
      />
    </div>

    <!-- Section principale : Campagnes en cours & Activité récente -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Liste des campagnes actives (2 colonnes) -->
      <div class="lg:col-span-2 bg-white border border-ep-border rounded-xl p-6 shadow-ep-card space-y-5">
        <div class="flex items-center justify-between border-b border-ep-border pb-4">
          <div>
            <h3 class="text-base font-bold text-ep-text flex items-center gap-2">
              <span class="material-symbols-outlined text-ep-primary">campaign</span>
              <span>Campagnes de Recrutement en Cours</span>
            </h3>
            <p class="text-xs text-ep-muted mt-0.5">Suivi en direct des compositions des candidats</p>
          </div>
          <router-link to="/campagnes" class="text-xs font-semibold text-ep-primary hover:underline flex items-center gap-1">
            <span>Voir tout</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="campagne in magasinCampagne.campagnes"
            :key="campagne.id"
            class="bg-slate-50 border border-ep-border hover:border-slate-300 rounded-xl p-4 space-y-3.5 transition-all"
          >
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-semibold uppercase text-ep-muted tracking-wider">
                  {{ campagne.departement }}
                </span>
                <h4 class="text-sm font-bold text-ep-text mt-0.5">{{ campagne.titre }}</h4>
              </div>
              <BadgesStatut :statut="campagne.statut" />
            </div>

            <div class="grid grid-cols-3 gap-2 text-xs bg-white p-2.5 rounded-lg border border-ep-border text-center">
              <div>
                <div class="text-[10px] text-ep-muted">Candidats</div>
                <div class="font-bold text-ep-text font-mono">{{ campagne.candidatsCount }}</div>
              </div>
              <div>
                <div class="text-[10px] text-ep-muted">Compositions</div>
                <div class="font-bold text-ep-success font-mono">{{ campagne.compositionsRealisees }}</div>
              </div>
              <div>
                <div class="text-[10px] text-ep-muted">Échéance</div>
                <div class="font-bold text-ep-muted text-[11px]">{{ campagne.dateCloture }}</div>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex items-center justify-between text-xs text-ep-muted">
                <span>Avancement</span>
                <span class="font-bold text-ep-primary">{{ campagne.progression }}%</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  class="h-full bg-ep-primary rounded-full transition-all duration-300"
                  :style="{ width: campagne.progression + '%' }"
                ></div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-ep-border text-xs">
              <span class="text-ep-muted flex items-center gap-1 text-[11px]">
                <span class="material-symbols-outlined text-sm">person</span>
                <span>{{ campagne.consultantAssigne }}</span>
              </span>
              <router-link to="/candidats" class="text-ep-primary font-semibold hover:underline text-xs flex items-center gap-0.5">
                <span>Candidats</span>
                <span class="material-symbols-outlined text-xs">chevron_right</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne de droite : Alertes & Activité récente -->
      <div class="space-y-6">

        <!-- Carte : Copies à corriger rapidement -->
        <div class="bg-white border border-ep-border rounded-xl p-5 shadow-ep-card space-y-4">
          <h3 class="text-sm font-bold text-ep-text flex items-center gap-2 border-b border-ep-border pb-3">
            <span class="material-symbols-outlined text-amber-500 text-lg">edit_note</span>
            <span>Corrections Prioritaires</span>
          </h3>

          <div class="space-y-3">
            <div class="p-3 bg-amber-50/60 border border-amber-100 rounded-lg flex items-center justify-between text-xs">
              <div>
                <div class="font-semibold text-slate-800">Amira Belkacem</div>
                <div class="text-[10px] text-slate-500">Dev Full-Stack Senior</div>
              </div>
              <router-link to="/correction" class="px-2.5 py-1 bg-amber-500 text-white rounded text-[11px] font-semibold hover:bg-amber-600">
                Corriger
              </router-link>
            </div>

            <div class="p-3 bg-slate-50 border border-slate-200/60 rounded-lg flex items-center justify-between text-xs">
              <div>
                <div class="font-semibold text-slate-800">Yacine Ouali</div>
                <div class="text-[10px] text-slate-500">Analyste Financier</div>
              </div>
              <router-link to="/correction" class="px-2.5 py-1 bg-slate-800 text-white rounded text-[11px] font-semibold hover:bg-slate-700">
                Revoir
              </router-link>
            </div>
          </div>
        </div>

        <!-- Carte : Activités récentes -->
        <div class="bg-white border border-ep-border rounded-xl p-5 shadow-ep-card space-y-4">
          <h3 class="text-sm font-bold text-ep-text flex items-center gap-2 border-b border-ep-border pb-3">
            <span class="material-symbols-outlined text-ep-primary text-lg">history</span>
            <span>Activité Récente</span>
          </h3>

          <div class="space-y-3 text-xs">
            <div class="flex items-start gap-2.5">
              <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-xs">check</span>
              </div>
              <div>
                <span class="font-semibold text-ep-text">Lina Djaballah</span> a terminé l'épreuve Full-Stack
                <div class="text-[10px] text-ep-muted">Il y a 25 minutes</div>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <div class="w-6 h-6 rounded-full bg-blue-100 text-ep-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-xs">send</span>
              </div>
              <div>
                15 nouvelles invitations envoyées pour la campagne DevOps
                <div class="text-[10px] text-ep-muted">Il y a 2 heures</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Modale d'importation massif -->
    <EpModal v-model="afficherModalImport" title="Importation Massives de Candidats" icon="upload_file" size="lg">
      <ImporteurMassif @fermer="afficherModalImport = false" @importe="onImporte" />
    </EpModal>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMagasinAuthentification } from '../../magasins/authentification.store';
import { useMagasinCampagne } from '../../magasins/campagne.store';
import { useMagasinNotification } from '../../magasins/notification.store';
import CarteStatistique from '../../composants/communs/CarteStatistique.vue';
import BadgesStatut from '../../composants/communs/BadgesStatut.vue';
import ImporteurMassif from '../../composants/recrutement/ImporteurMassif.vue';
import EpButton from '../../composants/systeme/EpButton.vue';
import EpModal from '../../composants/systeme/EpModal.vue';

const magasinAuth = useMagasinAuthentification();
const magasinCampagne = useMagasinCampagne();
const magasinNotif = useMagasinNotification();
const afficherModalImport = ref(false);

function onImporte(nombre) {
  afficherModalImport.value = false;
  magasinNotif.succes(`${nombre} nouveaux candidats importés avec succès !`, "Importation réussie");
}
</script>
