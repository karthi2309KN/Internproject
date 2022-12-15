import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
Object.keys(AllRules).forEach(rule => {
 defineRule(rule, AllRules[rule]);
});

const app = createApp(App)
 app.use(router);

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

app.use(VueSweetalert2);

app.mount('#app')
