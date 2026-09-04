import { defineStore } from 'pinia';
import { ROLES_UTILISATEURS } from '../donnees/donneesInitiales';

/**
 * Magasin Pinia pour la gestion de l'authentification et de la session utilisateur.
 * Permet également le basculement dynamique de rôle pour la démonstration.
 */
export const useMagasinAuthentification = defineStore('authentification', {
  state: () => ({
    // Rôle actuellement sélectionné (superadmin, companyadmin, consultant, candidate)
    roleActif: 'companyadmin',
    // Informations sur l'utilisateur connecté
    utilisateurConnecte: ROLES_UTILISATEURS.companyadmin.utilisateurDefaut,
    // Indique si l'utilisateur est authentifié
    estAuthentifie: true,
    // Mode sombre ou clair
    modeSombre: true,
  }),

  getters: {
    /**
     * Obtenir les métadonnées complètes du rôle actif
     */
    detailsRoleActif: (state) => ROLES_UTILISATEURS[state.roleActif] || ROLES_UTILISATEURS.companyadmin,
    
    /**
     * Vérifier si l'utilisateur courant est Super Admin
     */
    estSuperAdmin: (state) => state.roleActif === 'superadmin',

    /**
     * Vérifier si l'utilisateur courant est Admin Entreprise
     */
    estAdminEntreprise: (state) => state.roleActif === 'companyadmin',

    /**
     * Vérifier si l'utilisateur courant est Consultant / Évaluateur
     */
    estConsultant: (state) => state.roleActif === 'consultant',

    /**
     * Vérifier si l'utilisateur courant est un Candidat
     */
    estCandidat: (state) => state.roleActif === 'candidate',
  },

  actions: {
    /**
     * Changer le rôle actif et mettre à jour l'utilisateur simulé
     * @param {string} codeRole - Code du rôle (superadmin, companyadmin, consultant, candidate)
     */
    definirRoleActif(codeRole) {
      if (ROLES_UTILISATEURS[codeRole]) {
        this.roleActif = codeRole;
        this.utilisateurConnecte = { ...ROLES_UTILISATEURS[codeRole].utilisateurDefaut };
      }
    },

    /**
     * Basculer entre mode clair et mode sombre
     */
    basculerTheme() {
      this.modeSombre = !this.modeSombre;
      if (this.modeSombre) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    /**
     * Se déconnecter de la session
     */
    deconnexion() {
      this.estAuthentifie = false;
    },

    /**
     * Se connecter
     */
    connexion(codeRole) {
      this.definirRoleActif(codeRole);
      this.estAuthentifie = true;
    }
  }
});
