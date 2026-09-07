//Feature 1
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
dateElement.innerHTML = `${currentDay} ${currentHour}:${currentMin}, moderate rain <br />
  Humidity: <strong class="strong-1">87%</strong>, Wind:
  <strong class="strong-2">7.2km/h</strong>`;

//Feature 2
function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city-search input").value;
  let city = document.querySelector("h1");
  city.innerHTML = cityInput;

  function displayTemperature(response) {
    let temperature =Math.round(response.data.temperature.current);
    document.querySelector(".current-temperature").innerHTML = temperature;

  }

  //Week 5 challenge 1
  let apiCall = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiCall).then(displayTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);


//Week 5 challenge



let apiKey="e03ob0et84a38962c5d755f245f03b49";


