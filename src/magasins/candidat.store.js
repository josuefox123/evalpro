import { defineStore } from 'pinia';
import { CANDIDATS_INITIALS } from '../donnees/donneesInitiales';

/**
 * Magasin Pinia pour la gestion des candidats, des invitations et de l'import massif CSV/Excel.
 */
export const useMagasinCandidat = defineStore('candidat', {
  state: () => ({
    // Liste des candidats enregistrés
    candidats: [...CANDIDATS_INITIALS],
    // Candidat actuellement sélectionné
    candidatSelectionneId: 1,
    // Recherche par nom, prénom ou email
    rechercheTexte: '',
  }),

  getters: {
    /**
     * Candidats filtrés par le texte de recherche
     */
    candidatsFiltres: (state) => {
      return state.candidats.filter(c => {
        const nomComplet = `${c.prenom} ${c.nom}`.toLowerCase();
        const recherche = state.rechercheTexte.toLowerCase();
        return nomComplet.includes(recherche) || c.email.toLowerCase().includes(recherche) || c.poste.toLowerCase().includes(recherche);
      });
    },

    /**
     * Obtenir les détails du candidat sélectionné
     */
    candidatCourant: (state) => {
      return state.candidats.find(c => c.id === state.candidatSelectionneId) || state.candidats[0];
    }
  },

  actions: {
    /**
     * Ajouter un candidat manuellement
     * @param {Object} candidat 
     */
    ajouterCandidat(candidat) {
      const nouvelId = this.candidats.length > 0 ? Math.max(...this.candidats.map(c => c.id)) + 1 : 1;
      this.candidats.unshift({
        id: nouvelId,
        statutInvitation: 'non_envoyee',
        statutComposition: 'non_commencee',
        noteGlobale: null,
        classement: null,
        statutAdmission: 'en_attente',
        ...candidat
      });
    },

    /**
     * Importer un lot de candidats depuis un fichier (CSV / Excel)
     * @param {Array} listeImportee 
     */
    importerLotsCandidats(listeImportee) {
      let compteAjoutes = 0;
      listeImportee.forEach(nouveau => {
        // Vérification des doublons par email
        const existe = this.candidats.some(c => c.email.toLowerCase() === nouveau.email.toLowerCase());
        if (!existe) {
          const nouvelId = this.candidats.length > 0 ? Math.max(...this.candidats.map(c => c.id)) + 1 : 1;
          this.candidats.push({
            id: nouvelId,
            nom: nouveau.nom || 'Inconnu',
            prenom: nouveau.prenom || 'Inconnu',
            email: nouveau.email,
            telephone: nouveau.telephone || 'Non renseigné',
            poste: nouveau.poste || 'Développeur Web',
            statutInvitation: 'non_envoyee',
            statutComposition: 'non_commencee',
            noteGlobale: null,
            classement: null,
            statutAdmission: 'en_attente',
          });
          compteAjoutes++;
        }
      });
      return compteAjoutes;
    },

    /**
     * Envoyer une invitation sécurisée à un candidat
     * @param {number} candidatId 
     */
    envoyerInvitation(candidatId) {
      const candidat = this.candidats.find(c => c.id === candidatId);
      if (candidat) {
        candidat.statutInvitation = 'envoyee';
      }
    }
  }
});
