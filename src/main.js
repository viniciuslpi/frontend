import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router';
const myApp = createApp(App).use(router);

myApp.use(Quasar, 
  { plugins: {}},
)

myApp.mount('#app')