import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqAowvnJq1DFTSsYE56otWX04fHxpUERM",
  authDomain: "bolao2022-182da.firebaseapp.com",
  projectId: "bolao2022-182da",
  storageBucket: "bolao2022-182da.appspot.com",
  messagingSenderId: "444459251573",
  appId: "1:444459251573:web:85ab42dabbb8def62dc53c",
  measurementId: "G-T6BNZZDD7D"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App)



app.use(router)
app.mount('#app')
