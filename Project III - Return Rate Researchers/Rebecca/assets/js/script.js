// Global Variables
var searchForm = document.querySelector("#search-form");
var cityUserInput = document.querySelector("#city-input");
var invalidCity = document.getElementById("invalid-city");
var invalidFilter = document.getElementById("invalid-filter");
var columnTwoElement = document.querySelector("#column-two");
var foodFilter = document.getElementById("food-filter");
var eventFilter = document.getElementById("event-filter");
var mapScriptContainer = document.getElementById('map-script-container');
var historyHeaderEl = document.querySelector("#history-header");
var historyTitleEl = document.querySelector("#history-title");
var searchHistoryButtonsEl = document.querySelector("#search-history-buttons");


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
        invalidCity.className = 'invalid-search';
        console.log("error");
        return;
    }


    invalidCity.className = 'hide';
    city();
}

// Google geoCoding- fetch lat/lon of the user inputted (city, state)
// data is then assigned to global variable that will be used for Tripadivsor API
function city() {
    // google geocode api to search for user input
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityString}&key=AIzaSyCH4yGqeZ9N7crT3pXL-WYtjUrsDua-oq4`)
        .then(function (response) {
            return response.json();
        })
        //  assigns city lat/lon to cityData variable
        .then(function (data) {
            cityData.cityCoord.lon = data.results[0].geometry.location.lng;
            cityData.cityCoord.lon = parseFloat(cityData.cityCoord.lon);
            cityData.cityCoord.lat = data.results[0].geometry.location.lat;
            cityData.cityCoord.lat = parseFloat(cityData.cityCoord.lat);

            restaurants();
        })
        // errors for invalid city
        .catch(function (error) {
            console.log("NOT A VALID CITY");
            console.log(error);
        })
}

// Trip Advisory
// fetch restaurant data using lat/lon
// data assign to global vraiables to be used generate itinerary
// food filter 
function restaurants() {
    fetch("https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude="
        + cityData.cityCoord.lat + "&longitude=" + cityData.cityCoord.lon, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "df019328ffmsha32c19b7bd011fcp1d0dcdjsn4478570b6189"
        }
    })

        .then(response => {
            return response.json();
        })
        .then(data => {

            // Food Filter
            var key = cityData.userInput.resturantFilter;
            switch (key) {
                case "Italian":
                    key = ['Italian', 'Pizza'];
                    break;
                case "Asian":
                    key = ['Asian', 'Japanese', 'Chinese', 'Sushi'];
                    break;
            }

            // filtered array
            var foodFiltered = [];

            // filter loop
            if (key !== " ") {
                // loops through food data to find filter
                for (var k = 0; k < key.length; k++) {
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].name) {
                            for (var j = 0; j < data.data[i].cuisine.length; j++) {
                                if (data.data[i].cuisine[j].name === key[k]) {
                                    foodFiltered.push(data.data[i]);
                                }
                            }
                        }
                    }
                }

                // run filter 
                for (let i = 0; i < foodFiltered.length; i++) {
                    for (let j = 1 + i; j < foodFiltered.length; j++) {
                        if (foodFiltered[i].latitude === foodFiltered[j].latitude && foodFiltered[i].longitude === foodFiltered[j].longitude) {
                            foodFiltered.splice(j, 1);
                        }
                    }
                }

                for (let i = 0; i < foodFiltered.length; i++) {
                    for (let j = 1 + i; j < foodFiltered.length; j++) {
                        if (foodFiltered[i].latitude === foodFiltered[j].latitude && foodFiltered[i].longitude === foodFiltered[j].longitude) {
                            foodFiltered.splice(j, 1);
                        }
                    }
                }


                invalidFilter.className = 'hide';
                
                // index variables for restaurant data
                var resturantOneIdx = 0;
                var resturantTwoIdx = 0;

                // updates restaurant information
                resturantData.resturantOne.lon = foodFiltered[resturantOneIdx].longitude;
                resturantData.resturantOne.lat = foodFiltered[resturantOneIdx].latitude;
                resturantData.resturantOne.resturantName = foodFiltered[resturantOneIdx].name;
                resturantData.resturantOne.url = foodFiltered[resturantOneIdx].web_url;
                resturantData.resturantTwo.lon = foodFiltered[resturantTwoIdx].longitude;
                resturantData.resturantTwo.lat = foodFiltered[resturantTwoIdx].latitude;
                resturantData.resturantTwo.resturantName = foodFiltered[resturantTwoIdx].name;
                resturantData.resturantTwo.url = foodFiltered[resturantTwoIdx].web_url;
            }
            // else search all options 
            else {
                // filters out advertisements
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].name) {
                        foodFiltered.push(data.data[i]);
                    }
                }

                // index variables for restaurant data
                var resturantOneIdx = 0;
                var resturantTwoIdx = 0;

                if (foodFiltered.length > 1) {
                    while (resturantOneIdx === resturantTwoIdx) {
                        resturantOneIdx = randomNumber(0, foodFiltered.length - 1);
                        resturantTwoIdx = randomNumber(0, foodFiltered.length - 1);
                    }
                }

                // updates restaurant information
                resturantData.resturnatOne.lon = foodFiltered[resturantOneIdx].longitude;
                resturantData.resturantOne.lat = foodFiltered[resturantOneIdx].latitude;
                resturantData.resturantOne.resturantName = foodFiltered[resturantOneIdx].name;
                resturantData.resturantOne.url = foodFiltered[resturantOneIdx].web_url;
                resturantData.resturantTwo.lon = foodFiltered[resturantTwoIdx].longitude;
                resturantData.resturantTwo.lat = foodFiltered[resturantTwoIdx].latitude;
                resturantData.resturantTwo.resturantName = foodFiltered[resturantTwoIdx].name;
                resturantData.resturantTwo.url = foodFiltered[resturantTwoIdx].web_url;
            }

            // go to attraction tripadvisor api
            attractions();
        })
        .catch(err => {
            console.log(err);
        });
}

// Trip Advisor--
// fetch attractions/events data using lat/lon
// data assigned to global variables to be used generate itinerary
// attraction filter
function attractions() {
    fetch("https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng?lunit=km&currency=USD&limit=30&distance=5&lang=en_US&longitude="
        + cityData.cityCoord.lon + "&latitude=" + cityData.cityCoord.lat, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "df019328ffmsha32c19b7bd011fcp1d0dcdjsn4478570b6189"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {

            // event filter
            var key = cityData.userInput.attracionFilter;
            var eventFiltered = [];

            //filter loop
            if (key !== " ") {

                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].subcategory) {
                        for (var j = 0; j < data.data[i].subcategory.length; j++) {
                            if (data.data[i].subcategory[j].name === key) {
                                eventFiltered.push(data.data[i]);
                            }
                        }
                    }
                }

                // run filter 
                for (let i = 0; i < eventFiltered.length; i++) {
                    for (let j = 1 + i; j < eventFiltered.length; j++) {
                        if (eventFiltered[i].latitude === eventFiltered[j].latitude && eventFiltered[i].longitude === eventFiltered[j].longitude) {
                            eventFiltered.splice(j, 1);
                        }
                    }
                }

                for (let i = 0; i < eventFiltered.length; i++) {
                    for (let j = 1 + i; j < eventFiltered.length; j++) {
                        if (eventFiltered[i].latitude === eventFiltered[j].latitude && eventFiltered[i].longitude === eventFiltered[j].longitude) {
                            eventFiltered.splice(j, 1);
                        }
                    }
                }


                invalidFilter.className = 'hide';

                if (eventFiltered <= 1) {
                    for (var i = 0; i < data.data.length; i++) {
                        eventFiltered.push(data.data[i]);
                    }
                    invalidFilter.className = 'invalid-filter-input';
                }

                // event indexes for random numbers
                var eventOneIdx = 0;
                var eventTwoIdx = 0;

                // random number function to get two different random numbers
                while (eventOneIdx === eventTwoIdx) {
                    eventOneIdx = randomNumber(0, eventFiltered.length - 1);
                    eventTwoIdx = randomNumber(0, eventFiltered.length - 1);
                }

                // updates event information
                attractionData.eventOne.lon = eventFiltered[eventOneIdx].longitude;
                attractionData.eventOne.lat = eventFiltered[eventOneIdx].latitude;
                attractionData.eventOne.eventName = eventFiltered[eventOneIdx].name;
                attractionData.eventOne.url = eventFiltered[eventOneIdx].web_url;
                attractionData.eventTwo.lon = eventFiltered[eventTwoIdx].longitude;
                attractionData.eventTwo.lat = eventFiltered[eventTwoIdx].latitude;
                attractionData.eventTwo.eventName = eventFiltered[eventTwoIdx].name;
                attractionData.eventTwo.url = eventFiltered[eventTwoIdx].web_url;
            }
            // else search all options 
            else {
                for (var i = 0; i < data.data.length; i++) {
                    eventFiltered.push(data.data[i]);
                }

                var eventOneIdx = 0;
                var eventTwoIdx = 0;

                if (eventFiltered.length > 1) {
                    // random number function to get two different random numbers
                    while (eventOneIdx === eventTwoIdx) {
                        eventOneIdx = randomNumber(0, eventFiltered.length);
                        eventTwoIdx = randomNumber(0, eventFiltered.length);
                    }
                }

                // store attraction data
                attractionData.eventOne.lon = eventFiltered[eventOneIdx].longitude;
                attractionData.eventOne.lat = eventFiltered[eventOneIdx].latitude;
                attractionData.eventOne.eventName = eventFiltered[eventOneIdx].name;
                attractionData.eventOne.url = eventFiltered[eventOneIdx].web_url;
                attractionData.eventTwo.lon = eventFiltered[eventTwoIdx].longitude;
                attractionData.eventTwo.lat = eventFiltered2[eventTwoIdx].latitude;
                attractionData.eventTwo.eventName = enventFiltered[eventTwoIdx].name;
                attractionData.eventTwo.url = eventFiltered[eventTwoIdx].web_url;
            }

            // generate intinerary
            generateItinerary();
        })
        .catch(err => {
            console.log(err);
        });
}

// Itinerary--
// pull recently fetched data and contain it into an object
// object includes the city name, waypoints, fetched restaurants/event locations, and urls
// display Itinerary
function generateItinerary() {
    var displayCity = cityData.userInput.searchTerm.toUpperCase();
    var cityLatCoord = cityData.cityCoord.lat;
    var cityLonCoord = cityData.cityCoord.lon;
    var wayPointArray = ["A", "B", "C", "D"];
    var placeArray = [restData.restOne.restName, attractionData.eventOne.eventName, restData.restTwo.restName, attractionData.eventTwo.eventName];
    var urlArray = [restData.restOne.url, attractionData.eventOne.url, restData.restTwo.url, attractionData.eventTwo.url];
    var latArray = [restData.restOne.lat, attractionData.eventOne.lat, restData.restTwo.lat, attractionData.eventTwo.lat];
    var lonArray = [restData.restOne.lon, attractionData.eventOne.lon, restData.restTwo.lon, attractionData.eventTwo.lon];

    var itineraryObject = { "city": displayCity, "cityLat": cityLatCoord, "cityLong": cityLonCoord, "waypoint": wayPointArray, "place": placeArray, "url": urlArray, "lat": latArray, "long": lonArray };

    saveHistory(itineraryObject);
    displayItinerary(itineraryObject);
}

// Create Itinerary
// DOM display searched event click onto pagev
function displayItinerary(displayObject) {

    columnTwoElement.textContent = "";

    // Foundation for the card element
    var cardElement = document.createElement("div");
    cardElement.classList = "card itinerary";
    cardElement.setAttribute("id", "itinerary");

    // element - city name
    var titleElement = document.createElement("div");
    titleElement.textContent = "Itinerary for " + displayObject.city;
    titleElement.classList = "card-divider";
    titleElement.setAttribute("id", "itinerary-title");
    cardElement.append(titleElement);

    // itinerary section
    var listElement = document.createElement("div");
    listElement.classList = "card-section";
    listElement.setAttribute("id", "itinerary-list");

    for (var i = 0; i < 4; i++) {
        // element for each place
        var placeElement = document.createElement("a");
        placeElement.classList = "button event";
        placeElement.setAttribute("href", displayObject.url[i]);
        placeElement.setAttribute("target", "_blank");
        placeElement.textContent = displayObject.waypoint[i] + ": " + displayObject.place[i];

        listElement.append(placeElement);

        cardElement.append(listElement);
        columnTwoElement.append(cardElement);
    }

    // updates global variables from local storage
    resturantData.restOne.lon = displayObject.long[0];
    resturantData.restOne.lat = displayObject.lat[0];
    resturantData.restTwo.lon = displayObject.long[2];
    resturantData.restTwo.lat = displayObject.lat[2];
    attractionData.eventOne.lon = displayObject.long[1];
    attractionData.eventOne.lat = displayObject.lat[1];
    attractionData.eventTwo.lon = displayObject.long[3];
    attractionData.eventTwo.lat = displayObject.lat[3];
    cityData.cityCoord.lat = displayObject.cityLat;
    cityData.cityCoord.lon = displayObject.cityLong;

    initMap();
}

// Google Map-- 
// pin points on google map with restuarant & attraction lat/lon
// assign map data to data structure 
window.initMap = function () {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    if (!cityData.cityCoord.lat || !cityData.cityCoord.lon) {
        return;
    }

    // location variable to store lat/lng
    var location = { lat: cityData.cityCoord.lat, lng: cityData.cityCoord.lon };

    // create map
    map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 12
    });

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
};

// displays route on google maps
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    resturantData.resturantOne.lon = resturantData.resturantOne.lon.toString();
    resturantData.resturantOne.lat = resturantData.resturantOne.lat.toString();
    resturantData.resturantTwo.lon = resturantData.resurantTwo.lon.toString();
    resturantData.resturantTwo.lat = resturantData.resturantTwo.lat.toString();

    attractionData.eventOne.lon = attractionData.eventOne.lon.toString();
    attractionData.eventOne.lat = attractionData.eventOne.lat.toString();
    attractionData.eventTwo.lon = attractionData.eventTwo.lon.toString();
    attractionData.eventTwo.lat = attractionData.eventTwo.lat.toString();

    directionsService.route(
        {
            origin: restData.restOne.lat + ", " + restData.restOne.lon,
            waypoints: [{ location: attractionData.eventOne.lat + ", " + attractionData.eventOne.lon, stopover: true }, { location: resturantData.resturantTwo.lat + ", " + resturantData.resturantTwo.lon, stopover: true }],
            destination: attractionData.eventTwo.lat + ", " + attractionData.eventTwo.lon,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed: " + status);
            }
        }
    );
}

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
