<template>
  <!--
    BadgesStatut.vue - Composant de badge de statut colore
    Thème clair : badges avec fond semi-transparent clair et texte lisible sur fond blanc.
    Affiche un indicateur de statut pour campagnes, candidats, epreuves et abonnements.
  -->
  <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border', styleStatut]">
    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="stylePuce"></span>
    {{ libelleStatut }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  /** Code du statut (ex: 'ACTIVE', 'BROUILLON', 'REFUSE', etc.) */
  statut: { type: String, required: true },
});

/**
 * Convertit le code de statut en libellé affichable en francais.
 */
const libelleStatut = computed(() => {
  const s = props.statut.toUpperCase();
  switch (s) {
    case 'ACTIVE':    case 'ACTIF':    return 'Active';
    case 'BROUILLON':                  return 'Brouillon';
    case 'CLOTUREE':  case 'TERMINEE': return 'Cloturee';
    case 'PUBLIEE':                    return 'Publiee';
    case 'ARCHIVEE':                   return 'Archivee';
    case 'ADMIS':                      return 'Admis';
    case 'REFUSE':    case 'REFUSEE':  return 'Refuse';
    case 'EN_ATTENTE':                 return 'En attente';
    case 'EN_COURS':                   return 'En cours';
    case 'NON_ENVOYEE':                return 'Non envoyee';
    case 'ENVOYEE':                    return 'Envoyee';
    case 'SUSPENDU':                   return 'Suspendu';
    case 'ESSAI':                      return "Periode d'essai";
    default:                           return props.statut;
  }
});

/**
 * Retourne les classes CSS du badge selon le statut.
 * Palette claire : fond pastel + texte colore + bordure assortie.
 */
const styleStatut = computed(() => {
  const s = props.statut.toUpperCase();
  switch (s) {
    case 'ACTIVE': case 'ACTIF': case 'ADMIS': case 'PUBLIEE':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'BROUILLON': case 'NON_ENVOYEE':
      return 'bg-gray-50 text-gray-600 border-gray-200';
    case 'CLOTUREE': case 'TERMINEE': case 'ARCHIVEE':
      return 'bg-bleu-50 text-bleu-600 border-bleu-200';
    case 'EN_COURS': case 'EN_ATTENTE': case 'ENVOYEE': case 'ESSAI':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'REFUSE': case 'REFUSEE': case 'SUSPENDU':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
});

/**
 * Retourne la couleur de la puce indicatrice selon le statut.
 */
const stylePuce = computed(() => {
  const s = props.statut.toUpperCase();
  switch (s) {
    case 'ACTIVE': case 'ACTIF': case 'ADMIS': case 'PUBLIEE': return 'bg-emerald-500';
    case 'BROUILLON': case 'NON_ENVOYEE':                        return 'bg-gray-400';
    case 'CLOTUREE': case 'TERMINEE': case 'ARCHIVEE':           return 'bg-bleu-500';
    case 'EN_COURS': case 'EN_ATTENTE': case 'ENVOYEE': case 'ESSAI': return 'bg-amber-500';
    case 'REFUSE': case 'REFUSEE': case 'SUSPENDU':              return 'bg-red-500';
    default:                                                      return 'bg-gray-400';
  }
});
</script>
