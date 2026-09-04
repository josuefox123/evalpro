<template>
  <!-- 
    BadgesStatut.vue (B2B SaaS HR Tech)
    Badges de statut professionnels (Active, Brouillon, Clôturée, Admis, Refusé, etc.)
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
    case 'ADMIS': return 'Admissible';
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
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'BROUILLON': case 'NON_ENVOYEE':
      return 'bg-slate-100 text-slate-600 border-slate-200';
    case 'CLOTUREE': case 'TERMINEE': case 'ARCHIVEE':
      return 'bg-bleu-50 text-bleu-700 border-bleu-200';
    case 'EN_COURS': case 'EN_ATTENTE': case 'ENVOYEE': case 'ESSAI':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'REFUSE': case 'REFUSEE': case 'SUSPENDU':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
});

const stylePuce = computed(() => {
  const s = props.statut.toUpperCase();
  switch (s) {
    case 'ACTIVE': case 'ACTIF': case 'ADMIS': case 'PUBLIEE': return 'bg-emerald-500';
    case 'BROUILLON': case 'NON_ENVOYEE': return 'bg-slate-400';
    case 'CLOTUREE': case 'TERMINEE': case 'ARCHIVEE': return 'bg-bleu-600';
    case 'EN_COURS': case 'EN_ATTENTE': case 'ENVOYEE': case 'ESSAI': return 'bg-amber-500';
    case 'REFUSE': case 'REFUSEE': case 'SUSPENDU': return 'bg-rose-500';
    default: return 'bg-slate-400';
  }
});
</script>
