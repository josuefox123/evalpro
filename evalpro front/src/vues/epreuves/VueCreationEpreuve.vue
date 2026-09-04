<template>
  <!-- 
    VueCreationEpreuve : Assemblage d'une épreuve d'examen par sélection de questions dans la banque.
  -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    
    <div class="flex items-center space-x-3">
      <router-link to="/banque-questions" class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-lg">arrow_back</span>
      </router-link>
      <div>
        <h1 class="text-2xl font-extrabold text-white">Conception et Édition d'Épreuve</h1>
        <p class="text-xs text-slate-400">Assemblez votre examen en ajoutant des questions depuis la banque centrale.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Colonne Gauche : Configuration Épreuve (5 cols) -->
      <div class="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Paramètres de l'Épreuve</h3>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Titre de l'Épreuve</label>
          <input 
            v-model="epreuve.titre" 
            type="text" 
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Durée Maximale (Minutes)</label>
          <input 
            v-model.number="epreuve.dureeMinutes" 
            type="number" 
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Consignes aux Candidats</label>
          <textarea 
            v-model="epreuve.consignes" 
            rows="4" 
            class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>

        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div class="flex justify-between text-slate-400">
            <span>Nombre de questions :</span>
            <strong class="text-white">{{ epreuve.questions.length }}</strong>
          </div>
          <div class="flex justify-between text-slate-400">
            <span>Total du Barème :</span>
            <strong class="text-emerald-400 font-mono">{{ pointsTotaux }} Points</strong>
          </div>
        </div>

        <button 
          @click="sauvegarderEpreuve"
          class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
        >
          <span class="material-symbols-outlined text-base">save</span>
          <span>Enregistrer l'Épreuve</span>
        </button>
      </div>

      <!-- Colonne Droite : Questions Ajoutées & Sélecteur (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        
        <SelecteurQuestion @ajouterQuestion="onAjouterQuestion" />

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 class="text-sm font-bold text-white uppercase tracking-wider">Questions Sélectionnées pour cet Examen</h3>

          <div class="space-y-3">
            <div 
              v-for="(q, idx) in epreuve.questions" 
              :key="q.id"
              class="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between"
            >
              <div class="space-y-1">
                <div class="flex items-center space-x-2">
                  <span class="font-bold text-xs text-indigo-400">#{{ idx + 1 }}</span>
                  <span class="text-xs font-bold text-white">{{ q.titre }}</span>
                </div>
                <div class="text-[11px] text-slate-400">{{ q.type.toUpperCase() }} • {{ q.points }} Points</div>
              </div>

              <button @click="retirerQuestion(idx)" class="text-rose-400 hover:text-rose-300 text-xs font-semibold p-1 cursor-pointer">
                <span class="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMagasinEpreuve } from '../../magasins/epreuve.store';
import SelecteurQuestion from '../../composants/epreuves/SelecteurQuestion.vue';

const router = useRouter();
const magasinEpreuve = useMagasinEpreuve();

const epreuve = magasinEpreuve.epreuveActive;

const pointsTotaux = computed(() => {
  return epreuve.questions.reduce((sum, q) => sum + q.points, 0);
});

function onAjouterQuestion(question) {
  const existe = epreuve.questions.some(q => q.id === question.id);
  if (!existe) {
    epreuve.questions.push({ ...question, reponseCandidat: null, estMarqueePourVerification: false });
  }
}

function retirerQuestion(index) {
  epreuve.questions.splice(index, 1);
}

function sauvegarderEpreuve() {
  alert('Épreuve enregistrée avec succès !');
  router.push('/banque-questions');
}
</script>
