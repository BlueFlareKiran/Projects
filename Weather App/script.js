const apikey = "dbb609a7abf3bfc9bcb4eebfad88a7e7";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search= document.querySelector(".search input");
const searchbtn= document.querySelector(".search button");
const weathericon=document.querySelector(".weather-icon");

async function checkweather(city) {
  const reponse = await fetch(apiurl +city+ `&appid=${apikey}`);
  if(reponse.status==404){
    document.querySelector(".error").style.display="block"
  }
  var data = await reponse.json();

  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
  document.querySelector(".wind").innerHTML = data.wind.speed+" km/h";

  if(data.weather[0].main=="Clouds"){
    weathericon.src="image/cloudy.png";
  }
  else if(data.weather[0].main=="Clear"){
   weathericon.src="image/clear-sky.png";
}
  else if(data.weather[0].main=="Rain"){
   weathericon.src="image/heavy-rain.png";
}
  else if(data.weather[0].main=="Drizzle"){
   weathericon.src="image/cloudy(1).png";
}
  else if(data.weather[0].main=="Mist"){
   weathericon.src="image/fog.png";
}
}
searchbtn.addEventListener("click",()=>{
    checkweather(search.value);
})
