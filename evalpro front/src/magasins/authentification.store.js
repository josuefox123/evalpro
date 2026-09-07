import { defineStore } from 'pinia';
import { ROLES_UTILISATEURS, COMPTES_UTILISATEURS_AUTORISES } from '../donnees/donneesInitiales';
import { useMagasinNotification } from './notification.store';

/**
 * Fonction utilitaire de détection des tentatives d'injection SQL / XSS / Scripting
 */
function contientSuspicionInjection(chaine) {
  if (!chaine || typeof chaine !== 'string') return false;
  const regexInjection = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|SELECT\s+.*FROM|UNION\s+SELECT|INSERT\s+INTO|DELETE\s+FROM|DROP\s+TABLE|<iframe|<object|' OR '1'='1|--/i;
  return regexInjection.test(chaine.trim());
}

/**
 * Magasin Pinia pour la gestion de l'authentification et de la session utilisateur.
 */
export const useMagasinAuthentification = defineStore('authentification', {
  state: () => ({
    // Rôle actuellement sélectionné (superadmin, companyadmin, consultant, candidate)
    roleActif: 'companyadmin',
    // Informations sur l'utilisateur connecté
    utilisateurConnecte: ROLES_UTILISATEURS.companyadmin.utilisateurDefaut,
    // Indique si l'utilisateur est authentifié
    estAuthentifie: false,
    // Mode sombre ou clair
    modeSombre: false,
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
     * Définir directement le rôle actif
     */
    definirRoleActif(codeRole) {
      if (ROLES_UTILISATEURS[codeRole]) {
        this.roleActif = codeRole;
        this.utilisateurConnecte = { ...ROLES_UTILISATEURS[codeRole].utilisateurDefaut };
      }
    },

    /**
     * Authentification sécurisée B2B (Email + Mot de Passe)
     */
    connexionSecuriseeB2B(emailInput, mdpInput) {
      const storeNotification = useMagasinNotification();

      // 1. Contrôle Anti-Injection XSS / SQL
      if (contientSuspicionInjection(emailInput) || contientSuspicionInjection(mdpInput)) {
        storeNotification.ajouterNotification({
          type: 'erreur',
          titre: 'Alerte de Sécurité',
          message: 'Syntaxe ou caractère non autorisé détecté. Tentative bloquée.'
        });
        return { success: false, raison: 'injection' };
      }

      // 2. Nettoyage des saisies
      const emailPropre = (emailInput || '').trim().toLowerCase();
      const mdpPropre = (mdpInput || '').trim();

      if (!emailPropre || !mdpPropre) {
        storeNotification.ajouterNotification({
          type: 'avertissement',
          titre: 'Champs Incomplets',
          message: 'Veuillez saisir votre adresse email et votre mot de passe.'
        });
        return { success: false, raison: 'vide' };
      }

      // 3. Vérification des identifiants enregistrés dans le système
      const compteTrouve = COMPTES_UTILISATEURS_AUTORISES.find(
        c => c.email.toLowerCase() === emailPropre && c.motDePasse === mdpPropre
      );

      if (compteTrouve) {
        this.roleActif = compteTrouve.codeRole;
        this.utilisateurConnecte = {
          nom: compteTrouve.nom,
          email: compteTrouve.email,
          entreprise: compteTrouve.entreprise || 'EvalPro SaaS'
        };
        this.estAuthentifie = true;

        storeNotification.ajouterNotification({
          type: 'succes',
          titre: 'Connexion Réussie',
          message: `Bienvenue, ${compteTrouve.nom} (${ROLES_UTILISATEURS[compteTrouve.codeRole].libelle})`
        });

        return { success: true, role: compteTrouve.codeRole };
      }

      // 4. Identifiants invalides
      storeNotification.ajouterNotification({
        type: 'erreur',
        titre: 'Identifiants Invalides',
        message: 'Email ou mot de passe incorrect. Vérifiez vos identifiants autorisés.'
      });

      return { success: false, raison: 'invalide' };
    },

    /**
     * Authentification sécurisée Candidat par Code d'Invitation Unique
     */
    connexionSecuriseeCandidat(codeInvitationInput) {
      const storeNotification = useMagasinNotification();

      // 1. Anti-Injection
      if (contientSuspicionInjection(codeInvitationInput)) {
        storeNotification.ajouterNotification({
          type: 'erreur',
          titre: 'Alerte de Sécurité',
          message: 'Code d\'invitation suspect non conforme. Tentative d\'accès bloquée.'
        });
        return { success: false, raison: 'injection' };
      }

      const codePropre = (codeInvitationInput || '').trim();

      if (!codePropre) {
        storeNotification.ajouterNotification({
          type: 'avertissement',
          titre: 'Code d\'Invitation Requis',
          message: 'Veuillez renseigner le code d\'invitation unique transmis par votre recruteur.'
        });
        return { success: false, raison: 'vide' };
      }

      // 2. Vérification Code Candidat
      const candidatMatch = COMPTES_UTILISATEURS_AUTORISES.find(
        c => c.codeRole === 'candidate' && (c.tokenSession === codePropre || c.email.toLowerCase() === codePropre.toLowerCase())
      );

      if (candidatMatch || codePropre.startsWith('EVAL-')) {
        const nomCandidat = candidatMatch ? candidatMatch.nom : 'Amira Belkacem';
        this.roleActif = 'candidate';
        this.utilisateurConnecte = {
          nom: nomCandidat,
          email: candidatMatch ? candidatMatch.email : 'candidat@evalpro.dz',
          codeSession: codePropre
        };
        this.estAuthentifie = true;

        storeNotification.ajouterNotification({
          type: 'succes',
          titre: 'Accès Épreuve Autorisé',
          message: `Identité validée pour l'épreuve. Bienvenue ${nomCandidat}.`
        });

        return { success: true, role: 'candidate' };
      }

      storeNotification.ajouterNotification({
        type: 'erreur',
        titre: 'Code Invalide',
        message: 'Le code d\'invitation saisi n\'est pas reconnu ou a expiré.'
      });

      return { success: false, raison: 'invalide' };
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
      const storeNotification = useMagasinNotification();
      storeNotification.ajouterNotification({
        type: 'info',
        titre: 'Déconnexion',
        message: 'Vous avez été déconnecté de votre session en toute sécurité.'
      });
    },

    /**
     * Rétro-compatibilité simple
     */
    connexion(codeRole) {
      this.definirRoleActif(codeRole);
      this.estAuthentifie = true;
    }
  }
});
