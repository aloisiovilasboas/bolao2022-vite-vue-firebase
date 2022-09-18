import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from "./router"
import PrimeVue from 'primevue/config';


import 'primeflex/primeflex.css'
import 'primevue/resources/themes/arya-orange/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons


// Import our custom CSS
//import '../src/scss/styles.scss'

// Import all of Bootstrap's JS
// import bootstrap from 'bootstrap'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App)



app.use(router)
app.use(PrimeVue);
app.mount('#app')

