const apiKey = "f260d8dd75ad55bc6f3013a0b4d0d5ed";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather_icon")





async function checkWeather(city){
  if (!city) {
    // If city name is not entered
    Toastify({
      text: "Please enter a city name",
      duration: 3000, // 3 seconds
      close: true,
      gravity: "top", // top or bottom
      position: "center", // left, center or right
      backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
    }).showToast();
    return;
  }
  const response =await fetch(apiUrl + city + `&appid=${apiKey}`)
  if (!response.ok) {
    // If an error occurred (e.g., city not found)
    Toastify({
      text: "City not found. Please enter a valid city name.",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
    }).showToast();
    return;
  }
  var data = await response.json();

  
  document.querySelector(".city").innerHTML=data.name;
  document.querySelector(".temp").innerHTML= Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
  document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";

  if(data.weather[0].main=='Clouds'){
    weatherIcon.src = "images/clouds.png";
  }
  else if(data.weather[0].main=='Clear'){
    weatherIcon.src = "images/clear.png";
  }
  else if(data.weather[0].main=='Rain'){
    weatherIcon.src = "images/rain.png";
  }
  else if(data.weather[0].main=='Drizzle'){
    weatherIcon.src = "images/drizzle.png";
  }
  else if(data.weather[0].main=='Mist'){
    weatherIcon.src = "images/mist.png";
  }
  else if(data.weather[0].main=='Snow'){
    weatherIcon.src = "images/snow.png";
  }

  document.querySelector(".weather").style.display="block";
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
})