//Show current date for the weather app
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentDate.getDay()];
let currentHour = currentDate.getHours();
let currentMin =
  currentDate.getMinutes() < 10
    ? `0${currentDate.getMinutes()}`
    : currentDate.getMinutes();

let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = `${currentDay} ${currentHour}:${currentMin}, <span id="description"></span> <br />
  Humidity: <span id="humidity">87%</span>, Wind:
  <span id="windSpeed">7.2 km/h</span>`;

let apiKey = "e03ob0et84a38962c5d755f245f03b49";

function searchCity(city) {
  let apiCall = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiCall).then(displayCurrentWeather);
  getForecast(city);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city-search input").value;
  document.querySelector("h1").innerHTML = cityInput;
  searchCity(cityInput);
}

function displayCurrentWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  document.querySelector(".current-temperature").innerHTML = temperature;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[date.getDay()];
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum,
            )}º</div>
          </div>
        </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

//Set up the listener ONCE, at the top level
let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

//Load Paris ONCE on page start
searchCity("Paris");
