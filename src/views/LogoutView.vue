<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-warning text-dark text-center">
            <h3>👋 Logout Confirmation</h3>
          </div>
          <div class="card-body text-center">
            <div v-if="currentUser" class="mb-4">
              <h5>Current User Information:</h5>
              <div class="alert alert-info">
                <p><strong>Email:</strong> {{ currentUser.email }}</p>
                <p><strong>User ID:</strong> {{ currentUser.uid }}</p>
                <p><strong>Last Sign In:</strong> {{ formatDate(currentUser.metadata.lastSignInTime) }}</p>
              </div>
            </div>
            
            <p class="lead mb-4">Are you sure you want to logout?</p>
            
            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <button @click="confirmLogout" class="btn btn-danger me-md-2" :disabled="loading">
                {{ loading ? 'Logging out...' : 'Yes, Logout' }}
              </button>
              <router-link to="/about" class="btn btn-secondary">
                Cancel
              </router-link>
            </div>
            
            <div v-if="errorMessage" class="alert alert-danger mt-3">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { auth } from '../firebase/init'

const { logout } = useAuth()
const router = useRouter()

const currentUser = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const confirmLogout = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    console.log('Logging out user:', currentUser.value?.email)
    console.log('User before logout:', currentUser.value)
    
    await logout()
    
    console.log('User logged out successfully')
    console.log('Redirecting to login page...')
    
    router.push('/login')
    
  } catch (error) {
    console.error('Error during logout:', error)
    errorMessage.value = 'Error during logout: ' + error.message
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  // Monitor authentication state and log current user info
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user
      console.log('Current user on logout page:', {
        email: user.email,
        uid: user.uid,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
      })
    } else {
      console.log('No user is currently signed in')
      // If no user, redirect to login
      router.push('/login')
    }
  })
})
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.card-header {
  border-radius: 10px 10px 0 0;
}

.alert {
  border-radius: 8px;
}
</style>