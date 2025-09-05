import { createRouter, createWebHistory } from 'vue-router'
import LibraryRegistrationForm from '../components/LibraryRegistrationForm.vue' 
import AboutView from '../views/AboutView.vue'
import JSONLab from '../components/JSONLab.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import { useAuth } from '../composables/useAuth'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: LibraryRegistrationForm 
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/json',
    name: 'JSONLab',
    component: JSONLab
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuth()
  
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    // Redirect to access denied page instead of login to show the message
    next('/access-denied')
  } else {
    next()
  }
})

export default router
