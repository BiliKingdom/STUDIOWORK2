<template>
  <div class="api-container">
    <pre v-if="!loading && !error">{{ apiData }}</pre>

    <div v-if="loading" class="loading-container">
      <p>Loading...</p>
    </div>

    <div v-if="error" class="error-container">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiData = ref(null)
const error = ref('')
const loading = ref(true)

const CLOUD_FUNCTION_URL = 'https://australia-southeast1-studio-d0f21.cloudfunctions.net/getBookCount'

const getBookCountAPI = async () => {
  loading.value = true
  error.value = ''

  try {
    console.log('Fetching book count from Cloud Function API...')
    const response = await axios.get(CLOUD_FUNCTION_URL)
    apiData.value = JSON.stringify(response.data, null, 2)
    console.log('API data retrieved successfully')
  } catch (err) {
    console.error('Error getting book count API:', err)
    error.value = err.message || 'Failed to get book count'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getBookCountAPI()
})
</script>

<style scoped>
.api-container {
  background-color: #f5f5f5;
  padding: 20px;
  min-height: 100vh;
  font-family: 'Courier New', monospace;
}

pre {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.loading-container,
.error-container {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error-container {
  color: #d9534f;
}
</style>
