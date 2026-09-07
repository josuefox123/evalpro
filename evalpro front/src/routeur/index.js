import { createRouter, createWebHistory } from 'vue-router';
import { useMagasinAuthentification } from '../magasins/authentification.store';
import { useMagasinNotification } from '../magasins/notification.store';

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
import VueVerificationTechnique from '../vues/candidat/VueVerificationTechnique.vue';
import VueAccesCandidat from '../vues/candidat/VueAccesCandidat.vue';
import VueConfirmationSoumission from '../vues/candidat/VueConfirmationSoumission.vue';

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: VueAccueil,
    meta: { estPublic: true, standalone: true }
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: VueConnexion,
    meta: { estPublic: true, standalone: true }
  },
  {
    path: '/acces-candidat',
    name: 'AccesCandidat',
    component: VueAccesCandidat,
    meta: { estPublic: true, standalone: true }
  },
  {
    path: '/tableau-de-bord/superadmin',
    name: 'TableauDeBordSuperAdmin',
    component: TableauDeBordSuperAdmin,
    meta: { requiertAuth: true, roleAutorise: 'superadmin' }
  },
  {
    path: '/tableau-de-bord/entreprise',
    name: 'TableauDeBordEntreprise',
    component: TableauDeBordEntreprise,
    meta: { requiertAuth: true, roleAutorise: 'companyadmin' }
  },
  {
    path: '/tableau-de-bord/consultant',
    name: 'TableauDeBordConsultant',
    component: TableauDeBordConsultant,
    meta: { requiertAuth: true, roleAutorise: 'consultant' }
  },
  {
    path: '/tableau-de-bord/candidat',
    name: 'TableauDeBordCandidat',
    component: TableauDeBordCandidat,
    meta: { requiertAuth: true, roleAutorise: 'candidate' }
  },
  {
    path: '/candidat/verification',
    name: 'VerificationTechnique',
    component: VueVerificationTechnique,
    meta: { requiertAuth: true, standalone: true }
  },
  {
    path: '/candidat/confirmation',
    name: 'ConfirmationSoumission',
    component: VueConfirmationSoumission,
    meta: { requiertAuth: true, standalone: true, roleAutorise: 'candidate' }
  },
  {
    path: '/campagnes',
    name: 'Campagnes',
    component: VueCampagnes,
    meta: { requiertAuth: true }
  },
  {
    path: '/campagnes/nouvelle',
    name: 'CreationCampagne',
    component: VueCreationCampagne,
    meta: { requiertAuth: true }
  },
  {
    path: '/candidats',
    name: 'GestionCandidats',
    component: VueGestionCandidats,
    meta: { requiertAuth: true }
  },
  {
    path: '/banque-questions',
    name: 'BanqueQuestions',
    component: VueBanqueQuestions,
    meta: { requiertAuth: true }
  },
  {
    path: '/epreuves/creation',
    name: 'CreationEpreuve',
    component: VueCreationEpreuve,
    meta: { requiertAuth: true }
  },
  {
    path: '/epreuves/passage',
    name: 'PassageEpreuve',
    component: VuePassageEpreuve,
    meta: { requiertAuth: true, standalone: true }
  },
  {
    path: '/correction',
    name: 'CorrectionCopies',
    component: VueCorrectionCopies,
    meta: { requiertAuth: true }
  },
  {
    path: '/resultats',
    name: 'ClassementResultats',
    component: VueClassementResultats,
    meta: { requiertAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

/**
 * Guard de navigation global pour la sécurité Vue.js & la séparation stricte des rôles
 */
router.beforeEach((to, from, next) => {
  const magasinAuth = useMagasinAuthentification();
  const magasinNotif = useMagasinNotification();

  // 1. Vérification de l'authentification
  if (to.meta.requiertAuth && !magasinAuth.estAuthentifie) {
    magasinNotif.ajouterNotification({
      type: 'erreur',
      titre: 'Accès Bloqué',
      message: 'Veuillez vous connecter avec vos identifiants autorisés pour accéder à cet espace.'
    });
    return next('/connexion');
  }

  // 2. Isolation stricte du rôle candidat : les candidats ne peuvent pas accéder aux routes d'administration B2B
  const routesAdministrativesB2B = [
    '/resultats', '/campagnes', '/candidats', '/banque-questions',
    '/correction', '/tableau-de-bord/superadmin', '/tableau-de-bord/entreprise',
    '/tableau-de-bord/consultant'
  ];

  if (magasinAuth.estCandidat && routesAdministrativesB2B.includes(to.path)) {
    magasinNotif.ajouterNotification({
      type: 'avertissement',
      titre: 'Accès Restreint',
      message: 'Les résultats globaux et le classement sont réservés aux évaluateurs et recruteurs d\'entreprise.'
    });
    return next('/tableau-de-bord/candidat');
  }

  next();
});

export default router;
