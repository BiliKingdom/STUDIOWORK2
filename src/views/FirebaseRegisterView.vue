<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-success text-white text-center">
            <h3>🔥 Firebase Registration</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
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
                  placeholder="Enter your password (min 6 characters)"
                  minlength="6"
                />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
                  placeholder="Confirm your password"
                />
              </div>
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
              <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-success" :disabled="loading">
                  {{ loading ? 'Registering...' : 'Register' }}
                </button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <p class="text-muted">Already have an account?</p>
              <router-link to="/firebase-signin" class="btn btn-outline-primary">
                Sign In Here
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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

const register = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    loading.value = false
    return
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    
    console.log('Registration successful!')
    console.log('User:', user)
    console.log('User email:', user.email)
    console.log('User UID:', user.uid)
    console.log('User creation time:', user.metadata.creationTime)
    
    successMessage.value = 'Registration successful! Redirecting to sign in...'
    
    // Redirect to sign in page after successful registration
    setTimeout(() => {
      router.push('/firebase-signin')
    }, 2000)
    
  } catch (error) {
    console.error('Registration error:', error)
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
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}
</style>