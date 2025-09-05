<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <div class="card shadow">
          <div class="card-header bg-success text-white">
            <h2 class="mb-0">📚 About Our Library - Members Only</h2>
          </div>
          <div class="card-body">
            <div class="alert alert-success" role="alert">
              <strong>Welcome, authenticated user!</strong> You have successfully accessed the members area.
            </div>
            
            <h3>Our Mission</h3>
            <p class="lead">
              Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community members.
            </p>
            
            <h4>Member Benefits</h4>
            <ul class="list-group list-group-flush mb-4">
              <li class="list-group-item">
                <i class="fas fa-check text-success me-2"></i>
                Access to premium digital collections
              </li>
              <li class="list-group-item">
                <i class="fas fa-check text-success me-2"></i>
                Extended borrowing periods
              </li>
              <li class="list-group-item">
                <i class="fas fa-check text-success me-2"></i>
                Priority reservations on new releases
              </li>
              <li class="list-group-item">
                <i class="fas fa-check text-success me-2"></i>
                Access to member-only events and workshops
              </li>
            </ul>
            
            <h4>Library Statistics</h4>
            <div class="row text-center">
              <div class="col-md-3">
                <div class="card bg-light">
                  <div class="card-body">
                    <h5 class="card-title text-primary">50,000+</h5>
                    <p class="card-text">Books Available</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light">
                  <div class="card-body">
                    <h5 class="card-title text-primary">5,000+</h5>
                    <p class="card-text">Active Members</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light">
                  <div class="card-body">
                    <h5 class="card-title text-primary">24/7</h5>
                    <p class="card-text">Digital Access</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light">
                  <div class="card-body">
                    <h5 class="card-title text-primary">15+</h5>
                    <p class="card-text">Years of Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const { isLoggedIn } = useAuth()
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  border-radius: 10px;
  border: none;
}

.card-header {
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  border: none;
  padding: 0.75rem 0;
}

.fas {
  width: 20px;
}
</style>
