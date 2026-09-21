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

//Search Input
function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city-search input").value;
  let city = document.querySelector("h1");
  city.innerHTML = cityInput;

  function displayTemperature(response) {
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

  //Get city and temperature data through Axios
  let apiCall = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiCall).then(displayTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

//My Api Key from Axios

let apiKey = "e03ob0et84a38962c5d755f245f03b49";

//Create forecast loop

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
displayForecast();
