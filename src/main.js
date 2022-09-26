import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router"




import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-dark-teal/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css';                           //icons


import './style.css';

 import { initializeApp } from "firebase/app";
 import { firebaseConfig } from './firebaseConfig';


// Initialize Firebase

initializeApp(firebaseConfig);

const pinia = createPinia()
const app = createApp(App);



app.use(router);
app.use(PrimeVue);
app.use(pinia)
app.mount('#app')

