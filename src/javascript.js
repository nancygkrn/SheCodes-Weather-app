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
    : currentDate.getMinutes(); //Looked it up using claude because I could not find a way to convert the minutes with a leading zero

let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = `${currentDay} ${currentHour}:${currentMin}, <span id="description"></span> <br />
  Humidity: <span id="humidity">87%</span>, Wind:
  <span id="windSpeed">7.2 km/h</span>`;

//My Api Key from Axios
let apiKey = "e03ob0et84a38962c5d755f245f03b49";

//Search Input
function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city-search input").value;
  let city = document.querySelector("h1");
  city.innerHTML = cityInput;

  //Get city and temperature data through Axios
  let apiCall = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiCall).then(displayCurrentWeather);

  //Get 5-day forecast
  getForecast(cityInput);
}
//Display current weather

function displayCurrentWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  document.querySelector(".current-temperature").innerHTML = temperature;
  //Add weather description
  console.log(response.data.condition.description);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  //Add weather humidity
  console.log(response.data.temperature.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  //Add wind speed
  console.log(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  //Add weather icon
  console.log(response.data.condition.icon_url);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

//Format a forecast day's weekday name from its timestamp
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[date.getDay()];
}

//Fetch the 5-day forecast
function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Create forecast loop for 5days

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
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
getForecast("Paris");
