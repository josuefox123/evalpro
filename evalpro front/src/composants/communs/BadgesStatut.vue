<template>
  <!-- 
    BadgesStatut.vue (Style Maquette Figma Sombre)
    Badges colorés translucides pour les statuts d'épreuves, campagnes et candidats.
  -->
  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border', styleStatut]">
    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="stylePuce"></span>
    {{ libelleStatut }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  statut: { type: String, required: true },
});

const libelleStatut = computed(() => {
  const s = props.statut.toUpperCase();
  switch (s) {
    case 'ACTIVE': case 'ACTIF': return 'Active';
    case 'BROUILLON': return 'Brouillon';
    case 'CLOTUREE': case 'TERMINEE': return 'Clôturée';
    case 'PUBLIEE': return 'Publiée';
    case 'ARCHIVEE': return 'Archivée';
    case 'ADMIS': return 'Admis';
    case 'REFUSE': case 'REFUSEE': return 'Refusé';
    case 'EN_ATTENTE': return 'En attente';
    case 'EN_COURS': return 'En cours';
    case 'NON_ENVOYEE': return 'Non envoyée';
    case 'ENVOYEE': return 'Envoyée';
    case 'SUSPENDU': return 'Suspendu';
    case 'ESSAI': return 'Période d\'essai';
    default: return props.statut;
  }
});

const styleStatut = computed(() => {
  const s = props.statut.toUpperCase();
  switch (s) {
    case 'ACTIVE': case 'ACTIF': case 'ADMIS': case 'PUBLIEE':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'BROUILLON': case 'NON_ENVOYEE':
      return 'bg-slate-800 text-slate-400 border-slate-700';
    case 'CLOTUREE': case 'TERMINEE': case 'ARCHIVEE':
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    case 'EN_COURS': case 'EN_ATTENTE': case 'ENVOYEE': case 'ESSAI':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'REFUSE': case 'REFUSEE': case 'SUSPENDU':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700';
  }
});

const stylePuce = computed(() => {
  const s = props.statut.toUpperCase();
  switch (s) {
    case 'ACTIVE': case 'ACTIF': case 'ADMIS': case 'PUBLIEE': return 'bg-emerald-400';
    case 'BROUILLON': case 'NON_ENVOYEE': return 'bg-slate-500';
    case 'CLOTUREE': case 'TERMINEE': case 'ARCHIVEE': return 'bg-indigo-400';
    case 'EN_COURS': case 'EN_ATTENTE': case 'ENVOYEE': case 'ESSAI': return 'bg-amber-400';
    case 'REFUSE': case 'REFUSEE': case 'SUSPENDU': return 'bg-rose-400';
    default: return 'bg-slate-400';
  }
});
</script>
