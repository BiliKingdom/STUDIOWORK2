<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header bg-primary text-white text-center">
            <h1>Weather Information</h1>
          </div>
          <div class="card-body">
            <div class="search-box mb-4">
              <label for="city" class="form-label">Search Weather by City:</label>
              <div class="input-group">
                <input
                  type="text"
                  id="city"
                  class="form-control"
                  v-model="city"
                  placeholder="Enter city name (e.g., Clayton, AU)"
                  @keyup.enter="searchByCity"
                />
                <button class="btn btn-primary" @click="searchByCity">Search</button>
              </div>
            </div>

            <main>
              <div v-if="weatherData" class="weather-display text-center">
                <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
                <div class="weather-info">
                  <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
                  <p class="temperature">{{ temperature }} °C</p>
                </div>
                <span class="weather-description">{{ weatherData.weather[0].description }}</span>
              </div>

              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>

              <div v-if="!weatherData && !error" class="text-center text-muted">
                <p>Loading current location weather...</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = '98a8daa2f2035463c875f8fcb86b7ee4'

export default {
  name: 'WeatherView',
  data() {
    return {
      city: '',
      weatherData: null,
      error: null
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
            await this.fetchWeatherData(url)
          },
          (error) => {
            console.error('Geolocation error:', error)
            this.error = 'Unable to get your location. Please search by city.'
          }
        )
      } else {
        this.error = 'Geolocation is not supported by your browser.'
      }
    },
    async fetchWeatherData(url) {
      try {
        this.error = null
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
        this.error = 'Failed to fetch weather data. Please try again.'
      }
    },
    async searchByCity() {
      if (!this.city.trim()) {
        this.error = 'Please enter a city name'
        return
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
      await this.fetchWeatherData(url)
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0;
}

.search-box {
  padding: 10px 0;
}

.weather-display {
  padding: 20px 0;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.weather-icon {
  width: 100px;
  height: 100px;
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
  margin: 10px 0;
  color: #007bff;
}

.weather-description {
  font-size: 1.5rem;
  text-transform: capitalize;
  color: #666;
}

h2 {
  font-weight: bold;
  margin: 20px 0;
}
</style>
