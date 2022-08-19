import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App)



app.use(router)
app.mount('#app')
