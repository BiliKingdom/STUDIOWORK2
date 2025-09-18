<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header bg-success text-white text-center">
            <h3>📚 Add New Book to Library</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="addBook">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="isbn" class="form-label">ISBN</label>
                  <input
                    type="text"
                    class="form-control"
                    id="isbn"
                    v-model="bookData.isbn"
                    required
                    placeholder="Enter ISBN"
                  />
                </div>
                <div class="col-md-6">
                  <label for="name" class="form-label">Book Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="bookData.name"
                    required
                    placeholder="Enter book name"
                  />
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="author" class="form-label">Author</label>
                  <input
                    type="text"
                    class="form-control"
                    id="author"
                    v-model="bookData.author"
                    required
                    placeholder="Enter author name"
                  />
                </div>
                <div class="col-md-6">
                  <label for="genre" class="form-label">Genre</label>
                  <select class="form-select" id="genre" v-model="bookData.genre" required>
                    <option value="">Select Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Biography">Biography</option>
                    <option value="History">History</option>
                  </select>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="publishYear" class="form-label">Publish Year</label>
                  <input
                    type="number"
                    class="form-control"
                    id="publishYear"
                    v-model="bookData.publishYear"
                    required
                    min="1000"
                    max="2024"
                    placeholder="Enter publish year"
                  />
                </div>
                <div class="col-md-6">
                  <label for="copies" class="form-label">Number of Copies</label>
                  <input
                    type="number"
                    class="form-control"
                    id="copies"
                    v-model="bookData.copies"
                    required
                    min="1"
                    placeholder="Enter number of copies"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  v-model="bookData.description"
                  placeholder="Enter book description"
                ></textarea>
              </div>

              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
              <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-success me-2" :disabled="loading">
                  {{ loading ? 'Adding Book...' : 'Add Book' }}
                </button>
                <button type="button" class="btn btn-secondary" @click="clearForm">
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const db = getFirestore()
const auth = getAuth()

const bookData = ref({
  isbn: '',
  name: '',
  author: '',
  genre: '',
  publishYear: '',
  copies: 1,
  description: ''
})

const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

const addBook = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const user = auth.currentUser
    if (!user) {
      errorMessage.value = 'You must be logged in to add books'
      return
    }

    console.log('Adding book to Firestore:', bookData.value)
    console.log('Current user:', user.email)
    
    const docRef = await addDoc(collection(db, 'books'), {
      ...bookData.value,
      publishYear: parseInt(bookData.value.publishYear),
      copies: parseInt(bookData.value.copies),
      addedBy: user.email,
      addedAt: serverTimestamp(),
      available: true
    })
    
    console.log('Book added with ID:', docRef.id)
    successMessage.value = `Book "${bookData.value.name}" added successfully!`
    clearForm()
    
  } catch (error) {
    console.error('Error adding book:', error)
    errorMessage.value = 'Error adding book: ' + error.message
  } finally {
    loading.value = false
  }
}

const clearForm = () => {
  bookData.value = {
    isbn: '',
    name: '',
    author: '',
    genre: '',
    publishYear: '',
    copies: 1,
    description: ''
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

.form-control:focus,
.form-select:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}
</style>