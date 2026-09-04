import { defineStore } from 'pinia';
import { BANQUE_QUESTIONS_INITIALES } from '../donnees/donneesInitiales';

/**
 * Magasin Pinia pour la Banque de questions et la Concepteur d'Épreuves.
 */
export const useMagasinEpreuve = defineStore('epreuve', {
  state: () => ({
    // Banque de questions disponibles
    banqueQuestions: [...BANQUE_QUESTIONS_INITIALES],
    // Épreuve en cours de création ou de passage
    epreuveActive: {
      id: 101,
      titre: 'Épreuve Technique Full-Stack Senior',
      dureeMinutes: 45,
      noteTotale: 20,
      consignes: 'Veuillez lire attentivement chaque question. L\'utilisation de documents externes est strictement interdite. Votre webcam et votre écran sont enregistrés.',
      questions: [
        {
          id: 1,
          titre: 'Complexité Algorithmique de Quicksort',
          enonce: 'Quelle est la complexité temporelle moyenne d\'un algorithme de tri rapide (Quicksort) ?',
          type: 'qcm',
          points: 3,
          tempsMaxSeconde: 180,
          options: [
            { id: 'a', texte: 'O(n)' },
            { id: 'b', texte: 'O(n log n)' },
            { id: 'c', texte: 'O(n²)' },
            { id: 'd', texte: 'O(log n)' },
          ],
          reponseCandidat: null,
          estMarqueePourVerification: false,
        },
        {
          id: 2,
          titre: 'Explication des Closures en JavaScript',
          enonce: 'Expliquez clairement le principe d\'une closure (fermeture) en JavaScript et donnez un cas d\'usage concret.',
          type: 'reponse_courte',
          points: 4,
          tempsMaxSeconde: 300,
          reponseCandidat: '',
          estMarqueePourVerification: false,
        },
        {
          id: 3,
          titre: 'Requête SQL d\'Agrégation et Filtre',
          enonce: 'Écrivez la requête SQL pour obtenir les 3 clients ayant généré le plus grand chiffre d\'affaires au cours des 12 derniers mois.',
          type: 'sql',
          points: 5,
          tempsMaxSeconde: 600,
          reponseCandidat: 'SELECT client_id, SUM(montant) FROM commandes GROUP BY client_id ORDER BY SUM(montant) DESC LIMIT 3;',
          estMarqueePourVerification: false,
        },
        {
          id: 4,
          titre: 'Algorithme de Palindrome en Python',
          enonce: 'Implémentez une fonction `est_palindrome(chaine)` qui retourne True si la chaîne transmise est un palindrome (sans tenir compte de la casse).',
          type: 'code',
          points: 8,
          tempsMaxSeconde: 900,
          modeleCode: 'def est_palindrome(chaine: str) -> bool:\n    # Votre code ici\n    chaine_nettoyee = chaine.lower()\n    return chaine_nettoyee == chaine_nettoyee[::-1]',
          reponseCandidat: 'def est_palindrome(chaine: str) -> bool:\n    chaine = chaine.lower()\n    return chaine == chaine[::-1]',
          estMarqueePourVerification: false,
        }
      ]
    },
    // Filtres banque de questions
    domaineFiltre: 'TOUS',
    typeFiltre: 'TOUS',
    difficulteFiltre: 'TOUS',
    rechercheQuestionTexte: '',
  }),

  getters: {
    /**
     * Questions de la banque filtrées
     */
    questionsFiltrees: (state) => {
      return state.banqueQuestions.filter(q => {
        const matchTexte = q.titre.toLowerCase().includes(state.rechercheQuestionTexte.toLowerCase()) ||
                           q.enonce.toLowerCase().includes(state.rechercheQuestionTexte.toLowerCase());
        const matchDomaine = state.domaineFiltre === 'TOUS' || q.domaine === state.domaineFiltre;
        const matchType = state.typeFiltre === 'TOUS' || q.type === state.typeFiltre;
        const matchDifficulte = state.difficulteFiltre === 'TOUS' || q.difficulte === state.difficulteFiltre;
        return matchTexte && matchDomaine && matchType && matchDifficulte;
      });
    },

    /**
     * Obtenir le nombre total de questions de l'épreuve active
     */
    nombreTotalQuestionsEpreuve: (state) => state.epreuveActive.questions.length,

    /**
     * Obtenir le total des points de l'épreuve active
     */
    pointsTotauxEpreuve: (state) => state.epreuveActive.questions.reduce((sum, q) => sum + q.points, 0),
  },

  actions: {
    /**
     * Ajouter une nouvelle question à la banque
     * @param {Object} question 
     */
    ajouterQuestionBanque(question) {
      const nouvelId = this.banqueQuestions.length > 0 ? Math.max(...this.banqueQuestions.map(q => q.id)) + 1 : 1;
      this.banqueQuestions.unshift({
        id: nouvelId,
        auteur: 'Dr. Karim Benali',
        langue: 'Français',
        ...question
      });
    },

    /**
     * Enregistrer la réponse d'un candidat à une question spécifique de l'épreuve
     * @param {number} questionId 
     * @param {any} reponse 
     */
    enregistrerReponseCandidat(questionId, reponse) {
      const question = this.epreuveActive.questions.find(q => q.id === questionId);
      if (question) {
        question.reponseCandidat = reponse;
      }
    },

    /**
     * Marquer ou démarquer une question pour vérification ultérieure par le candidat
     * @param {number} questionId 
     */
    basculerMarquageQuestion(questionId) {
      const question = this.epreuveActive.questions.find(q => q.id === questionId);
      if (question) {
        question.estMarqueePourVerification = !question.estMarqueePourVerification;
      }
    }
  }
});
