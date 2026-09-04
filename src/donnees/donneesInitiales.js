/**
 * DonneesInitiales.js
 * Source de données fictives enrichie pour la démonstration d'EvalPro.
 * Contient les informations relatives aux 4 profils d'utilisateurs, aux campagnes,
 * aux banques de questions, aux candidats, aux corrections et aux statistiques.
 */

// Informations sur les 4 rôles d'utilisateurs disponibles dans EvalPro
export const ROLES_UTILISATEURS = {
  superadmin: {
    code: 'superadmin',
    libelle: 'Super Administrateur',
    description: 'Gestionnaire principal du SaaS, abonnements et sécurité globale',
    icone: 'admin_panel_settings',
    couleur: 'bg-purple-600',
    utilisateurDefaut: {
      nom: 'Kamel Meziane',
      email: 'kamel.meziane@evalpro.dz',
      entreprise: 'EvalPro HQ',
    }
  },
  companyadmin: {
    code: 'companyadmin',
    libelle: 'Administrateur Entreprise',
    description: 'Responsable du recrutement et des campagnes de son entreprise',
    icone: 'domain',
    couleur: 'bg-indigo-600',
    utilisateurDefaut: {
      nom: 'Samira Hadjab',
      email: 's.hadjab@techcorp.dz',
      entreprise: 'TechCorp Algérie',
    }
  },
  consultant: {
    code: 'consultant',
    libelle: 'Consultant / Évaluateur',
    description: 'Concepteur de questions, examens et correcteur de copies',
    icone: 'edit_note',
    couleur: 'bg-emerald-600',
    utilisateurDefaut: {
      nom: 'Dr. Karim Benali',
      email: 'k.benali@evalpro.dz',
      entreprise: 'Cabinet Expert RH',
    }
  },
  candidate: {
    code: 'candidate',
    libelle: 'Candidat',
    description: 'Accès sécurisé par invitation unique pour le passage d\'épreuve',
    icone: 'person_outline',
    couleur: 'bg-amber-600',
    utilisateurDefaut: {
      nom: 'Amira Belkacem',
      email: 'amira.b@gmail.com',
      codeSession: 'EVAL-2025-8942',
    }
  }
};

// Liste des entreprises souscrites pour la vue Super Administrateur
export const ENTREPRISES_INITIALES = [
  { id: 1, nom: 'TechCorp Algérie', sigle: 'TC', plan: 'Enterprise', utilisateurs: 45, campagnes: 12, candidats: 384, statut: 'actif', mrr: 4500, dateInscription: '15 Jan 2024' },
  { id: 2, nom: 'Banque Nationale', sigle: 'BN', plan: 'Professionnel', utilisateurs: 28, campagnes: 8, candidats: 212, statut: 'actif', mrr: 2800, dateInscription: '22 Mar 2024' },
  { id: 3, nom: 'Sonatrach RH', sigle: 'SN', plan: 'Enterprise', utilisateurs: 67, campagnes: 19, candidats: 891, statut: 'actif', mrr: 6700, dateInscription: '10 Fév 2023' },
  { id: 4, nom: 'Air Algérie', sigle: 'AA', plan: 'Professionnel', utilisateurs: 34, campagnes: 6, candidats: 178, statut: 'suspendu', mrr: 3400, dateInscription: '05 Avr 2024' },
  { id: 5, nom: 'Djezzy Telecom', sigle: 'DT', plan: 'Débutant', utilisateurs: 15, campagnes: 3, candidats: 67, statut: 'essai', mrr: 990, dateInscription: '12 Jun 2024' },
  { id: 6, nom: 'Cevital Group', sigle: 'CV', plan: 'Enterprise', utilisateurs: 89, campagnes: 24, candidats: 1247, statut: 'actif', mrr: 8900, dateInscription: '01 Sep 2022' },
];

// Liste des campagnes de recrutement initiales
export const CAMPAGNES_INITIALES = [
  {
    id: 1,
    titre: 'Recrutement Développeurs Full-Stack',
    poste: 'Développeur Web Full-Stack Senior',
    departement: 'Ingénierie & Informatique',
    nbPostes: 10,
    statut: 'ACTIVE',
    candidatsCount: 47,
    invitationsEnvoyees: 45,
    compositionsRealisees: 32,
    consultantAssigne: 'Dr. Karim Benali',
    dateDebut: '2025-01-05',
    dateCloture: '2025-01-25',
    progression: 68,
  },
  {
    id: 2,
    titre: 'Concours Analyste Financier Senior',
    poste: 'Analyste Financier',
    departement: 'Finance & Comptabilité',
    nbPostes: 5,
    statut: 'BROUILLON',
    candidatsCount: 89,
    invitationsEnvoyees: 0,
    compositionsRealisees: 0,
    consultantAssigne: 'Prof. Sara Aït-Kaci',
    dateDebut: '2025-01-20',
    dateCloture: '2025-02-15',
    progression: 0,
  },
  {
    id: 3,
    titre: 'Sélection Ingénieurs DevOps & Cloud',
    poste: 'Ingénieur DevOps',
    departement: 'Infrastructure',
    nbPostes: 3,
    statut: 'CLOTUREE',
    candidatsCount: 23,
    invitationsEnvoyees: 23,
    compositionsRealisees: 23,
    consultantAssigne: 'Dr. Karim Benali',
    dateDebut: '2024-12-01',
    dateCloture: '2025-01-08',
    progression: 100,
  },
  {
    id: 4,
    titre: 'Examen Commercial Grands Comptes',
    poste: 'Ingénieur Commercial',
    departement: 'Ventes & Business Development',
    nbPostes: 8,
    statut: 'PUBLIEE',
    candidatsCount: 156,
    invitationsEnvoyees: 150,
    compositionsRealisees: 142,
    consultantAssigne: 'Prof. Sara Aït-Kaci',
    dateDebut: '2024-12-10',
    dateCloture: '2025-01-12',
    progression: 95,
  }
];

// Banque de questions réutilisables avec classification par domaines et types
export const BANQUE_QUESTIONS_INITIALES = [
  {
    id: 1,
    titre: 'Complexité Algorithmique de Quicksort',
    enonce: 'Quelle est la complexité temporelle moyenne d\'un algorithme de tri rapide (Quicksort) ?',
    type: 'qcm',
    domaine: 'Informatique',
    sousDomaine: 'Algorithmique',
    difficulte: 'Moyenne',
    points: 2,
    auteur: 'Dr. Karim Benali',
    langue: 'Français',
    options: [
      { id: 'a', texte: 'O(n)', correcte: false },
      { id: 'b', texte: 'O(n log n)', correcte: true },
      { id: 'c', texte: 'O(n²)', correcte: false },
      { id: 'd', texte: 'O(log n)', correcte: false },
    ]
  },
  {
    id: 2,
    titre: 'Explication des Closures en JavaScript',
    enonce: 'Expliquez clairement le principe d\'une closure (fermeture) en JavaScript et donnez un cas d\'usage concré.',
    type: 'reponse_courte',
    domaine: 'Informatique',
    sousDomaine: 'JavaScript',
    difficulte: 'Moyenne',
    points: 4,
    auteur: 'Dr. Karim Benali',
    langue: 'Français',
    explicationAttendue: 'Une closure est la combinaison d\'une fonction regroupée avec des références à son état environnant (l\'environnement lexical).',
  },
  {
    id: 3,
    titre: 'Requête SQL d\'Agrégation et Filtre',
    enonce: 'Écrivez la requête SQL pour obtenir les 3 clients ayant généré le plus grand chiffre d\'affaires au cours des 12 derniers mois.',
    type: 'sql',
    domaine: 'Informatique',
    sousDomaine: 'Bases de Données',
    difficulte: 'Difficile',
    points: 6,
    auteur: 'Prof. Sara Aït-Kaci',
    langue: 'Français',
    solutionCode: 'SELECT client_id, SUM(montant) as total_ca FROM commandes WHERE date_commande >= DATE_SUB(NOW(), INTERVAL 1 YEAR) GROUP BY client_id ORDER BY total_ca DESC LIMIT 3;',
  },
  {
    id: 4,
    titre: 'Typage et Variables en Python',
    enonce: 'En Python, les listes sont des structures de données mutables.',
    type: 'vrai_faux',
    domaine: 'Informatique',
    sousDomaine: 'Python',
    difficulte: 'Facile',
    points: 1,
    auteur: 'Dr. Mehdi Rahmani',
    langue: 'Français',
    reponseVraiFaux: true,
  },
  {
    id: 5,
    titre: 'Algorithme de Palindrome en Python',
    enonce: 'Implémentez une fonction `est_palindrome(chaine)` qui retourne True si la chaîne transmise est un palindrome (sans tenir compte de la casse).',
    type: 'code',
    domaine: 'Informatique',
    sousDomaine: 'Python',
    difficulte: 'Difficile',
    points: 8,
    auteur: 'Dr. Karim Benali',
    langue: 'Français',
    modeleCode: 'def est_palindrome(chaine: str) -> bool:\n    # Votre code ici\n    pass',
  }
];

// Liste des candidats pour la démonstration
export const CANDIDATS_INITIALS = [
  { id: 1, nom: 'Belkacem', prenom: 'Amira', email: 'amira.b@gmail.com', telephone: '+213 550 12 34 56', poste: 'Développeur Web Full-Stack Senior', statutInvitation: 'envoyee', statutComposition: 'terminee', noteGlobale: 94.5, classement: 1, statutAdmission: 'admis' },
  { id: 2, nom: 'Ouali', prenom: 'Yacine', email: 'y.ouali@yahoo.fr', telephone: '+213 661 98 76 54', poste: 'Développeur Web Full-Stack Senior', statutInvitation: 'envoyee', statutComposition: 'terminee', noteGlobale: 91.2, classement: 2, statutAdmission: 'admis' },
  { id: 3, nom: 'Djaballah', prenom: 'Lina', email: 'l.djaballah@outlook.com', telephone: '+213 770 44 55 66', poste: 'Développeur Web Full-Stack Senior', statutInvitation: 'envoyee', statutComposition: 'terminee', noteGlobale: 88.7, classement: 3, statutAdmission: 'admis' },
  { id: 4, nom: 'Mekki', prenom: 'Sofiane', email: 's.mekki@gmail.com', telephone: '+213 554 11 22 33', poste: 'Développeur Web Full-Stack Senior', statutInvitation: 'envoyee', statutComposition: 'en_cours', noteGlobale: null, classement: null, statutAdmission: 'en_attente' },
  { id: 5, nom: 'Chikh', prenom: 'Nadia', email: 'n.chikh@gmail.com', telephone: '+213 662 33 44 55', poste: 'Analyste Financier', statutInvitation: 'non_envoyee', statutComposition: 'non_commencee', noteGlobale: null, classement: null, statutAdmission: 'en_attente' },
];

// Logs système d'audit pour le Super Administrateur
export const LOGS_SYSTEME_INITIALS = [
  { id: 1, horodatage: '2025-01-14 14:32:10', type: 'securite', evenement: 'Connexion SuperAdmin reussie', adresseIp: '197.200.12.44', utilisateur: 'Kamel Meziane' },
  { id: 2, horodatage: '2025-01-14 13:15:00', type: 'campagne', evenement: 'Publication de la campagne #4 (Commercial)', adresseIp: '105.101.4.18', utilisateur: 'Samira Hadjab' },
  { id: 3, horodatage: '2025-01-14 11:45:22', type: 'surveillance', evenement: 'Alerte anti-fraude: Perte de focus navigateur (Candidat ID #4)', adresseIp: '41.201.88.90', utilisateur: 'Sofiane Mekki' },
  { id: 4, horodatage: '2025-01-14 09:10:05', type: 'abonnement', evenement: 'Renouvellement automatique Plan Enterprise (Sonatrach RH)', adresseIp: '127.0.0.1', utilisateur: 'Systeme' },
];
