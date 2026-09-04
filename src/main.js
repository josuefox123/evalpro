import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './routeur';
import './index.css';

// Création et montage de l'application Vue 3
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
