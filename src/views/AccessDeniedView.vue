<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <div class="card shadow">
          <div class="card-body p-5">
            <div class="mb-4">
              <i class="fas fa-lock" style="font-size: 4rem; color: #dc3545;"></i>
            </div>
            <h1 class="display-4 text-danger mb-3">Access Denied</h1>
            <p class="lead mb-4">
              You need to be logged in to access this page.
            </p>
            <p class="text-muted mb-4">
              Please log in with your library credentials to continue.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <router-link to="/login" class="btn btn-primary btn-lg me-md-2">
                Go to Login
              </router-link>
              <router-link to="/" class="btn btn-outline-secondary btn-lg">
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic needed for this component
</script>

<style scoped>
.card {
  border-radius: 15px;
  border: none;
}

.btn {
  border-radius: 25px;
  padding: 10px 30px;
}

.fas {
  margin-bottom: 20px;
}
</style>