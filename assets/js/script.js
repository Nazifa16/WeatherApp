const container = document.querySelector("#container");
const searchBtn = document.querySelector("#search-btn");
const weatherDetails = document.querySelector("#weather-details");
const searchInpt = document.querySelector("#search-inpt");

const weatherDesc = document.querySelector("#weather-desc");
const textHumidity = document.querySelector("#info-humidity span");
const textWind = document.querySelector("#info-wind span");
const errorMessage = document.querySelector("#not-found");

// for icons
const weatherDesImgDiv = document.querySelector("#weather-des-img-div");
const weatherDescImg = document.querySelector("#weather-desc-img");

//Mapping weather condition
const icon = {
  Clear: "./assets/img/Clear.png",
  Rain: "./assets/img/Rain.png",
  Snow: "./assets/img/Snow.png",
  Clouds: "./assets/img/Clouds.png",
  Mist: "./assets/img/Mist.png",
};

// Adding click event listener to search button
searchBtn.addEventListener("click", () => {
  const cityName = searchInpt.value;
  container.style.height = "35rem";

  if (!cityName) {
    // Showing error message for empty input
    weatherDesc.style.display = "none";
    weatherDetails.style.display = "none";
    errorMessage.style.display = "block";
    return;
  }

  getData(cityName); // function to get weather data
});

// Function to fetch weather data from the OpenWeatherMap API
function getData(name) {
  const keyAPI = "63ac20e084a1c6bd1db1f8c71a680e39"; //API key

  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${keyAPI}&units=metric`;
  console.log(baseURL);

  fetch(baseURL)
    .then((response) => response.json())
    .then((json) => {
      console.log("API Response:", json);
      searchInpt.value = "";

      // Checking if the city is not found 404
      if (json.cod === "404") {
        // Hide weather information and display error message
        weatherDesc.style.display = "none";
        weatherDetails.style.display = "none";
        errorMessage.style.display = "block";
        searchInpt.value = "";
      } else {
        // Update weather information
        weatherDesc.innerHTML = `
         <h1 >${json.name}</h1>
             <p class="temperature">${Math.round(
               json.main.temp
             )}<span>°C</span></p>
             <p class="desc">${json.weather[0].description}</p>
           `;
        textHumidity.innerText = `${json.main.humidity}%`;
        textWind.innerText = `${json.wind.speed}  km / h`;

        // Get the weather condition and set the corresponding icon
        const weatherCondition = json.weather[0].main; // weather conditions:clouds,clear etc
        console.log("Image URL:", icon[weatherCondition]);
        // Get the weather condition and set the corresponding icon
        weatherDescImg.src = `${icon[weatherCondition]}`;

        //  hide error message, and display weather information
        errorMessage.style.display = "none";

        weatherDetails.style.display = "flex";
        weatherDesc.style.display = `block`;
        weatherDesImgDiv.style.display = "block";
        console.log("Weather Condition:", json.weather[0].main);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
