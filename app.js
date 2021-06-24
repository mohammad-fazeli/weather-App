const apikey = "23ac42757f24140ada8da1d8908f3ac0";
const locationTimezone = document.querySelector(".location-timezone");
const icon = document.querySelector(".icon");
const temperatureDegree = document.querySelector(".temperature-degree");
const input = document.querySelector("input");
const search = document.querySelector(".fa-search");
const tDescription = document.querySelector(".temperature-description");
const Loding = document.querySelector(".lodaing");

async function searchCity() {
  let cityName = input.value;
  input.value = "";
  Loding.classList.remove("off");
  if (cityName !== "") {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }
  Loding.classList.add("off");
}

function setData(data) {
  if (data.cod == 404) {
    alert("City not found");
    return;
  }
  locationTimezone.textContent = data.name;
  temperatureDegree.textContent = converttoC(data.main.temp);
  temperatureDegree.classList.add("c");
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

search.addEventListener("click", searchCity);

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

window.addEventListener("load", () => {
  let long;
  let lat;
  Loding.classList.remove("off");
  document.querySelector(".log").innerHTML = `karej`;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      document.querySelector(".log").innerHTML = `vorod`;
    });
  }
  document.querySelector(
    ".log"
  ).innerHTML = `long is:${long}, lat is:${lat} is a number`;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`
  )
    .then((response) => response.json())
    .then((data) => setData(data));
  Loding.classList.add("off");
});

document.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    searchCity();
  }
});
