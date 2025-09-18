<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">📖 Manage Library Books</h3>
          </div>
          <div class="card-body">
            <!-- Search and Filter Controls -->
            <div class="row mb-4">
              <div class="col-md-4">
                <label for="searchTerm" class="form-label">Search Books</label>
                <input
                  type="text"
                  class="form-control"
                  id="searchTerm"
                  v-model="searchTerm"
                  placeholder="Search by title or author"
                />
              </div>
              <div class="col-md-3">
                <label for="genreFilter" class="form-label">Filter by Genre</label>
                <select class="form-select" id="genreFilter" v-model="selectedGenre">
                  <option value="">All Genres</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Biography">Biography</option>
                  <option value="History">History</option>
                </select>
              </div>
              <div class="col-md-3">
                <label for="sortBy" class="form-label">Sort By</label>
                <select class="form-select" id="sortBy" v-model="sortBy">
                  <option value="name">Book Name</option>
                  <option value="author">Author</option>
                  <option value="publishYear">Publish Year</option>
                  <option value="addedAt">Date Added</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="limitBooks" class="form-label">Show</label>
                <select class="form-select" id="limitBooks" v-model="limitBooks">
                  <option value="5">5 books</option>
                  <option value="10">10 books</option>
                  <option value="20">20 books</option>
                  <option value="50">50 books</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12">
                <button @click="loadBooks" class="btn btn-primary me-2">
                  🔍 Search & Filter
                </button>
                <button @click="clearFilters" class="btn btn-outline-secondary">
                  Clear Filters
                </button>
              </div>
            </div>

            <!-- Books Table -->
            <div v-if="loading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <div v-if="books.length > 0" class="table-responsive">
              <table class="table table-striped table-hover">
                <thead class="table-dark">
                  <tr>
                    <th>ISBN</th>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Copies</th>
                    <th>Added By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="book in books" :key="book.id">
                    <td>{{ book.isbn }}</td>
                    <td>
                      <span v-if="editingBook !== book.id">{{ book.name }}</span>
                      <input 
                        v-else 
                        type="text" 
                        class="form-control form-control-sm" 
                        v-model="editData.name"
                      />
                    </td>
                    <td>
                      <span v-if="editingBook !== book.id">{{ book.author }}</span>
                      <input 
                        v-else 
                        type="text" 
                        class="form-control form-control-sm" 
                        v-model="editData.author"
                      />
                    </td>
                    <td>
                      <span v-if="editingBook !== book.id">{{ book.genre }}</span>
                      <select 
                        v-else 
                        class="form-select form-select-sm" 
                        v-model="editData.genre"
                      >
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Biography">Biography</option>
                        <option value="History">History</option>
                      </select>
                    </td>
                    <td>{{ book.publishYear }}</td>
                    <td>
                      <span v-if="editingBook !== book.id">{{ book.copies }}</span>
                      <input 
                        v-else 
                        type="number" 
                        class="form-control form-control-sm" 
                        v-model="editData.copies"
                        min="1"
                      />
                    </td>
                    <td>{{ book.addedBy }}</td>
                    <td>
                      <div v-if="editingBook !== book.id" class="btn-group btn-group-sm">
                        <button @click="startEdit(book)" class="btn btn-outline-primary btn-sm">
                          ✏️ Edit
                        </button>
                        <button @click="deleteBook(book.id, book.name)" class="btn btn-outline-danger btn-sm">
                          🗑️ Delete
                        </button>
                      </div>
                      <div v-else class="btn-group btn-group-sm">
                        <button @click="saveEdit(book.id)" class="btn btn-success btn-sm">
                          ✅ Save
                        </button>
                        <button @click="cancelEdit" class="btn btn-secondary btn-sm">
                          ❌ Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-else-if="!loading" class="text-center text-muted">
              <p>No books found. Try adjusting your search criteria.</p>
            </div>

            <div v-if="errorMessage" class="alert alert-danger mt-3">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="alert alert-success mt-3">
              {{ successMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const db = getFirestore()

const books = ref([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Search and filter states
const searchTerm = ref('')
const selectedGenre = ref('')
const sortBy = ref('name')
const limitBooks = ref('10')

// Edit states
const editingBook = ref(null)
const editData = ref({})

const loadBooks = async () => {
  loading.value = true
  errorMessage.value = ''
  books.value = []
  
  try {
    console.log('Loading books with filters:', {
      searchTerm: searchTerm.value,
      selectedGenre: selectedGenre.value,
      sortBy: sortBy.value,
      limitBooks: limitBooks.value
    })

    let q = collection(db, 'books')
    
    // Apply genre filter using where clause
    if (selectedGenre.value) {
      q = query(q, where('genre', '==', selectedGenre.value))
      console.log('Applied genre filter:', selectedGenre.value)
    }
    
    // Apply ordering
    q = query(q, orderBy(sortBy.value))
    console.log('Applied ordering by:', sortBy.value)
    
    // Apply limit
    q = query(q, limit(parseInt(limitBooks.value)))
    console.log('Applied limit:', limitBooks.value)
    
    const querySnapshot = await getDocs(q)
    console.log('Query executed, found', querySnapshot.size, 'documents')
    
    let allBooks = []
    querySnapshot.forEach((doc) => {
      allBooks.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    // Apply text search filter (client-side since Firestore doesn't support full-text search)
    if (searchTerm.value) {
      const searchLower = searchTerm.value.toLowerCase()
      allBooks = allBooks.filter(book => 
        book.name.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
      )
      console.log('Applied text search, filtered to', allBooks.length, 'books')
    }
    
    books.value = allBooks
    console.log('Final books loaded:', books.value.length)
    
  } catch (error) {
    console.error('Error loading books:', error)
    errorMessage.value = 'Error loading books: ' + error.message
  } finally {
    loading.value = false
  }
}

const clearFilters = () => {
  searchTerm.value = ''
  selectedGenre.value = ''
  sortBy.value = 'name'
  limitBooks.value = '10'
  loadBooks()
}

const startEdit = (book) => {
  editingBook.value = book.id
  editData.value = {
    name: book.name,
    author: book.author,
    genre: book.genre,
    copies: book.copies
  }
  console.log('Started editing book:', book.name)
}

const cancelEdit = () => {
  editingBook.value = null
  editData.value = {}
  console.log('Cancelled editing')
}

const saveEdit = async (bookId) => {
  try {
    console.log('Saving changes for book ID:', bookId, editData.value)
    
    const bookRef = doc(db, 'books', bookId)
    await updateDoc(bookRef, {
      name: editData.value.name,
      author: editData.value.author,
      genre: editData.value.genre,
      copies: parseInt(editData.value.copies)
    })
    
    console.log('Book updated successfully')
    successMessage.value = 'Book updated successfully!'
    editingBook.value = null
    editData.value = {}
    
    // Reload books to show updated data
    await loadBooks()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Error updating book:', error)
    errorMessage.value = 'Error updating book: ' + error.message
  }
}

const deleteBook = async (bookId, bookName) => {
  if (!confirm(`Are you sure you want to delete "${bookName}"?`)) {
    return
  }
  
  try {
    console.log('Deleting book ID:', bookId)
    
    await deleteDoc(doc(db, 'books', bookId))
    
    console.log('Book deleted successfully')
    successMessage.value = `Book "${bookName}" deleted successfully!`
    
    // Reload books to show updated list
    await loadBooks()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Error deleting book:', error)
    errorMessage.value = 'Error deleting book: ' + error.message
  }
}

onMounted(() => {
  loadBooks()
})
</script>

<style scoped>
.table th {
  border-top: none;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.form-control-sm, .form-select-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>