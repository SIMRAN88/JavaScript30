//----------------------------------------------declaration 
//start
var appKey = "0788dd95700ca36127955d1776db92e8";
var searchButton = document.getElementById("searchBtn");
var searchInput = document.getElementById("searchTxt");
var cityName = document.getElementById("cityName");
var icon = document.getElementById("icon");
var date = document.getElementById("date");
var temperature = document.getElementById("temp");
var maxTemp = document.getElementById("maxTemp");
var minTemp = document.getElementById("minTemp");
var humidity = document.getElementById("humidity");
var windSpeed = document.getElementById("windSpeed");
var pressure = document.getElementById("pressure");
var message = document.getElementById("message");
var btn = document.getElementById("btn");
var dislike = document.getElementById("dislike");
var temp1 = document.getElementById("temp1");
var temp2 = document.getElementById("temp2");
var temp3 = document.getElementById("temp3");
var hum1 = document.getElementById("hum1");
var hum2 = document.getElementById("hum2");
var hum3 = document.getElementById("hum3");
var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var favCity = document.getElementById("favCity");
var forecastCity = document.getElementById("forecast");
var forecastbtn = document.getElementById("forecastbtn");
var favCity;
var favTemp;
var savedCities = [];
var favouriteList = [];
//----------------------------------------------declaration 
//end



////----------------------------------------------condition for event listeners
//start
if (searchInput.value === "" && cityName == "undefined" && cityName == null) {
  debugger;
  btn.disabled = true;
  forecastCity.style.display = "none";
}
else {
  btn.addEventListener("click", addFavCity);
  forecastbtn.addEventListener("click", findForecastDetails);
  forecastbtn.addEventListener("click", function () {
    if (forecastCity.style.display === "block") {
      forecastCity.style.display = "none";
      forecastbtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';

    }
    else {
      forecastCity.style.display = "block";
      forecastbtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
    }

    console.log(forecastCity.style.display);
  })
}
////----------------------------------------------condition for event listeners
//end


////----------------------------------------------event listeners
//start
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", onSearch);
////----------------------------------------------event listeners
//end




//---------------------------------On page load the favourites must be shown
//start
(function OnInit() {
  var c = localStorage.getItem('fav');
  var favList = JSON.parse(localStorage.getItem('fav'));
  for (var obj of favList) {
    console.log(obj);
    favCity = obj.favCity;
    favTemp = obj.favTemp;
    addFavCity();

  }
})();
//---------------------------------On page load the favourites must be shown
//end



//-------------------------------------for showing the current time
//start
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function showTime() {
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  // add a zero in front of numbers<10
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  document.getElementById('time').innerHTML = hours + ":" + minutes + ":" + seconds;
  t = setTimeout(function () {
    showTime()
  }, 500);
}
showTime();
date.innerHTML = new Date().toDateString();
//--------------------------------------for showing the current time
//end





//-------------------------------------for searching the city
//start
function onSearch(event) {
  if (event.key === "Enter") {
    btn.addEventListener("click", addFavCity);
    findWeatherDetails();
  }
}
//-------------------------------------for searching the city
//end



//-------------------------------------function to find weather details using callback
//start
// function httpRequestAsync(callback)
// {
//   console.log("hello");
//   fetch.then(searchLink).
//    promiseToCall.then(fromResolve)
//     var httpRequest = new XMLHttpRequest();
//     httpRequest.onreadystatechange = () => { 
//         if (httpRequest.readyState == 4 && httpRequest.status == 200)
//             callback(httpRequest.responseText);
//     }
//     httpRequest.open("GET", url, true); // true for asynchronous 
//     httpRequest.send();
// }
//-------------------------------------function to find weather details using callback
//end



//-------------------------------------function to find weather details using promise
//start
// function findWeatherDetails() {
//   if (searchInput.value === "") {
//     btn.disabled = true;
//     M.toast({ html: 'Please input a city name for search', classes: 'rounded' });
//   } else {
//     var searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
//     fetch(searchLink)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (myJson) {
//         console.log(JSON.stringify(myJson));
//         response(myJson)
//       }).catch(e => {
//         console.log(e);
//         M.toast({ html: 'Please enter a city that exits.You live on earth not on Mars. ', classes: 'rounded' });
//         btn.disabled = true;

//       });
//   }
// }
//-------------------------------------function to find weather detailsusing promise
//end






//---------------------------------------------------------function to find weather deatis using async/await
//start
async function findWeatherDetails() {
  try {
    var url = "https://api.openweathermap1.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
    const cityData = await fetch(url);
    console.log(cityData);
    console.log("---------------------------");
    let data = await cityData.json();
    console.log(data);
    response(data);
    //console.log(result);
  }
  catch (err) {
    debugger;
    console.log(err.toString());
    console.log('fetch failed', err);
    M.toast({ html: 'Please enter a city that exits.You live on earth not on Mars. ', classes: 'rounded' });
    btn.disabled = true;
  }
}
//---------------------------------------------------------function to find weather deatisl using async/await
//end


//---------------------------------------------------------function to find weather forecast deatis using async/await
//start
async function findForecastDetails() {
  try {
    var url = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchInput.value + "&appid=" + appKey;
    const forecastData = await fetch(url);
    console.log(forecastData);
    console.log("---------------------------");
    let data = await forecastData.json();
    console.log(data);
    forecast(data);
    //console.log(result);
  }
  catch (err) {
    console.log('fetch failed', err);
    M.toast({ html: 'Please enter a city that exits.You live on earth not on Mars. ', classes: 'rounded' });
    btn.disabled = true;
  }
}


//-------------------------------------function to find weather forecast details
//start
// function findForecastDetails() {
//   if (searchInput.value === "") {
//     btn.disabled = true;
//     M.toast({ html: 'Please input a city name for search', classes: 'rounded' });
//     debugger;
//   } else {
//     var searchLink = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchInput.value + "&appid=" + appKey;
//     fetch(searchLink)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (myJson) {
//         forecast(myJson)
//       }).catch(e => {
//         M.toast({ html: 'Please enter a city that exits.You live on earth not on Mars. ', classes: 'rounded' });
//         btn.disabled = true;

//       });
//   }
// }
//-------------------------------------function to find weather forecast details
//end





//-------------------------------------function to get weather details
//start
function response(response) {
  var jsonObject = JSON.parse(JSON.stringify(response));
  console.log(jsonObject);
  cityName.innerHTML = jsonObject.name;
  favCity = cityName.innerHTML;
  if(savedCities.includes(favCity)){
    dislike.style.display = "block";
    btn.style.display = "none";
    dislike.addEventListener("click", remFavOnDislike);

  }
  else{
    dislike.style.display = "none";
    btn.style.display = "block";
    btn.addEventListener("click", addFavCity);

  }
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
  favTemp = temperature.innerHTML;
  humidity.innerHTML = jsonObject.main.humidity + "%";
  windSpeed.innerHTML = jsonObject.wind.speed + "mph";
  pressure.innerHTML = jsonObject.main.pressure;
  maxTemp.innerHTML = parseInt(jsonObject.main.temp_max - 273) + "°C" + "↑";
  minTemp.innerHTML = parseInt(jsonObject.main.temp_min - 273) + "°C" + "↓";
  var weather = jsonObject.weather[0].main;
  changeOnResponse(weather);
}
//-------------------------------------function to get weather details
//end





//-------------------------------------function to change background
//start
function changeOnResponse(weather) {
  console.log(weather);
  var top = document.getElementsByClassName("top")[0];
  switch (weather) {
    case "Haze", "Clouds":
      message.innerHTML = "The weather is cool. You must go out and play!";
      top.style.backgroundImage = "url('https://images.pexels.com/photos/253905/pexels-photo-253905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
      //document.body.style.background = "linear-gradient(-45deg, #2980b9, #6dd5fa, #ffffff)";  
      break;
    case "Thunderstorm":
      message.innerHTML = "Your dog is waitng for you. PLease come soon."
      top.style.backgroundImage = "url('https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
      //document.body.style.background = "linear-gradient(-45deg, #bdc3c7, #2c3e50)";
      break;
    case "Rainy" || "Mist" || "Drizzle":
      message.innerHTML = "Its time for some rain dance."
      top.style.backgroundImage = "url('https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
      //document.body.style.background = "linear-gradient(-45deg, #f4f7ca, #c5e2a1, #a1e2d7, #b4d1ed)";
      break;
    case "Snow":
      message.innerHTML = "Lets make a snow man and hit him with snow."
      top.style.backgroundImage = "url('https://images.pexels.com/photos/718857/pexels-photo-718857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
      //document.body.style.background = "linear-gradient(-45deg, #f4f7ca, #c5e2a1, #a1e2d7, #b4d1ed)";
      break;
    case "Clear":
      message.innerHTML = "Time for some work and food."
      top.style.backgroundImage = "url('https://images.pexels.com/photos/1530001/pexels-photo-1530001.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
      //document.body.style.background = "linear-gradient(-45deg, #f4f7ca, #c5e2a1, #a1e2d7, #b4d1ed)";
      break;
    default:
      message.innerHTML = "The weather never determines your mood."
      top.style.backgroundImage = "url('https://us.123rf.com/450wm/gigello/gigello1204/gigello120400031/13273013-rainy-weather-icon-with-clouds.jpg?ver=6')";
      break;
  }
}
//-------------------------------------function to change background
//end





//-------------------------------------function to display forecast details
//start
function forecast(response) {
  var jsonObject = JSON.parse(JSON.stringify(response));
  console.log(jsonObject.list[0]);
  var date = new Date();

  console.log(date.getDay());
  var weekday = new Array(7);
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  weekday[7] = "Sunday";
  console.log("Today is " + weekday[date.getDay()]);
  console.log("Tomorrow is " + weekday[date.getDay() + 1] + " and temp is " + parseInt(jsonObject.list[1].temp.day - 273) + "°C");
  temp1.innerHTML = Math.round((jsonObject.list[1].temp.day - 273) * 100 / 100) + "°C";
  temp2.innerHTML = Math.round((jsonObject.list[2].temp.day - 273) * 100 / 100) + "°C";
  temp3.innerHTML = Math.round((jsonObject.list[3].temp.day - 273) * 100 / 100) + "°C";
  hum1.innerHTML = jsonObject.list[1].humidity + "%";
  hum2.innerHTML = jsonObject.list[2].humidity + "%";
  hum3.innerHTML = jsonObject.list[3].humidity + "%";
  day1.innerHTML = weekday[date.getDay() + 1];
  day2.innerHTML = weekday[date.getDay() + 2];
  day3.innerHTML = weekday[date.getDay() + 3];

  console.log("day after Tomorrow is " + weekday[date.getDay() + 2] + " and temp is " + parseInt(jsonObject.list[2].temp.day - 273) + "°C");
  console.log(" further day after Tomorrow is " + weekday[date.getDay() + 3] + " and temp is " + parseInt(jsonObject.list[3].temp.day - 273) + "°C");
}
//-------------------------------------function to display forecast details
//end





//-------------------------------------function to add city to favourites
//start
function addFavCity() {
    if (savedCities.includes(favCity)) {
    M.toast({ html: 'The city is already added in favourites', classes: 'rounded' });
    btn.style.display = "none";
    dislike.style.display = "block";
    dislike.addEventListener("click", remFavOnDislike);
   }
  else if (favCity === "undefined") {
    M.toast({ html: 'Sorry This city does not exist', classes: 'rounded' });
  }
  else if (savedCities.length === 6) {
    M.toast({ html: 'Oops cannot add more cities to the list', classes: 'rounded' });
  }
  else {
    debugger;
    btn.style.display = "block";
    console.log(favCity);
    savedCities.push(favCity);
    console.log(favTemp);
    console.log(savedCities);
    var newDiv = document.createElement("div");
    console.log(newDiv);
    var newCity = document.createElement('h4');
    var newTemp = document.createElement('p');
    var newbtn = document.createElement('BUTTON');
    newTemp.innerHTML = favTemp;
    newCity.innerHTML = favCity;
    newbtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
    newDiv.appendChild(newCity);
    newDiv.appendChild(newTemp);
    newDiv.appendChild(newbtn);
    newDiv.id = "small-card3";
    newDiv.classList.add(favCity);
    newbtn.classList.add("btn-floating", "btn-small", "waves-effect", "waves-light", "red", "delete-btn");
    var currentDiv = document.getElementById("favCity");
    document.body.insertBefore(newDiv, currentDiv);
    // btn.style.display = "none";
    // dislike.btn.display = "block";
    
    if (savedCities.includes()) {
      console.log("It is alreday there in your favourie list");
    }
    else {
      favouriteList.push({ favCity: favCity, favTemp: favTemp });
    }
    localStorage.setItem('fav', JSON.stringify(favouriteList));
    newbtn.addEventListener("click", removeFavCity);
  }
}
//-------------------------------------function to add city to favourites
//end





//-------------------------------------function to remove city from favourites
//start
function removeFavCity(event) {
  if (event) {
    var getCity = event.target.parentElement;
    var removeCity = getCity.children[0].innerHTML;
    savedCities = savedCities.filter(function (item) {
      return item !== removeCity
    })
    favouriteList = favouriteList.filter(function (item) {
      return item.favCity !== removeCity
    })
    localStorage.setItem('fav', JSON.stringify(favouriteList));
    getCity.parentElement.removeChild(getCity);
    btn.style.display = "block";
  }
}
//-------------------------------------function to remove city from favourites
//end





//-------------------------------------function to remove city by disliking
//start
function remFavOnDislike(event) {

  if (event) {
    var getCity = event.target.parentElement;
    var getDislikeCity = cityName.innerHTML;
    savedCities = savedCities.filter(function (item) {
      return item !== getDislikeCity
    })
    favouriteList = favouriteList.filter(function (item) {
      return item.favCity !== getDislikeCity
    })
    localStorage.setItem('fav', JSON.stringify(favouriteList));
    var toRemove = document.getElementsByClassName(favCity)[0];
    toRemove.parentElement.removeChild(toRemove);
    dislike.style.display = "none";

    btn.style.display = "block";
    localStorage.setItem('fav', JSON.stringify(favouriteList));

  }
}
//-------------------------------------function to remove city by disliking
//end







// function httpRequestAsync(callback)
// {
//   console.log("hello");
//   fetch.then(searchLink).
//    promiseToCall.then(fromResolve)
//     var httpRequest = new XMLHttpRequest();
//     httpRequest.onreadystatechange = () => { 
//         if (httpRequest.readyState == 4 && httpRequest.status == 200)
//             callback(httpRequest.responseText);
//     }
//     httpRequest.open("GET", url, true); // true for asynchronous 
//     httpRequest.send();
// }
// async function findWeatherDetails() {
//   try {
//     var url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
//     const response = await fetch(url);
//     console.log(response);

//     console.log(await response.text());
//     console.log(result);
//   }
//   catch (err) {
//     console.log('fetch failed', err);
//   }
//   theResponse(response.text().json());
// }
// var promiseToCall = new Promise(function(resolve,reject){

//   if(searchInput.value === ""){
//     reject("Cannot fetch the api");
//   }
//   else{
//     var searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
//     resolve(searchLink);
//   }
// });
//  promiseToCall