import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import './firebase/init'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'bootstrap/dist/css/bootstrap.min.css'

const vueApp = createApp(App)

vueApp.use(router) 
vueApp.use(PrimeVue, { theme: { preset: Aura } })

vueApp.mount('#app')

