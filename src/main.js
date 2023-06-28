import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { Field, Form, ErrorMessage } from 'vee-validate';

import 'vuetify/dist/vuetify.min.css';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'


import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components';


const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  labsComponents,
});

createApp(App)
  .use(pinia)
  .use(vuetify)
  .component('Field', Field)
  .component('Form', Form)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app');
