import { ref, computed } from 'vue'

// Global authentication state
const isAuthenticated = ref(false)

export function useAuth() {
  const login = () => {
    isAuthenticated.value = true
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  const isLoggedIn = computed(() => isAuthenticated.value)

  return {
    isLoggedIn,
    login,
    logout
  }
}