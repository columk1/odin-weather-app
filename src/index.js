import './style.css'

const form = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const loader = document.getElementById('loading')
const currentWeather = document.querySelector('.current-weather')

async function init() {
  displayLoading()
  const weatherData = await getWeatherData('Squamish')
  displayData(weatherData).then(hideLoading()).catch(handleError)
  currentWeather.classList.add('active')
}

// Error handling
const handleError = (err) => console.error('Error: ' + err)

const getWeatherData = async (location) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=4288fa1f3fb6461e90f53054232508&q=${location}`,
    { mode: 'cors' }
  )
  const weatherData = await response.json()
  return weatherData
}

const displayData = async (weatherData) => {
  console.log(weatherData)
  const condition = document.getElementById('condition')
  const location = document.getElementById('location')
  const temperature = document.getElementById('temperature')
  const feelsLike = document.getElementById('feels-like')
  const wind = document.getElementById('wind')
  const humidity = document.getElementById('humidity')

  condition.textContent = weatherData.current.condition.text
  location.textContent = `${weatherData.location.name}, ${weatherData.location.country}`
  temperature.textContent = Math.round(weatherData.current.temp_c)
  feelsLike.textContent = `Feels like: ${weatherData.current.feelslike_c}`
  wind.textContent = `Wind: ${weatherData.current.wind_dir} ${weatherData.current.wind_kph}km/h`
  humidity.textContent = `Humidity: ${weatherData.current.humidity}%`
}

const handleSearch = async (input) => {
  displayLoading()
  const weatherData = await getWeatherData(input)
  displayData(weatherData).then(hideLoading()).catch(handleError)
}

function displayLoading() {
  loader.classList.add('display')
  setTimeout(() => {
    loader.classList.remove('display')
  }, 5000)
}

function hideLoading() {
  loader.classList.remove('display')
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  handleSearch(searchInput.value)
  searchInput.value = ''
})

init()
// getWeatherData('Squamish').catch(handleError)
