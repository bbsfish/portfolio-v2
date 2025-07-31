import { createApp } from 'vue';
import { VueHeadMixin, createHead } from '@unhead/vue/client';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const app = createApp(App);
const head = createHead(); 
app.use(head);
app.mixin(VueHeadMixin);

app.use(store);
app.use(router);

app.mount('#app');
