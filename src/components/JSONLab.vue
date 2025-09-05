// JSONLab.vue
<script setup>
import { ref, computed } from 'vue'
import authors from '@/assets/json/authors.json'
import bookstores from '@/assets/json/bookstores.json'

const showMessage = ref(false)

const modernAuthors = computed(() => {
  return authors.filter((author) => author.birthYear > 1850)
})

const allFamousWorks = computed(() => {
  return authors.flatMap((author) => author.famousWorks)
})

const orwell = computed(() => {
  return authors.find((author) => author.name === 'George Orwell')
})

const austen = computed(() => {
  return authors.find((author) => author.id === 1)
})

const booksByAusten = computed(() => {
  return authors.find((author) => author.id === 1)
})

const companyName = computed(() => {
  return bookstores.name
})

const totalStores = computed(() => {
  return bookstores.totalStores
})

const storeTypes = computed(() => {
  return bookstores.storeTypes
})

const openingHours = computed(() => {
  return bookstores.openingHours
})

const countriesOperated = computed(() => {
  return bookstores.countries.join(', ')
})

const topSellers = computed(() => {
  return bookstores.topSellers.join(', ')
})

const toggleMessage = () => {
  showMessage.value = !showMessage.value
}

// Activity 5.3 - Confirm password logic
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

const errors = ref({
  confirmPassword: null
})

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>

<template>
  <div class="json-lab">
    <h1>🗄️ W2. JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <ul>
        <li v-for="author in authors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <p>Authors born after 1850:</p>
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <p>Famous works:</p>
      <ul>
        <li v-for="work in allFamousWorks" :key="work.title">
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>

      <p>Finding by property: {{ orwell?.name }}</p>

      <p>{{ austen?.name }}'s works:</p>
      <ul>
        <li v-for="work in booksByAusten.famousWorks" :key="work.title">
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Company: {{ companyName }}</p>
      <p>Total Stores: {{ totalStores }}</p>

      <p>Store Types:</p>
      <ul>
        <li v-for="type in storeTypes" :key="type.type">
          {{ type.type }} - {{ type.count }} stores
        </li>
      </ul>

      <p>Opening Hours:</p>
      <ul>
        <li>Weekdays: {{ openingHours.weekdays.open }} - {{ openingHours.weekdays.close }}</li>
        <li>Weekends: {{ openingHours.weekends.open }} - {{ openingHours.weekends.close }}</li>
      </ul>

      <p>We operate in: {{ countriesOperated }}</p>
      <p>Our #1 seller: {{ topSellers }}</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <button @click="toggleMessage">Toggle Message</button>
      <p class="message success" v-if="showMessage">✨ You're a Vue superstar! ✨</p>
    </section>

    <section class="lab-section">
      <h2>Highlight authors born after 1900</h2>
      <ul>
        <li
          v-for="author in authors"
          :key="author.id"
          :class="{ highlight: author.birthYear > 1900 }"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>Activity 5.3: Confirm Password</h2>
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <label for="confirm-password" class="form-label">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            v-model="formData.confirmPassword"
            @blur="() => validateConfirmPassword(true)"
          />
          <div v-if="errors.confirmPassword" class="text-danger">
            {{ errors.confirmPassword }}
          </div>
        </div>
      </div>
    </section>

    <section class="lab-section">
      <h2>Activity 5.4: v-model vs v-bind</h2>
      <div class="mb-3">
        <label for="suburb-bind" class="form-label">Suburb (v-bind:value)</label>
        <input
          type="text"
          class="form-control"
          id="suburb-bind"
          v-bind:value="formData.suburb"
        />
      </div>
      <div class="mb-3">
        <label for="suburb-model" class="form-label">Suburb (v-model)</label>
        <input
          type="text"
          class="form-control"
          id="suburb-model"
          v-model="formData.suburb"
        />
      </div>
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

.lab-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.highlight {
  background-color: #42b883;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
