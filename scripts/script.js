let weatherInfo;
const sunnyImage = "assets/sunny.webp";
const rainImage = "assets/rain.webp";
const snowImage = "assets/snow.webp";
const apiKey = "a39f9214a2ef4cc7932162223261602";
const locationCityDisplay = document.querySelector("#location-name-city");
const locationCountryDisplay = document.querySelector("#location-name-country");
const searchInputEl = document.querySelector("#searchInputEl");
const weatherDisplayDiv = document.querySelector("#weather-display");
const weatherOtherDisplayDiv = document.querySelector("#other-display");
const searchBtn = document.querySelector("#searchBtn");
async function getData(q) {
  weatherDisplayDiv.innerHTML = `
  <h2>
  Loading......
  </h2>
  `;
  if (q) {
    try {
      let res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}`,
      );
      if (!res.ok) throw new Error("404 Server not found!");
      let data = await res.json();
      weatherInfo = data;
      renderUI(weatherInfo);
    } catch (err) {
      renderErr(err.message);
    }
  } else {
    try {
      let res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=dhaka`,
      );
      if (!res.ok) throw new Error("404 Server not found!");
      let data = await res.json();
      weatherInfo = data;
      renderUI(weatherInfo);
    } catch (err) {
      renderErr(err.message);
    }
  }
}
function renderErr(error) {
  let h1 = document.createElement("h1");
  h1.style.textAlign = "center";
  h1.style.marginTop = "50px";
  h1.style.fontSize = "26px";
  h1.textContent = error;
}
function renderUI(obj) {
  weatherDisplayDiv.innerHTML = "";
  weatherOtherDisplayDiv.innerHTML = "";
  if (obj) {
    locationCityDisplay.textContent = `${obj.location.name},`;
    locationCountryDisplay.textContent = `${obj.location.country}.`;
    let temp = obj.current.temp_c;
    let div = document.createElement("div");
    let img = document.createElement("img");
    if (temp <= 5) {
      document.body.classList.remove("warm");
      document.body.classList.add("cold");
      img.src = snowImage;
    } else if (temp <= 18) {
      img.src = rainImage;
    } else {
      document.body.classList.remove("cold");
      document.body.classList.add("warm");
      img.src = sunnyImage;
    }
    div.append(img);
    img.classList.add("show");
    let h2 = document.createElement("h2");
    h2.innerHTML = `${temp}&deg;C`;
    div.append(h2);
    h2.classList.add("show");
    weatherDisplayDiv.append(div);
    // Other Displays Render
    let otherDivParent = document.createElement("div");
    let otherDiv1 = document.createElement("div");
    let otherDiv2 = document.createElement("div");
    let otherDiv3 = document.createElement("div");
    let otherDiv4 = document.createElement("div");
    let windH2 = document.createElement("h2");
    windH2.textContent = `Wind Speed(km): ${obj.current.wind_kph}km`;
    otherDiv1.append(windH2);
    otherDivParent.append(otherDiv1);
    windH2.classList.add("show");
    let humidityH2 = document.createElement("h2");
    humidityH2.textContent = `Humidity: ${obj.current.humidity}`;
    otherDiv2.append(humidityH2);
    otherDivParent.append(otherDiv2);
    humidityH2.classList.add("show");
    let conditionH2 = document.createElement("h2");
    conditionH2.textContent = `Sky condition: ${obj.current.condition.text}`;
    otherDiv3.append(conditionH2);
    otherDivParent.append(otherDiv3);
    conditionH2.classList.add("show");
    let timeH2 = document.createElement("h2");
    timeH2.textContent = `Location Time: ${obj.location.localtime}`;
    otherDiv4.append(timeH2);
    otherDivParent.append(otherDiv4);
    timeH2.classList.add("show");
    weatherOtherDisplayDiv.append(otherDivParent)
  } else {
    weatherDisplayDiv.innerHTML = `<h2>
    No Data To Show!
    </h2>`;
  }
}
getData();
searchBtn.addEventListener("click", () => {
  const query = searchInputEl.value.trim().toLowerCase();
  getData(query);
});
searchInputEl.addEventListener("keydown", (e) => {
  const query = searchInputEl.value.trim().toLowerCase();
  if (e.key === "Enter") getData(query);
});
