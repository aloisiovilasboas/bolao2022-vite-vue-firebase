import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'



import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-dark-teal/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css';                           //icons


import './style.css';

// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from './firebaseConfig';


// Initialize Firebase
// initializeApp(firebaseConfig);

const app = createApp(App);



app.use(router);
app.use(store);
app.use(PrimeVue);
app.mount('#app')

