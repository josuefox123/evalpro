<template>
  <!--
    FormulaireCampagne.vue - Formulaire de création / modification de campagne EvalPro
  -->
  <form @submit.prevent="soumettreFormulaire" class="space-y-6">

    <div>
      <EpInput
        v-model="formulaire.titre"
        label="Titre de la Campagne"
        required
        placeholder="ex: Recrutement Développeurs Full-Stack 2025"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <EpInput
          v-model="formulaire.poste"
          label="Poste Concerné"
          required
          placeholder="ex: Développeur Senior"
        />
      </div>

      <div>
        <EpSelect
          v-model="formulaire.departement"
          label="Département"
          required
        >
          <option value="Ingénierie & Informatique">Ingénierie & Informatique</option>
          <option value="Finance & Comptabilité">Finance & Comptabilité</option>
          <option value="Ventes & Business Development">Ventes & Business Development</option>
          <option value="Ressources Humaines">Ressources Humaines</option>
          <option value="Marketing & Communication">Marketing & Communication</option>
        </EpSelect>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <EpInput
          v-model.number="formulaire.nbPostes"
          type="number"
          label="Nombre de Postes"
          placeholder="1"
        />
      </div>

      <div>
        <EpInput
          v-model="formulaire.dateDebut"
          type="date"
          label="Date d'Ouverture"
        />
      </div>

      <div>
        <EpInput
          v-model="formulaire.dateCloture"
          type="date"
          label="Date de Clôture"
        />
      </div>
    </div>

    <div>
      <EpSelect
        v-model="formulaire.consultantAssigne"
        label="Consultant Évaluateur Assigné"
      >
        <option value="Dr. Karim Benali">Dr. Karim Benali (Informatique & Dev)</option>
        <option value="Prof. Sara Aït-Kaci">Prof. Sara Aït-Kaci (Finance & Audit)</option>
        <option value="Dr. Mehdi Rahmani">Dr. Mehdi Rahmani (Data Science & IA)</option>
      </EpSelect>
    </div>

    <div class="pt-4 flex items-center justify-end gap-3 border-t border-ep-border">
      <EpButton type="button" variant="outline" size="md" @click="$emit('annuler')">
        Annuler
      </EpButton>

      <EpButton type="submit" variant="primary" size="md" iconLeft="check">
        Créer la Campagne
      </EpButton>
    </div>

  </form>
</template>

<script setup>
import { reactive } from 'vue';
import EpInput from '../systeme/EpInput.vue';
import EpSelect from '../systeme/EpSelect.vue';
import EpButton from '../systeme/EpButton.vue';

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
