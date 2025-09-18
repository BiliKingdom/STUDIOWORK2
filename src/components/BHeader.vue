<script setup>
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { isLoggedIn, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            to="/about" 
            class="nav-link" 
            active-class="active"
            v-if="isLoggedIn"
          >
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/json" class="nav-link" active-class="active">
            JSON Lab
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link" active-class="active">
            Login
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/firebase-register" class="nav-link" active-class="active">
            Register
          </router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button @click="handleLogout" class="nav-link btn btn-link">
            Logout
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.btn-link {
  border: none;
  background: none;
  color: var(--bs-nav-link-color);
  text-decoration: none;
  padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
  border-radius: var(--bs-nav-pills-border-radius);
}

.btn-link:hover {
  color: var(--bs-nav-link-hover-color);
  background-color: var(--bs-nav-pills-link-active-bg);
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>