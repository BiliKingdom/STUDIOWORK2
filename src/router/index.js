import { createRouter, createWebHistory } from 'vue-router'
import LibraryRegistrationForm from '../components/LibraryRegistrationForm.vue' // 保持原名不变
import AboutView from '../views/AboutView.vue'
import JSONLab from '../components/JSONLab.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: LibraryRegistrationForm 
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/jsonlab',
    name: 'JSONLab',
    component: JSONLab
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
