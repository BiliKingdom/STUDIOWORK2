<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white text-center">
            <h3>🔥 Firebase Sign In</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="signIn">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
              <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  {{ loading ? 'Signing In...' : 'Sign In' }}
                </button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <p class="text-muted">Don't have an account?</p>
              <router-link to="/firebase-register" class="btn btn-outline-secondary">
                Register Here
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Current user:', user)
    console.log('User email:', user.email)
    console.log('User UID:', user.uid)
  } else {
    console.log('No user is signed in')
  }
})

const signIn = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    
    console.log('Sign in successful!')
    console.log('User:', user)
    console.log('User email:', user.email)
    console.log('User UID:', user.uid)
    
    successMessage.value = 'Sign in successful!'
    
    // Optional: redirect to another page after successful sign in
    setTimeout(() => {
      router.push('/about')
    }, 1500)
    
  } catch (error) {
    console.error('Sign in error:', error)
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.card-header {
  border-radius: 10px 10px 0 0;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}
</style>