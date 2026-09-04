import { createRouter, createWebHistory } from 'vue-router';

// Importation des vues principales
import VueAccueil from '../vues/VueAccueil.vue';
import VueConnexion from '../vues/VueConnexion.vue';
import TableauDeBordSuperAdmin from '../vues/tableau-de-bord/TableauDeBordSuperAdmin.vue';
import TableauDeBordEntreprise from '../vues/tableau-de-bord/TableauDeBordEntreprise.vue';
import TableauDeBordConsultant from '../vues/tableau-de-bord/TableauDeBordConsultant.vue';
import TableauDeBordCandidat from '../vues/tableau-de-bord/TableauDeBordCandidat.vue';

// Importation des modules spécifiques
import VueCampagnes from '../vues/campagnes/VueCampagnes.vue';
import VueCreationCampagne from '../vues/campagnes/VueCreationCampagne.vue';
import VueGestionCandidats from '../vues/candidats/VueGestionCandidats.vue';
import VueBanqueQuestions from '../vues/epreuves/VueBanqueQuestions.vue';
import VueCreationEpreuve from '../vues/epreuves/VueCreationEpreuve.vue';
import VuePassageEpreuve from '../vues/epreuves/VuePassageEpreuve.vue';
import VueCorrectionCopies from '../vues/correction/VueCorrectionCopies.vue';
import VueClassementResultats from '../vues/resultats/VueClassementResultats.vue';

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: VueAccueil,
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: VueConnexion,
  },
  {
    path: '/tableau-de-bord/superadmin',
    name: 'TableauDeBordSuperAdmin',
    component: TableauDeBordSuperAdmin,
  },
  {
    path: '/tableau-de-bord/entreprise',
    name: 'TableauDeBordEntreprise',
    component: TableauDeBordEntreprise,
  },
  {
    path: '/tableau-de-bord/consultant',
    name: 'TableauDeBordConsultant',
    component: TableauDeBordConsultant,
  },
  {
    path: '/tableau-de-bord/candidat',
    name: 'TableauDeBordCandidat',
    component: TableauDeBordCandidat,
  },
  {
    path: '/campagnes',
    name: 'Campagnes',
    component: VueCampagnes,
  },
  {
    path: '/campagnes/nouvelle',
    name: 'CreationCampagne',
    component: VueCreationCampagne,
  },
  {
    path: '/candidats',
    name: 'GestionCandidats',
    component: VueGestionCandidats,
  },
  {
    path: '/banque-questions',
    name: 'BanqueQuestions',
    component: VueBanqueQuestions,
  },
  {
    path: '/epreuves/creation',
    name: 'CreationEpreuve',
    component: VueCreationEpreuve,
  },
  {
    path: '/epreuves/passage',
    name: 'PassageEpreuve',
    component: VuePassageEpreuve,
  },
  {
    path: '/correction',
    name: 'CorrectionCopies',
    component: VueCorrectionCopies,
  },
  {
    path: '/resultats',
    name: 'ClassementResultats',
    component: VueClassementResultats,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
