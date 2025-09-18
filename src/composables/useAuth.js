import { ref, computed } from 'vue'
import { getAuth, signOut } from 'firebase/auth'

// Global authentication state
const isAuthenticated = ref(false)

export function useAuth() {
  const login = () => {
    isAuthenticated.value = true
  }

  const logout = async () => {
    const auth = getAuth()
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