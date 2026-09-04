<template>
  <!-- 
    TableauDeBordCandidat.vue (Espace Candidat Zéro Distraction)
    Accueil du candidat après clic sur son lien d'invitation JWT.
  -->
  <div class="max-w-3xl mx-auto py-12 px-4 space-y-8">
    
    <div class="bg-white border border-bordure rounded-2xl p-8 shadow-carte space-y-6">
      
      <div class="flex items-start justify-between pb-4 border-b border-bordure">
        <div class="space-y-1">
          <span class="px-2.5 py-0.5 rounded bg-bleu-50 text-bleu-700 border border-bleu-200 text-xs font-semibold">
            Invitation Officielle d'Évaluation
          </span>
          <h1 class="text-2xl font-extrabold text-texte-principal tracking-tight mt-1">Bienvenue, {{ magasinAuth.utilisateurConnecte.nom }}</h1>
          <p class="text-xs text-texte-secondaire">Poste concerné : <strong class="text-texte-principal">Développeur Web Full-Stack Senior</strong> • TechCorp Algérie</p>
        </div>

        <div class="w-12 h-12 rounded-xl bg-bleu-50 text-bleu-600 flex items-center justify-center border border-bleu-100">
          <span class="material-symbols-outlined text-2xl">assignment_ind</span>
        </div>
      </div>

      <!-- Métriques de l'épreuve -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-fond-principal p-4 rounded-xl border border-bordure text-xs">
        <div class="space-y-1">
          <div class="text-texte-secondaire">Durée Maximale</div>
          <div class="text-sm font-bold text-texte-principal font-mono">45 Minutes</div>
        </div>
        <div class="space-y-1">
          <div class="text-texte-secondaire">Nombre de Questions</div>
          <div class="text-sm font-bold text-texte-principal font-mono">4 Épreuves Techniques</div>
        </div>
        <div class="space-y-1">
          <div class="text-texte-secondaire">Niveau Surveillance</div>
          <div class="text-sm font-bold text-emerald-700">Proctoring Niveau 2</div>
        </div>
      </div>

      <!-- Instructions officielles -->
      <div class="space-y-3">
        <h3 class="text-sm font-bold text-texte-principal flex items-center space-x-2">
          <span class="material-symbols-outlined text-bleu-600">info</span>
          <span>Instructions Avant le Démarrage</span>
        </h3>
        <ul class="space-y-2 text-xs text-texte-secondaire list-disc list-inside leading-relaxed">
          <li>Assurez-vous d'être dans un environnement calme avec une connexion internet stable.</li>
          <li>Votre webcam et votre micro doivent rester activés pendant toute la session.</li>
          <li>Les changements d'onglets et les copier-coller seront détectés et journalisés.</li>
          <li>Vos réponses sont automatiquement sauvegardées de manière continue.</li>
        </ul>
      </div>

      <!-- Bouton Lancement -->
      <div class="pt-4 text-center">
        <router-link 
          to="/epreuves/passage" 
          class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-bleu-600 hover:bg-bleu-700 text-white font-bold text-sm shadow-carte transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-xl">play_arrow</span>
          <span>Démarrer l'Épreuve Maintenant</span>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useMagasinAuthentification } from '../../magasins/authentification.store';

const magasinAuth = useMagasinAuthentification();
</script>
