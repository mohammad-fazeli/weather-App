const apikey = "23ac42757f24140ada8da1d8908f3ac0";
const locationTimezone = document.querySelector(".location-timezone");
const icon = document.querySelector(".icon");
const temperatureDegree = document.querySelector(".temperature-degree");
const input = document.querySelector("input");
const search = document.querySelector(".fa-search");
const tDescription = document.querySelector(".temperature-description");

search.addEventListener("click", searchCity);

function searchCity() {
  let cityName = input.value;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`
  )
    .then((response) => response.json())
    .then((data) => setData(data));
}

function setData(data) {
  if (data.cod == 400) {
    console.log("place enet city name");
    return;
  } else if (data.cod == 404) {
    console.log("city not found");
  }
  locationTimezone.textContent = data.name;
  temperatureDegree.textContent = converttoC(data.main.temp);
  console.log(data.main.temp);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  tDescription.textContent = data.weather[0].description;
}
function converttoC(p) {
  let r = p - 273;
  return r.toFixed(2) + " C";
}
temperatureDegree.addEventListener("click", (e) => {
  if (temperatureDegree.classList.contains("c")) {
    temperatureDegree.textContent =
      parseFloat(temperatureDegree.textContent) + 273 + " F";
    temperatureDegree.classList.remove("c");
  } else {
    temperatureDegree.textContent = converttoC(
      parseFloat(temperatureDegree.textContent)
    );
    temperatureDegree.classList.add("c");
  }
});
