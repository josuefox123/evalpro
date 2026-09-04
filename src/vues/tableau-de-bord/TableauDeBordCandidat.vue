<template>
  <!-- 
    TableauDeBordCandidat : Espace d'accueil et de préparation du Candidat.
    Affiché lorsque le candidat clique sur son lien d'invitation unique (JWT).
    Permet la vérification du matériel (Webcam, Micro), la lecture des consignes et le lancement de l'épreuve.
  -->
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-8">
    
    <!-- Carte d'Accueil Candidat -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
      
      <div class="flex items-start justify-between">
        <div class="space-y-1">
          <span class="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
            Invitation Officielle d'Évaluation
          </span>
          <h1 class="text-2xl font-extrabold text-white">Bienvenue, {{ magasinAuth.utilisateurConnecte.nom }}</h1>
          <p class="text-xs text-slate-400">Poste concerné : <strong class="text-slate-200">Développeur Web Full-Stack Senior</strong> • TechCorp Algérie</p>
        </div>

        <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <span class="material-symbols-outlined text-2xl">assignment_ind</span>
        </div>
      </div>

      <!-- Informations et Consignes d'Examen -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
        <div class="space-y-1">
          <div class="text-slate-500">Durée d'Épreuve</div>
          <div class="text-sm font-bold text-white font-mono">45 Minutes</div>
        </div>
        <div class="space-y-1">
          <div class="text-slate-500">Questions</div>
          <div class="text-sm font-bold text-white font-mono">4 Épreuves Techniques</div>
        </div>
        <div class="space-y-1">
          <div class="text-slate-500">Surveillance</div>
          <div class="text-sm font-bold text-emerald-400">Proctoring Niveau 2</div>
        </div>
      </div>

      <!-- Consignes Importantes -->
      <div class="space-y-3 pt-2">
        <h3 class="text-sm font-bold text-white flex items-center space-x-2">
          <span class="material-symbols-outlined text-amber-400">info</span>
          <span>Consignes Importantes Avant de Commencer</span>
        </h3>
        <ul class="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
          <li>Assurez-vous d'avoir une connexion internet stable et un environnement calme.</li>
          <li>Votre webcam et votre micro seront activés pendant toute la durée du test.</li>
          <li>Les tentatives de copier-coller et les changements d'onglets seront journalisés.</li>
          <li>Vos réponses sont automatiquement sauvegardées toutes les 30 secondes.</li>
        </ul>
      </div>

      <!-- Vérification Matériel Simulée -->
      <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-slate-200">Vérification Préalable du Matériel :</span>
          <span class="text-emerald-400 font-semibold flex items-center space-x-1">
            <span class="material-symbols-outlined text-sm">check_circle</span>
            <span>Matériel Conforme</span>
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
            <span class="text-slate-400 flex items-center space-x-1">
              <span class="material-symbols-outlined text-sm text-indigo-400">videocam</span>
              <span>Webcam HD</span>
            </span>
            <span class="text-emerald-400 font-semibold">Prête</span>
          </div>

          <div class="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
            <span class="text-slate-400 flex items-center space-x-1">
              <span class="material-symbols-outlined text-sm text-indigo-400">mic</span>
              <span>Microphone</span>
            </span>
            <span class="text-emerald-400 font-semibold">Prêt</span>
          </div>
        </div>
      </div>

      <!-- Bouton de Démarrage -->
      <div class="pt-2 text-center">
        <router-link 
          to="/epreuves/passage" 
          class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 transition-all cursor-pointer"
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
