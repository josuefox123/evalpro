import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMagasinNotification = defineStore('notification', () => {
  const notifications = ref([]);

  /**
   * Ajoute une notification toast.
   * @param {Object} options
   * @param {'success' | 'warning' | 'error' | 'info'} options.type
   * @param {string} options.titre
   * @param {string} options.message
   * @param {number} [options.duree=4000]
   */
  function ajouterNotification({ type = 'info', titre = '', message = '', duree = 4000 }) {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    const notif = { id, type, titre, message, duree };
    notifications.value.push(notif);

    if (duree > 0) {
      setTimeout(() => {
        supprimerNotification(id);
      }, duree);
    }
  }

  function supprimerNotification(id) {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }

  function succes(message, titre = 'Succès') {
    ajouterNotification({ type: 'success', titre, message });
  }

  function erreur(message, titre = 'Erreur') {
    ajouterNotification({ type: 'error', titre, message });
  }

  function avertissement(message, titre = 'Attention') {
    ajouterNotification({ type: 'warning', titre, message });
  }

  function info(message, titre = 'Information') {
    ajouterNotification({ type: 'info', titre, message });
  }

  return {
    notifications,
    ajouterNotification,
    supprimerNotification,
    succes,
    erreur,
    avertissement,
    info,
  };
});
