import { ref, computed } from 'vue'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/init'

// Global authentication state
const isAuthenticated = ref(false)

export function useAuth() {
  const login = () => {
    isAuthenticated.value = true
  }

  const logout = async () => {
    try {
      await signOut(auth)
      console.log('User signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
    }
    isAuthenticated.value = false
  }

  const isLoggedIn = computed(() => isAuthenticated.value)

  return {
    isLoggedIn,
    login,
    logout
  }
}