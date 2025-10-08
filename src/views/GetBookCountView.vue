<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header bg-info text-white text-center">
            <h1>Book Counter</h1>
          </div>
          <div class="card-body text-center">
            <button 
              @click="getBookCount" 
              class="btn btn-primary btn-lg mb-4"
              :disabled="loading"
            >
              {{ loading ? 'Loading...' : 'Get Book Count' }}
            </button>
            
            <div v-if="count !== null && !error" class="alert alert-success">
              <h3>Total number of books: {{ count }}</h3>
            </div>
            
            <div v-if="error" class="alert alert-danger">
              <h3>Error: {{ error }}</h3>
            </div>
            
            <div v-if="count === null && !error && !loading" class="text-muted">
              <p>Click the button to get the total book count from Firestore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref('')
const loading = ref(false)

const getBookCount = async () => {
  loading.value = true
  error.value = ''
  count.value = null
  
  try {
    console.log('Making HTTP request to Cloud Function...')
    
    // Cloud Function URL - will be configured in section 9.4
    const cloudFunctionUrl = 'https://us-central1-studio-d0f21.cloudfunctions.net/getBookCount'
    
    console.log('Requesting URL:', cloudFunctionUrl)
    
    const response = await axios.get(cloudFunctionUrl)
    
    console.log('Cloud Function response:', response.data)
    
    if (response.data && typeof response.data.count === 'number') {
      count.value = response.data.count
      console.log('Book count retrieved successfully:', count.value)
    } else {
      throw new Error('Invalid response format from Cloud Function')
    }
    
  } catch (err) {
    console.error('Error getting book count:', err)
    error.value = err.message || 'Failed to get book count'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0;
}

.btn-lg {
  padding: 12px 30px;
  font-size: 1.2rem;
  border-radius: 25px;
}

.alert {
  border-radius: 10px;
  font-size: 1.1rem;
}

h1 {
  margin: 0;
  font-weight: bold;
}

h3 {
  margin: 0;
  font-weight: 600;
}
</style>