<template>
  <!--
    CarteStatistique.vue - Carte d'indicateur KPI (Key Performance Indicator)
    Thème clair : fond blanc, bordure légère, valeur en gros, tendance colorée.
    Utilisée dans tous les tableaux de bord pour afficher les métriques principales.
  -->
  <div class="carte p-5 hover:shadow-carte-md transition-all">
    <div class="flex items-center justify-between">
      <!-- Libellé de l'indicateur -->
      <span class="text-xs font-semibold text-texte-muet uppercase tracking-wider">{{ titre }}</span>
      <!-- Icone dans un rond coloré -->
      <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', couleurFondIcone]">
        <span class="material-symbols-outlined text-xl" :class="couleurTexteIcone">{{ icone }}</span>
      </div>
    </div>

    <!-- Valeur principale et tendance -->
    <div class="mt-3 flex items-baseline justify-between">
      <div class="text-2xl font-extrabold text-texte-principal tracking-tight font-titre">{{ valeur }}</div>

      <div
        v-if="tendance"
        class="flex items-center text-xs font-semibold"
        :class="tendancePositive ? 'text-succes' : 'text-erreur'"
      >
        <span class="material-symbols-outlined text-sm mr-0.5">
          {{ tendancePositive ? 'trending_up' : 'trending_down' }}
        </span>
        <span>{{ tendance }}</span>
      </div>
    </div>

    <!-- Description optionnelle sous la valeur -->
    <p v-if="description" class="mt-2 text-xs text-texte-muet">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
/**
 * CarteStatistique - Composant de carte KPI réutilisable.
 *
 * @prop {string}  titre            - Libelle de l'indicateur
 * @prop {string|number} valeur     - Valeur principale a afficher
 * @prop {string}  icone            - Code de l'icone Material Symbols
 * @prop {string}  tendance         - Texte de tendance (optionnel)
 * @prop {boolean} tendancePositive - Si true : vert (hausse), si false : rouge (baisse)
 * @prop {string}  description      - Description supplementaire (optionnel)
 * @prop {string}  couleurFondIcone - Classe Tailwind pour le fond de l'icone
 * @prop {string}  couleurTexteIcone- Classe Tailwind pour la couleur de l'icone
 */
defineProps({
  titre:             { type: String, required: true },
  valeur:            { type: [String, Number], required: true },
  icone:             { type: String, default: 'analytics' },
  tendance:          { type: String, default: null },
  tendancePositive:  { type: Boolean, default: true },
  description:       { type: String, default: null },
  couleurFondIcone:  { type: String, default: 'bg-bleu-50' },
  couleurTexteIcone: { type: String, default: 'text-bleu-600' },
});
</script>
