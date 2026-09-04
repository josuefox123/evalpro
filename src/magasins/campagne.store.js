import { defineStore } from 'pinia';
import { CAMPAGNES_INITIALES, ENTREPRISES_INITIALES } from '../donnees/donneesInitiales';

/**
 * Magasin Pinia pour la gestion des campagnes de recrutement et des statistiques d'entreprise.
 */
export const useMagasinCampagne = defineStore('campagne', {
  state: () => ({
    // Liste des campagnes de recrutement
    campagnes: [...CAMPAGNES_INITIALES],
    // Liste des entreprises clientes (pour SuperAdmin)
    entreprises: [...ENTREPRISES_INITIALES],
    // Campagne actuellement sélectionnée pour affichage/édition
    campagneSelectionneeId: 1,
    // Filtre de recherche
    rechercheTexte: '',
    // Filtre par statut
    filtreStatut: 'TOUS',
  }),

  getters: {
    /**
     * Liste des campagnes filtrées selon la recherche et le statut
     */
    campagnesFiltrees: (state) => {
      return state.campagnes.filter(campagne => {
        const correspondTexte = campagne.titre.toLowerCase().includes(state.rechercheTexte.toLowerCase()) ||
                                campagne.poste.toLowerCase().includes(state.rechercheTexte.toLowerCase()) ||
                                campagne.departement.toLowerCase().includes(state.rechercheTexte.toLowerCase());
        const correspondStatut = state.filtreStatut === 'TOUS' || campagne.statut === state.filtreStatut;
        return correspondTexte && correspondStatut;
      });
    },

    /**
     * Obtenir les détails de la campagne sélectionnée
     */
    campagneCourante: (state) => {
      return state.campagnes.find(c => c.id === state.campagneSelectionneeId) || state.campagnes[0];
    },

    /**
     * Obtenir des métriques globales pour l'entreprise
     */
    statistiquesGlobales: (state) => {
      const totalCandidats = state.campagnes.reduce((acc, c) => acc + c.candidatsCount, 0);
      const totalInvitations = state.campagnes.reduce((acc, c) => acc + c.invitationsEnvoyees, 0);
      const totalCompositions = state.campagnes.reduce((acc, c) => acc + c.compositionsRealisees, 0);
      const tauxParticipation = totalInvitations > 0 ? Math.round((totalCompositions / totalInvitations) * 100) : 0;
      
      return {
        totalCampagnes: state.campagnes.length,
        totalCandidats,
        totalInvitations,
        totalCompositions,
        tauxParticipation,
        incidentsDetectes: 28,
      };
    }
  },

  actions: {
    /**
     * Sélectionner une campagne par son ID
     * @param {number} id 
     */
    selectionnerCampagne(id) {
      this.campagneSelectionneeId = id;
    },

    /**
     * Ajouter une nouvelle campagne de recrutement
     * @param {Object} nouvelleCampagne 
     */
    ajouterCampagne(nouvelleCampagne) {
      const nouvelId = this.campagnes.length > 0 ? Math.max(...this.campagnes.map(c => c.id)) + 1 : 1;
      const campagneComplete = {
        id: nouvelId,
        candidatsCount: 0,
        invitationsEnvoyees: 0,
        compositionsRealisees: 0,
        progression: 0,
        statut: 'BROUILLON',
        ...nouvelleCampagne,
      };
      this.campagnes.unshift(campagneComplete);
      this.campagneSelectionneeId = nouvelId;
    },

    /**
     * Mettre à jour le statut d'une campagne (BROUILLON, ACTIVE, CLOTUREE, PUBLIEE, ARCHIVEE)
     * @param {number} id 
     * @param {string} nouveauStatut 
     */
    changerStatutCampagne(id, nouveauStatut) {
      const index = this.campagnes.findIndex(c => c.id === id);
      if (index !== -1) {
        this.campagnes[index].statut = nouveauStatut;
      }
    }
  }
});
