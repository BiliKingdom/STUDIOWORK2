<template>
  <div class="book-list mt-4">
    <h4>📚 Books with ISBN > 1000</h4>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading books...</span>
      </div>
    </div>
    <div v-else-if="books.length > 0" class="row">
      <div v-for="book in books" :key="book.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class="card-text">
              <strong>ISBN:</strong> {{ book.isbn }}<br>
              <strong>Author:</strong> {{ book.author }}<br>
              <strong>Genre:</strong> {{ book.genre }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info">
      No books found with ISBN greater than 1000.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/init'

const books = ref([])
const loading = ref(false)

const loadBooks = async () => {
  loading.value = true
  console.log('Loading books with ISBN > 1000 using WHERE query')
  
  try {
    // Create query to find books with ISBN greater than 1000
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000)
    )
    
    console.log('Executing Firestore WHERE query: isbn > 1000')
    const querySnapshot = await getDocs(q)
    
    books.value = []
    querySnapshot.forEach((doc) => {
      books.value.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    console.log('Found', books.value.length, 'books with ISBN > 1000')
    console.log('Books loaded:', books.value)
    
  } catch (error) {
    console.error('Error loading books:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBooks()
})
</script>

<style scoped>
.book-list {
  margin-top: 2rem;
}

.card {
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
</style>