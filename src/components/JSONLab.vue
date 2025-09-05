<!-- JSONLab.vue -->
<script setup>
import { ref, computed } from 'vue'

// JSON authors and bookstores
import authors from '@/assets/json/authors.json'
import bookstores from '@/assets/json/bookstores.json'

const showMessage = ref(false)

// Form state and validation
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const reasonContainsFriend = computed(() => {
  return formData.value.reason.toLowerCase().includes('friend')
})

// JSON computed logic
const modernAuthors = computed(() => authors.filter(a => a.birthYear > 1850))
const allFamousWorks = computed(() => authors.flatMap(a => a.famousWorks))
const orwell = computed(() => authors.find(a => a.name === 'George Orwell'))
const austen = computed(() => authors.find(a => a.id === 1))
const booksByAusten = computed(() => austen.value)
const companyName = computed(() => bookstores.name)
const totalStores = computed(() => bookstores.totalStores)
const storeTypes = computed(() => JSON.stringify(bookstores.storeTypes))
const openingHours = computed(() =>
  `Weekdays: ${JSON.stringify(bookstores.openingHours.weekdays)}; Weekends: ${JSON.stringify(bookstores.openingHours.weekends)}`
)
const countriesOperated = computed(() => bookstores.countries.join(', '))
const topSellers = computed(() => bookstores.topSellers.join(', '))
const toggleMessage = () => { showMessage.value = !showMessage.value }
</script>

<template>
  <div class="json-lab">
    <h1>🗄️ W2. JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <ul>
        <li v-for="author in authors" :key="author.id">{{ author.name }} ({{ author.birthYear }})</li>
      </ul>
      <p>Authors born after 1850:</p>
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">{{ author.name }} ({{ author.birthYear }})</li>
      </ul>
      <p>Famous works:</p>
      <ul>
        <li v-for="work in allFamousWorks" :key="work">{{ work.title }} ({{ work.year }})</li>
      </ul>
      <p>Finding by property: {{ orwell?.name }}</p>
      <p>{{ austen?.name }}'s works:</p>
      <ul>
        <li v-for="work in booksByAusten.famousWorks" :key="work">{{ work.title }} ({{ work.year }})</li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Company: {{ companyName }}</p>
      <p>Total Stores: {{ totalStores }}</p>
      <p>Store Types: {{ storeTypes }}</p>
      <p>Opening Hours: {{ openingHours }}</p>
      <p>We operate in: {{ countriesOperated }}</p>
      <p>Our #1 seller: {{ topSellers }}</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p class="message success" v-if="showMessage">✨ You're a Vue superstar! ✨</p>
      <p>Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding</h2>
      <p>Highlighting authors born after 1900:</p>
      <ul>
        <li v-for="author in authors" :key="author.id" :class="{ highlight: author.birthYear > 1900 }">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>📝 Signup Form</h2>
      <form novalidate>
        <div class="row">
          <div class="col-md-6 col-sm-6">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="formData.password" />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <div class="col-md-6 col-sm-6">
            <label for="confirm-password" class="form-label">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="confirm-password"
              v-model="formData.confirmPassword"
              @blur="() => validateConfirmPassword(true)"
            />
            <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
          </div>

          <div class="col-12 mt-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <input
              type="text"
              class="form-control"
              id="reason"
              v-model="formData.reason"
            />
            <div v-if="reasonContainsFriend" class="text-success">Great to have a friend!</div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.json-lab {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
h1, h2 { color: #333; }
h1 { text-align: center; }
.lab-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}
.text-danger {
  color: red;
}
.text-success {
  color: green;
}
.highlight {
  background-color: #42b883;
}
code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
</style>