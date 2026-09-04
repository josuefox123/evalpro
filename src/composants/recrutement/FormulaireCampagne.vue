<template>
  <!-- 
    Formulaire de création et d'édition de campagne de recrutement.
    Permet à l'Admin Entreprise d'indiquer l'intitulé, le département,
    le nombre de postes et le consultant responsable.
  -->
  <form @submit.prevent="soumettreFormulaire" class="space-y-5">
    
    <div>
      <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Titre de la Campagne *</label>
      <input 
        v-model="formulaire.titre" 
        type="text" 
        required 
        placeholder="ex: Recrutement Développeurs Full-Stack 2025" 
        class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Poste Concerné *</label>
        <input 
          v-model="formulaire.poste" 
          type="text" 
          required 
          placeholder="ex: Développeur Senior" 
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Département *</label>
        <select 
          v-model="formulaire.departement" 
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="Ingénierie & Informatique">Ingénierie & Informatique</option>
          <option value="Finance & Comptabilité">Finance & Comptabilité</option>
          <option value="Ventes & Business Development">Ventes & Business Development</option>
          <option value="Ressources Humaines">Ressources Humaines</option>
          <option value="Marketing & Communication">Marketing & Communication</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nombre de Postes</label>
        <input 
          v-model.number="formulaire.nbPostes" 
          type="number" 
          min="1" 
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Date d'Ouverture</label>
        <input 
          v-model="formulaire.dateDebut" 
          type="date" 
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Date de Clôture</label>
        <input 
          v-model="formulaire.dateCloture" 
          type="date" 
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
    </div>

    <div>
      <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Consultant Évaluateur Assigné</label>
      <select 
        v-model="formulaire.consultantAssigne" 
        class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
      >
        <option value="Dr. Karim Benali">Dr. Karim Benali (Informatique & Dev)</option>
        <option value="Prof. Sara Aït-Kaci">Prof. Sara Aït-Kaci (Finance & Audit)</option>
        <option value="Dr. Mehdi Rahmani">Dr. Mehdi Rahmani (Data Science & IA)</option>
      </select>
    </div>

    <div class="pt-4 flex items-center justify-end space-x-3 border-t border-slate-800">
      <button 
        type="button" 
        @click="$emit('annuler')" 
        class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
      >
        Annuler
      </button>

      <button 
        type="submit" 
        class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
      >
        <span class="material-symbols-outlined text-base">check</span>
        <span>Créer la Campagne</span>
      </button>
    </div>

  </form>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['enregistrer', 'annuler']);

const formulaire = reactive({
  titre: '',
  poste: '',
  departement: 'Ingénierie & Informatique',
  nbPostes: 1,
  dateDebut: new Date().toISOString().substring(0, 10),
  dateCloture: '2025-02-28',
  consultantAssigne: 'Dr. Karim Benali',
});

function soumettreFormulaire() {
  emit('enregistrer', { ...formulaire });
}
</script>
