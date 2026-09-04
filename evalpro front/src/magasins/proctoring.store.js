import { defineStore } from 'pinia';

/**
 * Magasin Pinia pour la surveillance anti-fraude (Proctoring Levels 1, 2, 3).
 * Journalise les événements suspects pendant la composition d'un candidat.
 */
export const useMagasinProctoring = defineStore('proctoring', {
  state: () => ({
    // Niveau de sécurité actif (1: Standard, 2: Proctoring Automatisé avec Webcam, 3: Surveillance Avancée)
    niveauSecurite: 2,
    // État de la webcam et du microphone
    webcamActive: true,
    microActif: true,
    // Compteur de perte de focus du navigateur (changement d'onglet / écran)
    pertesDeFocusCount: 1,
    // Tentatives de copier-coller bloquées
    tentativesCopierCollerCount: 2,
    // Journal des événements de surveillance enregistrés
    journalEvenements: [
      { id: 1, horodatage: '14:32:05', type: 'INFO', message: 'Démarrage de la session sous surveillance Niveau 2' },
      { id: 2, horodatage: '14:38:12', type: 'AVERTISSEMENT', message: 'Désactivation temporaire du clic droit bloquée' },
      { id: 3, horodatage: '14:41:50', type: 'ALERTE', message: 'Détection de perte de focus de la fenêtre d\'examen' },
    ],
    // Score global de confiance / intégrité de la session (0 à 100%)
    scoreIntegrite: 92,
  }),

  actions: {
    /**
     * Enregistrer une violation de sécurité ou un événement suspect
     * @param {string} type - INFO, AVERTISSEMENT, ALERTE
     * @param {string} message - Description de l'événement
     */
    enregistrerEvenement(type, message) {
      const heureActuelle = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const nouvelId = this.journalEvenements.length + 1;
      
      this.journalEvenements.unshift({
        id: nouvelId,
        horodatage: heureActuelle,
        type,
        message,
      });

      // Ajuster le score d'intégrité selon la gravité
      if (type === 'ALERTE') {
        this.scoreIntegrite = Math.max(0, this.scoreIntegrite - 5);
        this.pertesDeFocusCount++;
      } else if (type === 'AVERTISSEMENT') {
        this.scoreIntegrite = Math.max(0, this.scoreIntegrite - 2);
        this.tentativesCopierCollerCount++;
      }
    },

    /**
     * Basculer le statut de la webcam simulée
     */
    basculerWebcam() {
      this.webcamActive = !this.webcamActive;
      this.enregistrerEvenement(
        this.webcamActive ? 'INFO' : 'ALERTE',
        this.webcamActive ? 'Webcam réactivée par le candidat' : 'Webcam désactivée ou obstruction détectée'
      );
    }
  }
});
