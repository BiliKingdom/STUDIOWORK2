import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbqcEgrHO6udTeyxfYFUVs7o49z7Gu4m8",
  authDomain: "studio-d0f21.firebaseapp.com",
  projectId: "studio-d0f21",
  storageBucket: "studio-d0f21.firebasestorage.app",
  messagingSenderId: "516656057163",
  appId: "1:516656057163:web:fc77e5011e603edaedb6ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'bootstrap/dist/css/bootstrap.min.css'

const vueApp = createApp(App)

vueApp.use(router) 
vueApp.use(PrimeVue, { theme: { preset: Aura } })

vueApp.mount('#app')

