<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card shadow">
          <div class="card-header bg-success text-white text-center">
            <h1>Get All Books API</h1>
            <p class="mb-0">All books displayed in JSON format</p>
          </div>
          <div class="card-body">
            <div v-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-2">Loading books...</p>
            </div>

            <div v-else-if="error" class="alert alert-danger">
              <h5>Error:</h5>
              <p>{{ error }}</p>
            </div>

            <div v-else-if="books.length > 0">
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <h5>Total Books: {{ books.length }}</h5>
                <button class="btn btn-sm btn-primary" @click="copyToClipboard">
                  Copy JSON
                </button>
              </div>

              <div class="json-display">
                <pre><code>{{ formattedBooks }}</code></pre>
              </div>

              <div v-if="copySuccess" class="alert alert-success mt-3">
                JSON copied to clipboard!
              </div>
            </div>

            <div v-else class="alert alert-info text-center">
              <p class="mb-0">No books found in the database.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/init'

const books = ref([])
const loading = ref(true)
const error = ref('')
const copySuccess = ref(false)

const formattedBooks = computed(() => {
  return JSON.stringify(books.value, null, 2)
})

const fetchAllBooks = async () => {
  loading.value = true
  error.value = ''

  try {
    console.log('Fetching all books from Firestore...')

    const booksCollection = collection(db, 'books')
    const snapshot = await getDocs(booksCollection)

    books.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    console.log(`Successfully fetched ${books.value.length} books`)
  } catch (err) {
    console.error('Error fetching books:', err)
    error.value = `Failed to fetch books: ${err.message}`
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedBooks.value)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

onMounted(() => {
  fetchAllBooks()
})
</script>

<style scoped>
.card {
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0;
}

.json-display {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
  max-height: 600px;
  overflow-y: auto;
}

.json-display pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #333;
}

.json-display code {
  display: block;
  white-space: pre;
}

h1 {
  margin: 0;
  font-weight: bold;
}

h5 {
  margin: 0;
  font-weight: 600;
}
</style>
