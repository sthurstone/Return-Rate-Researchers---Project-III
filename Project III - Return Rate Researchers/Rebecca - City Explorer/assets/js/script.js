console.log('Hi')
// Global Variables
var searchForm = document.querySelector("#search-form");
var cityUserInput = document.querySelector("#city-input");
// var invalidCity = document.getElementById("invalid-city");
var columnTwoElement = document.querySelector("#column-two");
var foodFilter = document.getElementById("food-filter");
var eventFilter = document.getElementById("event-filter");
var mapScriptContainer = document.getElementById('map-script-container');
var historyHeaderEl = document.querySelector("#history-header");
var historyTitleEl = document.querySelector("#history-title");
var searchHistoryButtonsEl = document.querySelector("#search-history-buttons");
// weather global variables
var city1 = document.querySelector("#cityName")
var currentTemp = document.querySelector("#currentTemp")
var currentWind = document.querySelector("#currentWind")
var currentHum = document.querySelector("#currentHum")
var currentUvi = document.querySelector("#currentUvi")
var date1 = document.querySelector("#date1")
var icon1 = document.querySelector("#icon1")
var dailyTemp1 = document.querySelector("#temp1")
var dailyWind1 = document.querySelector("#wind1")
var dailyHum1 = document.querySelector("#hum1")
var date2 = document.querySelector("#date2")
var icon2 = document.querySelector("#icon2")
var dailyTemp2 = document.querySelector("#temp2")
var dailyWind2 = document.querySelector("#wind2")
var dailyHum2 = document.querySelector("#hum2")
var date3 = document.querySelector("#date3")
var icon3 = document.querySelector("#icon3")
var dailyTemp3 = document.querySelector("#temp3")
var dailyWind3 = document.querySelector("#wind3")
var dailyHum3 = document.querySelector("#hum3")
var date4 = document.querySelector("#date4")
var icon4 = document.querySelector("#icon4")
var dailyTemp4 = document.querySelector("#temp4")
var dailyWind4 = document.querySelector("#wind4")
var dailyHum4 = document.querySelector("#hum4")
var date5 = document.querySelector("#date5")
var icon5 = document.querySelector("#icon5")
var dailyTemp5 = document.querySelector("#temp5")
var dailyWind5 = document.querySelector("#wind5")
var dailyHum5 = document.querySelector("#hum5")


// objects
var map;
var cityData = {
    userInput: {
        searchTerm: "",
        resturantFilter: "",
        attractionFilter: ""
    },
    cityCoord: {
        lat: 0.0,
        lon: 0.0
    }
};
var resturantData = {
    resturantOne: {
        resturantName: "",
        lat: "",
        lon: "",
        url: ""
    },
    resturantTwo: {
        resturantName: "",
        lat: "",
        lon: "",
        url: ""
    }
};
var attractionData = {
    eventOne: {
        eventName: "",
        lat: "",
        lon: "",
        url: ""
    },
    eventTwo: {
        eventName: "",
        lat: "",
        lon: "",
        url: ""
    }
};
var cityString = "";


// random number generator to get a random search of resturants and attractions
function randomNumber(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

// User Input-- city, state + food filter + event filter
// assign to objects that are empty
// convert city, state data to lat/lon
// event listener for submit click
function getUserInput(event) {
    event.preventDefault();

    // user input
    cityData.userInput.searchTerm = cityUserInput.value.toLowerCase();
    cityData.userInput.resturantFilter = foodFilter.value;
    cityData.userInput.attractionFilter = eventFilter.value;

    // reset input field
    searchForm.reset();

    // error handling
    cityString = cityData.userInput.searchTerm;
    cityString = " " + cityString.trim();
    cityString = cityString.replace(" ", "+");

    // grab input string and check if the length is not = 2 since the user has to enter in a two-letter state abbreviation. If not equal to 2, return an error.
    var check = cityString.substring(cityString.indexOf(", ") + 2);
    if (check.length !== 2) {
        console.log("error");
        return;
    }

    city();
}

// Google geoCoding- fetch lat/lon of the user inputted (city, state)
// data is then assigned to global variable that will be used for Tripadivsor API
function city() {
    // google geocode api to search for user input
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityString}&key=AIzaSyC5b64G1EHZ7tbti_zFvc5JJaOYF4g6sGM`)
        .then(function (response) {
            return response.json();
        })
        //  assigns city lat/lon to cityData variable
        .then(function (data) {
            cityData.cityCoord.lon = data.results[0].geometry.location.lng;
            cityData.cityCoord.lon = parseFloat(cityData.cityCoord.lon);
            cityData.cityCoord.lat = data.results[0].geometry.location.lat;
            cityData.cityCoord.lat = parseFloat(cityData.cityCoord.lat);

        })
        // errors for invalid city
        .catch(function (error) {
            console.log("NOT A VALID CITY");
            console.log(error);
        })

        getWeatherData();
}

console.log("Middle")

// Trip Advisory
// fetch restaurant data using lat/lon
// data assign to global vraiables to be used generate itinerary
// food filter 
// function restaurants() {
//     console.log('resturant')
//     fetch("https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude="
//         + cityData.cityCoord.lat + "&longitude=" + cityData.cityCoord.lon, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
//             "x-rapidapi-key": "905432c018msh6a3ed62865e9563p1b43e3jsn820a674f2c34"
//         }
//     })

//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             console.log(data)

//             // Food Filter
//             var key = cityData.userInput.resturantFilter;
//             switch (key) {
//                 case "Italian":
//                     key = ['Italian', 'Pizza'];
//                     break;
//                 case "Asian":
//                     key = ['Asian', 'Japanese', 'Chinese', 'Sushi'];
//                     break;
//                 default:
//                     key = [key]
//             }

//             // filtered array
//             var foodFiltered = [];

//             // filter loop
//             if (key !== " ") {
//                 console.log(key)
//                 key.forEach(k => {
//                     data.data.forEach((resturant) => {
//                         if (resturant.cuisine) {
//                             resturant.cuisine.forEach(cuisine => {
//                                 cuisine.name === k ? foodFiltered.push(resturant) : ''
//                             })
//                         }
//                     });
//                 });
//                 console.log(foodFiltered)

//                 // index variables for restaurant data
//                 var resturantOneIdx = 0;
//                 var resturantTwoIdx = 1;

//                 // updates restaurant information
//                 resturantData.resturantOne.lon = foodFiltered[resturantOneIdx].longitude;
//                 resturantData.resturantOne.lat = foodFiltered[resturantOneIdx].latitude;
//                 resturantData.resturantOne.resturantName = foodFiltered[resturantOneIdx].name;
//                 resturantData.resturantOne.url = foodFiltered[resturantOneIdx].web_url;
//                 resturantData.resturantTwo.lon = foodFiltered[resturantTwoIdx].longitude;
//                 resturantData.resturantTwo.lat = foodFiltered[resturantTwoIdx].latitude;
//                 resturantData.resturantTwo.resturantName = foodFiltered[resturantTwoIdx].name;
//                 resturantData.resturantTwo.url = foodFiltered[resturantTwoIdx].web_url;
//             }
//             // else search all options 
//             else {
//                 // filters out advertisements
//                 for (var i = 0; i < data.data.length; i++) {
//                     if (data.data[i].name) {
//                         foodFiltered.push(data.data[i]);
//                     }
//                 }

//                 // index variables for restaurant data
//                 var resturantOneIdx = 0;
//                 var resturantTwoIdx = 2;

//                 if (foodFiltered.length > 1) {
//                     while (resturantOneIdx === resturantTwoIdx) {
//                         resturantOneIdx = randomNumber(0, foodFiltered.length - 1);
//                         resturantTwoIdx = randomNumber(0, foodFiltered.length - 1);
//                     }
//                 }

//                 // updates restaurant information
//                 resturantData.resturnatOne.lon = foodFiltered[resturantOneIdx].longitude;
//                 resturantData.resturantOne.lat = foodFiltered[resturantOneIdx].latitude;
//                 resturantData.resturantOne.resturantName = foodFiltered[resturantOneIdx].name;
//                 resturantData.resturantOne.url = foodFiltered[resturantOneIdx].web_url;
//                 resturantData.resturantTwo.lon = foodFiltered[resturantTwoIdx].longitude;
//                 resturantData.resturantTwo.lat = foodFiltered[resturantTwoIdx].latitude;
//                 resturantData.resturantTwo.resturantName = foodFiltered[resturantTwoIdx].name;
//                 resturantData.resturantTwo.url = foodFiltered[resturantTwoIdx].web_url;
//             }

//             // go to attraction tripadvisor api
//             attractions();
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// // Trip Advisor--
// // fetch attractions/events data using lat/lon
// // data assigned to global variables to be used generate itinerary
// // attraction filter
// function attractions() {
//     fetch("https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng?lunit=km&currency=USD&limit=30&distance=5&lang=en_US&longitude="
//         + cityData.cityCoord.lon + "&latitude=" + cityData.cityCoord.lat, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
//             "x-rapidapi-key": "905432c018msh6a3ed62865e9563p1b43e3jsn820a674f2c34"
//         }
//     })
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {

//             // event filter
//             var key = cityData.userInput.attracionFilter;
//             var eventFiltered = [];

//             //filter loop
//             if (key !== " ") {

//                 for (var i = 0; i < data.data.length; i++) {
//                     if (data.data[i].subcategory) {
//                         for (var j = 0; j < data.data[i].subcategory.length; j++) {
//                             if (data.data[i].subcategory[j].name === key) {
//                                 eventFiltered.push(data.data[i]);
//                             }
//                         }
//                     }
//                 }

//                 // run filter 
//                 for (let i = 0; i < eventFiltered.length; i++) {
//                     for (let j = 1 + i; j < eventFiltered.length; j++) {
//                         if (eventFiltered[i].latitude === eventFiltered[j].latitude && eventFiltered[i].longitude === eventFiltered[j].longitude) {
//                             eventFiltered.splice(j, 1);
//                         }
//                     }
//                 }

//                 for (let i = 0; i < eventFiltered.length; i++) {
//                     for (let j = 1 + i; j < eventFiltered.length; j++) {
//                         if (eventFiltered[i].latitude === eventFiltered[j].latitude && eventFiltered[i].longitude === eventFiltered[j].longitude) {
//                             eventFiltered.splice(j, 1);
//                         }
//                     }
//                 }

//                 if (eventFiltered <= 1) {
//                     for (var i = 0; i < data.data.length; i++) {
//                         eventFiltered.push(data.data[i]);
//                     }
//                 }

//                 // event indexes for random numbers
//                 var eventOneIdx = 0;
//                 var eventTwoIdx = 0;

//                 // random number function to get two different random numbers
//                 while (eventOneIdx === eventTwoIdx) {
//                     eventOneIdx = randomNumber(0, eventFiltered.length - 1);
//                     eventTwoIdx = randomNumber(0, eventFiltered.length - 1);
//                 }

//                 // updates event information
//                 attractionData.eventOne.lon = eventFiltered[eventOneIdx].longitude;
//                 attractionData.eventOne.lat = eventFiltered[eventOneIdx].latitude;
//                 attractionData.eventOne.eventName = eventFiltered[eventOneIdx].name;
//                 attractionData.eventOne.url = eventFiltered[eventOneIdx].web_url;
//                 attractionData.eventTwo.lon = eventFiltered[eventTwoIdx].longitude;
//                 attractionData.eventTwo.lat = eventFiltered[eventTwoIdx].latitude;
//                 attractionData.eventTwo.eventName = eventFiltered[eventTwoIdx].name;
//                 attractionData.eventTwo.url = eventFiltered[eventTwoIdx].web_url;
//             }
//             // else search all options 
//             else {
//                 for (var i = 0; i < data.data.length; i++) {
//                     eventFiltered.push(data.data[i]);
//                 }

//                 var eventOneIdx = 0;
//                 var eventTwoIdx = 0;

//                 if (eventFiltered.length > 1) {
//                     // random number function to get two different random numbers
//                     while (eventOneIdx === eventTwoIdx) {
//                         eventOneIdx = randomNumber(0, eventFiltered.length);
//                         eventTwoIdx = randomNumber(0, eventFiltered.length);
//                     }
//                 }

//                 // store attraction data
//                 attractionData.eventOne.lon = eventFiltered[eventOneIdx].longitude;
//                 attractionData.eventOne.lat = eventFiltered[eventOneIdx].latitude;
//                 attractionData.eventOne.eventName = eventFiltered[eventOneIdx].name;
//                 attractionData.eventOne.url = eventFiltered[eventOneIdx].web_url;
//                 attractionData.eventTwo.lon = eventFiltered[eventTwoIdx].longitude;
//                 attractionData.eventTwo.lat = eventFiltered2[eventTwoIdx].latitude;
//                 attractionData.eventTwo.eventName = enventFiltered[eventTwoIdx].name;
//                 attractionData.eventTwo.url = eventFiltered[eventTwoIdx].web_url;
//             }

//             // generate intinerary
//             generateItinerary();
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// // Itinerary--
// // pull recently fetched data and contain it into an object
// // object includes the city name, waypoints, fetched restaurants/event locations, and urls
// // display Itinerary
// function generateItinerary() {
//     var displayCity = cityData.userInput.searchTerm.toUpperCase();
//     var cityLatCoord = cityData.cityCoord.lat;
//     var cityLonCoord = cityData.cityCoord.lon;
//     var wayPointArray = ["A", "B", "C", "D"];
//     var placeArray = [resturantData.resturantOne.resturantName, attractionData.eventOne.eventName, resturantData.resturantTwo.resturantName, attractionData.eventTwo.eventName];
//     var urlArray = [resturantData.resturantOne.url, attractionData.eventOne.url, resturantData.resturantTwo.url, attractionData.eventTwo.url];
//     var latArray = [resturantData.resturantOne.lat, attractionData.eventOne.lat, resturantData.resturantTwo.lat, attractionData.eventTwo.lat];
//     var lonArray = [resturantData.resturantOne.lon, attractionData.eventOne.lon, resturantData.resturantTwo.lon, attractionData.eventTwo.lon];

//     var itineraryObject = { "city": displayCity, "cityLat": cityLatCoord, "cityLong": cityLonCoord, "waypoint": wayPointArray, "place": placeArray, "url": urlArray, "lat": latArray, "long": lonArray };

//     // saveHistory(itineraryObject);
//     displayItinerary(itineraryObject);
// }

// // Create Itinerary
// // DOM display searched event click onto pagev
// function displayItinerary(displayObject) {

//     columnTwoElement.textContent = "";

//     // Foundation for the card element
//     var cardElement = document.createElement("div");
//     cardElement.classList = "card itinerary";
//     cardElement.setAttribute("id", "itinerary");

//     // element - city name
//     var titleElement = document.createElement("div");
//     titleElement.textContent = "Itinerary for " + displayObject.city;
//     titleElement.classList = "card-divider";
//     titleElement.setAttribute("id", "itinerary-title");
//     cardElement.append(titleElement);

//     // itinerary section
//     var listElement = document.createElement("div");
//     listElement.classList = "card-section";
//     listElement.setAttribute("id", "itinerary-list");

//     for (var i = 0; i < 4; i++) {
//         // element for each place
//         var placeElement = document.createElement("a");
//         placeElement.classList = "button event";
//         placeElement.setAttribute("href", displayObject.url[i]);
//         placeElement.setAttribute("target", "_blank");
//         placeElement.textContent = displayObject.waypoint[i] + ": " + displayObject.place[i];

//         listElement.append(placeElement);

//         cardElement.append(listElement);
//         columnTwoElement.append(cardElement);
//     }

//     // updates global variables from local storage
//     resturantData.resturantOne.lon = displayObject.long[0];
//     resturantData.resturantOne.lat = displayObject.lat[0];
//     resturantData.resturantTwo.lon = displayObject.long[2];
//     resturantData.resturantTwo.lat = displayObject.lat[2];
//     attractionData.eventOne.lon = displayObject.long[1];
//     attractionData.eventOne.lat = displayObject.lat[1];
//     attractionData.eventTwo.lon = displayObject.long[3];
//     attractionData.eventTwo.lat = displayObject.lat[3];
//     cityData.cityCoord.lat = displayObject.cityLat;
//     cityData.cityCoord.lon = displayObject.cityLong;

//     initMap();
// }

// // Google Map-- 
// // pin points on google map with restuarant & attraction lat/lon
// // assign map data to data structure 
// window.initMap = function () {
//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();

//     if (!cityData.cityCoord.lat || !cityData.cityCoord.lon) {
//         return;
//     }

//     // location variable to store lat/lng
//     var location = { lat: cityData.cityCoord.lat, lng: cityData.cityCoord.lon };

//     // create map
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: location,
//         zoom: 15
//     });

//     directionsRenderer.setMap(map);
//     calculateAndDisplayRoute(directionsService, directionsRenderer);
// };

// // displays route on google maps
// function calculateAndDisplayRoute(directionsService, directionsRenderer) {
//     resturantData.resturantOne.lon = resturantData.resturantOne.lon.toString();
//     resturantData.resturantOne.lat = resturantData.resturantOne.lat.toString();
//     resturantData.resturantTwo.lon = resturantData.resturantTwo.lon.toString();
//     resturantData.resturantTwo.lat = resturantData.resturantTwo.lat.toString();

//     attractionData.eventOne.lon = attractionData.eventOne.lon.toString();
//     attractionData.eventOne.lat = attractionData.eventOne.lat.toString();
//     attractionData.eventTwo.lon = attractionData.eventTwo.lon.toString();
//     attractionData.eventTwo.lat = attractionData.eventTwo.lat.toString();

//     directionsService.route(
//         {
//             origin: resturantData.resturantOne.lat + ", " + resturantData.resturantOne.lon,
//             waypoints: [{ location: attractionData.eventOne.lat + ", " + attractionData.eventOne.lon, stopover: true }, { location: resturantData.resturantTwo.lat + ", " + resturantData.resturantTwo.lon, stopover: true }],
//             destination: attractionData.eventTwo.lat + ", " + attractionData.eventTwo.lon,
//             travelMode: google.maps.TravelMode.DRIVING
//         },
//         (response, status) => {
//             if (status === "OK") {
//                 directionsRenderer.setDirections(response);
//             } else {
//                 window.alert("Directions failed: " + status);
//             }
//         }
//     );
// }


// Covid Data
// function covidData() {
//     fetch("./Covid_Data.json")
//         .then(response => {
//             console.log(response)
//             return response.json();
//         })
//         .then(jsondata => {
//             console.log(jsondata)

//             // // State Filter
//             // // split input
//             // cityString = cityData.userInput.searchTerm;
//             // covidKey = cityString.split(',')
//             // console.log(covidKey)

//             // var stateCovid = []

//             // // filter loop
//             // if (covidKey !== " ") {
//             //     console.log(covidKey)
//             // }
//             // console.log(stateCovid)
//         });
//     }

// weather Data
// function getWeatherData() {
//     var API_KEY = "788d5638d7c8e354a162d6c9747d1bdf"
//     // open Weather api geocode api to search for user input
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.cityCoord.lat}&lon=${cityData.cityCoord.lon}&appid=${API_KEY}`)
//         .then(weather => {
//             return weather.json();
//         })
//         .then(data => {
//             console.log(data)
//         });
//         get5Day()
//     }

// function to call 5-DAY FORECAST 
function getWeatherData() {
    var API_KEY = "788d5638d7c8e354a162d6c9747d1bdf"
    // open Weather api geocode api to search for user input
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.cityCoord.lat}&lon=${cityData.cityCoord.lon}&units=imperial&exclude=hourly,minutely&appid=${API_KEY}`)
        .then(forecast => {
            return forecast.json();
        })
        .then(forecastData => {
            console.log(forecastData)

            // // update current weather objects
            // sets all the data for the current weather to the dashboard
            let weatherData = forecastData
            let temp = weatherData.current.temp
            let wind = weatherData.current.wind_speed
            let hum = weatherData.current.humidity
            let uvi = weatherData.current.uvi
            let iconPic = weatherData.current.weather[0].icon
            let iconUrl = "https://openweathermap.org/img/wn/" + iconPic + ".png"
            let img = document.createElement("img")
            img.setAttribute("src", iconUrl)
            city1.textContent = cityData.userInput.searchTerm.toUpperCase();
            currentTemp.textContent = 'Temperature: ' + temp + '°F'
            currentWind.textContent = 'Wind: ' + wind + ' MPH'
            currentHum.textContent = 'Humidity: ' + hum + '%'
            currentUvi.textContent = 'UV Index: '+ uvi
            // update five day forecast
            // day1
            let unix = weatherData.daily[1].dt
            let dateFormat1 = moment(unix * 1000).format("MM-DD-YYYY")
            date1.textContent = dateFormat1
            let temp1 = weatherData.daily[1].temp.day
            let wind1 = weatherData.daily[1].wind_speed
            let hum1 = weatherData.daily[1].humidity
            dailyTemp1.textContent = 'Temperature: ' + temp1 + '°F'
            dailyWind1.textContent = 'Wind: ' + wind1 + '  MPH'
            dailyHum1.textContent = 'Humidity: ' + hum1 + '%'
            // day2
            let unix2 = weatherData.daily[2].dt
            let dateFormat2 = moment(unix2 * 1000).format("MM-DD-YYYY")
            date2.textContent = dateFormat2
            let temp2 = weatherData.daily[2].temp.day
            let wind2 = weatherData.daily[2].wind_speed
            let hum2 = weatherData.daily[2].humidity
            dailyTemp2.textContent = 'Temperature: ' + temp2 + '°F'
            dailyWind2.textContent = 'Wind: ' + wind2 + '  MPH'
            dailyHum2.textContent = 'Humidity: ' + hum2 + '%'
            // day3
            let unix3 = weatherData.daily[3].dt
            let dateFormat3 = moment(unix3 * 1000).format("MM-DD-YYYY")
            date3.textContent = dateFormat3
            let temp3 = weatherData.daily[3].temp.day
            let wind3 = weatherData.daily[3].wind_speed
            let hum3 = weatherData.daily[3].humidity
            dailyTemp3.textContent = 'Temperature: ' + temp3 + '°F'
            dailyWind3.textContent = 'Wind: ' + wind3 + '  MPH'
            dailyHum3.textContent = 'Humidity: ' + hum3 + '%'
            // day4
            let unix4 = weatherData.daily[4].dt
            let dateFormat4 = moment(unix4 * 1000).format("MM-DD-YYYY")
            date4.textContent = dateFormat4
            let temp4 = weatherData.daily[4].temp.day
            let wind4 = weatherData.daily[4].wind_speed
            let hum4 = weatherData.daily[4].humidity
            dailyTemp4.textContent = 'Temperature: ' + temp4 + '°F'
            dailyWind4.textContent = 'Wind: ' + wind4 + '  MPH'
            dailyHum4.textContent = 'Humidity: ' + hum4 + '%'
            // day5
            let unix5 = weatherData.daily[5].dt
            let dateFormat5 = moment(unix5 * 1000).format("MM-DD-YYYY")
            date5.textContent = dateFormat5
            let temp5 = weatherData.daily[5].temp.day
            let wind5 = weatherData.daily[5].wind_speed
            let hum5 = weatherData.daily[5].humidity
            dailyTemp5.textContent = 'Temperature: ' + temp5 + '°F'
            dailyWind5.textContent = 'Wind: ' + wind5 + '  MPH'
            dailyHum5.textContent = 'Humidity: ' + hum5 + '%'
        });
}

// break
function loadFromSearch(event) {
    // pull saved data
    var searchHistory = JSON.parse(localStorage.getItem("search-history"));
    var buttonIndex = event.target.id;
    var currentLoad = searchHistory[buttonIndex];

    displayItinerary(currentLoad);
}

function loadPage() {
    var getHistory = JSON.parse(localStorage.getItem("search-history"));
}

// globally call load page function 
loadPage();

// event listener for submit click (user input)
searchForm.addEventListener("submit", getUserInput)

console.log('Bye')