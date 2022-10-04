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

import { inicializarFirebase } from "../src/services/firebase"

 /* import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";

 import { firebaseConfig } from './firebaseConfig';


// Initialize Firebase

const fireapp = initializeApp(firebaseConfig);

const db = getFirestore(fireapp); */

inicializarFirebase();

const pinia = createPinia();

if (localStorage.getItem("state")){
    pinia.state.value = JSON.parse(localStorage.getItem("state"));
}
  


const app = createApp(App);



app.use(router);
app.use(PrimeVue);
app.use(pinia)



app.mount('#app')





