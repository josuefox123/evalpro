<template>
  <!-- 
    ConcepteurEpreuve.vue (Exam Builder 3 Colonnes B2B SaaS)
    Interface professionnelle de conception d'examens en 3 colonnes :
    - Gauche : Bibliothèque des types de questions (QCM, Vrai/Faux, Réponse courte, Code, SQL)
    - Centre : Canvas de l'épreuve avec ordre des questions et aperçu
    - Droite : Panneau des propriétés et barème de la question sélectionnée
  -->
  <div class="space-y-4">
    
    <!-- Barre d'En-tête de l'Éditeur d'Épreuve -->
    <div class="bg-white border border-bordure rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-carte">
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-bleu-600 uppercase tracking-wider">Exam Builder HR Tech</span>
        <h2 class="text-lg font-bold text-texte-principal flex items-center space-x-2">
          <span>Épreuve : {{ epreuve.titre }}</span>
        </h2>
      </div>

      <div class="flex items-center space-x-3">
        <div class="text-xs text-texte-secondaire flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-fond-principal border border-bordure">
          <span>Questions : <strong class="text-texte-principal">{{ epreuve.questions.length }}</strong></span>
          <span>•</span>
          <span>Barème : <strong class="text-bleu-600 font-mono">{{ pointsTotaux }} Pts</strong></span>
          <span>•</span>
          <span>Durée : <strong class="text-texte-principal">{{ epreuve.dureeMinutes }} min</strong></span>
        </div>

        <button 
          @click="sauvegarder"
          class="px-4 py-2 rounded-lg bg-bleu-600 hover:bg-bleu-700 text-white text-xs font-semibold shadow-carte transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-sm">save</span>
          <span>Enregistrer l'Épreuve</span>
        </button>
      </div>
    </div>

    <!-- Layout 3 Colonnes -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[650px]">
      
      <!-- COLONNE 1 : Bibliothèque des Types & Questions Banque (3 cols) -->
      <div class="lg:col-span-3 bg-white border border-bordure rounded-xl p-4 space-y-4 shadow-carte flex flex-col">
        <h3 class="text-xs font-bold text-texte-principal uppercase tracking-wider pb-2 border-b border-bordure flex items-center justify-between">
          <span>Types & Banque</span>
          <span class="text-[10px] text-bleu-600 font-normal">Glisser / Cliquer</span>
        </h3>

        <!-- Liste des Types de Questions de l'Éditeur -->
        <div class="space-y-2">
          <div class="text-[11px] font-semibold text-texte-secondaire">Types de Questions</div>
          <div class="grid grid-cols-1 gap-1.5">
            <button 
              v-for="typeQ in typesQuestionsDisponibles" 
              :key="typeQ.code"
              @click="creerNouvelleQuestion(typeQ)"
              class="flex items-center space-x-2.5 p-2.5 rounded-lg bg-fond-principal hover:bg-bleu-50 hover:border-bleu-200 border border-bordure text-left transition-all cursor-pointer group"
            >
              <div class="w-7 h-7 rounded-md bg-white border border-bordure flex items-center justify-center text-bleu-600 group-hover:bg-bleu-600 group-hover:text-white transition-colors">
                <span class="material-symbols-outlined text-base">{{ typeQ.icone }}</span>
              </div>
              <div>
                <div class="text-xs font-semibold text-texte-principal group-hover:text-bleu-600">{{ typeQ.libelle }}</div>
                <div class="text-[10px] text-texte-muet">{{ typeQ.categorie }}</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Questions de la Banque Centrale -->
        <div class="space-y-2 flex-1 pt-2 border-t border-bordure overflow-y-auto max-h-60">
          <div class="text-[11px] font-semibold text-texte-secondaire">Banque Centrale</div>
          <div 
            v-for="qBanque in magasinEpreuve.banqueQuestions" 
            :key="qBanque.id"
            class="p-2 rounded-lg bg-fond-secondaire border border-bordure hover:border-bleu-300 text-xs space-y-1 cursor-pointer"
            @click="ajouterDepuisBanque(qBanque)"
          >
            <div class="flex items-center justify-between">
              <span class="font-semibold text-texte-principal truncate max-w-[140px]">{{ qBanque.titre }}</span>
              <span class="text-[10px] font-mono text-bleu-600 font-bold">+{{ qBanque.points }}pts</span>
            </div>
            <div class="text-[10px] text-texte-secondaire flex justify-between">
              <span>{{ qBanque.domaine }}</span>
              <span>{{ qBanque.type.toUpperCase() }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- COLONNE 2 : Contenu & Séquence de l'Épreuve (6 cols) -->
      <div class="lg:col-span-6 bg-white border border-bordure rounded-xl p-5 space-y-4 shadow-carte flex flex-col">
        <div class="flex items-center justify-between pb-3 border-b border-bordure">
          <h3 class="text-xs font-bold text-texte-principal uppercase tracking-wider">Structure de l'Examen</h3>
          <span class="text-xs text-texte-secondaire">{{ epreuve.questions.length }} questions configurées</span>
        </div>

        <!-- Liste des Questions de l'Épreuve -->
        <div class="space-y-3 flex-1 overflow-y-auto pr-1">
          <div 
            v-for="(q, idx) in epreuve.questions" 
            :key="q.id"
            @click="indexQuestionSelectionnee = idx"
            :class="[
              'p-4 rounded-xl border transition-all cursor-pointer space-y-2',
              indexQuestionSelectionnee === idx 
                ? 'bg-bleu-50/60 border-bleu-600 shadow-carte' 
                : 'bg-white border-bordure hover:border-slate-300'
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-6 h-6 rounded-md bg-texte-principal text-white text-xs font-bold font-mono flex items-center justify-center">
                  {{ idx + 1 }}
                </span>
                <span class="text-xs font-bold text-texte-principal">{{ q.titre }}</span>
              </div>

              <div class="flex items-center space-x-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-bleu-50 text-bleu-600 border border-bleu-100">
                  {{ q.type }}
                </span>
                <span class="text-xs font-mono font-bold text-emerald-600">{{ q.points }} Pts</span>
                <button @click.stop="supprimerQuestion(idx)" class="p-1 text-texte-muet hover:text-rose-600 rounded transition-colors" title="Supprimer">
                  <span class="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>

            <p class="text-xs text-texte-secondaire line-clamp-2 leading-relaxed">{{ q.enonce }}</p>

            <div v-if="q.options && q.options.length > 0" class="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
              <div v-for="opt in q.options" :key="opt.id" class="p-1.5 rounded bg-fond-principal border border-bordure text-texte-secondaire">
                <strong class="text-texte-principal mr-1">{{ opt.id.toUpperCase() }}.</strong> {{ opt.texte }}
              </div>
            </div>
          </div>

          <div v-if="epreuve.questions.length === 0" class="text-center py-16 text-texte-muet space-y-2">
            <span class="material-symbols-outlined text-4xl">quiz</span>
            <p class="text-xs">Aucune question dans cette épreuve. Ajoutez-en depuis le panneau de gauche.</p>
          </div>
        </div>

      </div>

      <!-- COLONNE 3 : Propriétés de la Question Sélectionnée (3 cols) -->
      <div class="lg:col-span-3 bg-white border border-bordure rounded-xl p-4 space-y-4 shadow-carte">
        <h3 class="text-xs font-bold text-texte-principal uppercase tracking-wider pb-2 border-b border-bordure">
          Propriétés Question #{{ indexQuestionSelectionnee + 1 }}
        </h3>

        <template v-if="questionActive">
          <div class="space-y-3">
            <div>
              <label class="block text-[11px] font-semibold text-texte-secondaire mb-1">Intitulé / Titre</label>
              <input 
                v-model="questionActive.titre" 
                type="text" 
                class="w-full bg-fond-principal border border-bordure rounded-lg px-3 py-1.5 text-xs text-texte-principal focus:outline-none focus:border-bleu-600"
              />
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-texte-secondaire mb-1">Énoncé de la Question</label>
              <textarea 
                v-model="questionActive.enonce" 
                rows="4" 
                class="w-full bg-fond-principal border border-bordure rounded-lg p-2.5 text-xs text-texte-principal focus:outline-none focus:border-bleu-600"
              ></textarea>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-texte-secondaire mb-1">Points Attribués</label>
              <input 
                v-model.number="questionActive.points" 
                type="number" 
                min="1" 
                class="w-full bg-fond-principal border border-bordure rounded-lg px-3 py-1.5 text-xs text-texte-principal font-mono font-bold focus:outline-none focus:border-bleu-600"
              />
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-texte-secondaire mb-1">Temps Conseillé (Secondes)</label>
              <input 
                v-model.number="questionActive.tempsMaxSeconde" 
                type="number" 
                step="30" 
                class="w-full bg-fond-principal border border-bordure rounded-lg px-3 py-1.5 text-xs text-texte-principal font-mono focus:outline-none focus:border-bleu-600"
              />
            </div>
          </div>
        </template>

        <template v-else>
          <div class="text-center py-12 text-texte-muet text-xs">
            Sélectionnez une question au centre pour modifier ses barèmes et consignes.
          </div>
        </template>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMagasinEpreuve } from '../../magasins/epreuve.store';

const magasinEpreuve = useMagasinEpreuve();
const epreuve = magasinEpreuve.epreuveActive;
const indexQuestionSelectionnee = ref(0);

const questionActive = computed(() => epreuve.questions[indexQuestionSelectionnee.value]);
const pointsTotaux = computed(() => epreuve.questions.reduce((sum, q) => sum + q.points, 0));

const typesQuestionsDisponibles = [
  { code: 'qcm', libelle: 'QCM Choix Unique', icone: 'radio_button_checked', categorie: 'Objective' },
  { code: 'qcm_multiple', libelle: 'QCM Choix Multiple', icone: 'check_box', categorie: 'Objective' },
  { code: 'reponse_courte', libelle: 'Réponse Courte', icone: 'notes', categorie: 'Ouverte' },
  { code: 'sql', libelle: 'Requête SQL', icone: 'database', categorie: 'Technique' },
  { code: 'code', libelle: 'Code Python / JS', icone: 'code', categorie: 'Technique' },
  { code: 'vrai_faux', libelle: 'Vrai / Faux', icone: 'rule', categorie: 'Objective' },
];

function creerNouvelleQuestion(typeQ) {
  const nouvelId = Date.now();
  epreuve.questions.push({
    id: nouvelId,
    titre: `Nouvelle Question (${typeQ.libelle})`,
    enonce: 'Saisissez l\'énoncé complet de votre question ici...',
    type: typeQ.code,
    points: 3,
    tempsMaxSeconde: 180,
    reponseCandidat: null,
    estMarqueePourVerification: false,
    options: typeQ.code.startsWith('qcm') ? [
      { id: 'a', texte: 'Option A' },
      { id: 'b', texte: 'Option B' },
      { id: 'c', texte: 'Option C' },
    ] : []
  });
  indexQuestionSelectionnee.value = epreuve.questions.length - 1;
}

function ajouterDepuisBanque(qBanque) {
  const nouvelId = Date.now();
  epreuve.questions.push({
    ...qBanque,
    id: nouvelId,
    reponseCandidat: null,
    estMarqueePourVerification: false,
  });
  indexQuestionSelectionnee.value = epreuve.questions.length - 1;
}

function supprimerQuestion(index) {
  epreuve.questions.splice(index, 1);
  if (indexQuestionSelectionnee.value >= epreuve.questions.length) {
    indexQuestionSelectionnee.value = Math.max(0, epreuve.questions.length - 1);
  }
}

function sauvegarder() {
  alert('Épreuve configurée et enregistrée avec succès !');
}
</script>
