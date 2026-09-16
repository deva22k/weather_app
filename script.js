const apiKey = "4d4ba8cfe76281b24b9567e09a19b6e8";

const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let suggestions = document.querySelector(".suggestions");

let weatherIcon = document.querySelector(".weather-icon");
let temperature = document.querySelector(".temp");
let city = document.querySelector(".city");
let condition = document.querySelector(".condition");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");

searchBox.addEventListener("input", async function() {
    let text = searchBox.value.trim();
    suggestions.innerHTML = "";
    if (text.length < 2) {
        return;
    }

    let response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${apiKey}`
    );

    let data = await response.json();

    data.forEach(place=> {

        let option = document.createElement("div");

        option.innerText =
            place.name +
            (place.state ? ", " + place.state : "") +
            ", " +
            place.country;

        suggestions.appendChild(option);

        option.addEventListener("click", function() {

            searchBox.value = place.name;

            suggestions.innerHTML = "";

            checkWeather(place.name);

        });

    });

});


async function checkWeather(cityName) {

    const response = await fetch(
        apiUrl + cityName + `&appid=${apiKey}`
    );


    if (response.status == 404) {

        alert("City not found");

        return;

    }


    const data = await response.json();


    city.innerText = data.name;

    temperature.innerText =
        Math.round(data.main.temp) + "°C";

    condition.innerText =
        data.weather[0].description;

    humidity.innerText =
        data.main.humidity + "%";

    wind.innerText =
        Math.round(data.wind.speed * 3.6) + " km/h";



    if (data.weather[0].main == "Clouds") {

        weatherIcon.src = "images/clouds.png";

    }

    else if (data.weather[0].main == "Clear") {

        weatherIcon.src = "images/clear.png";

    }

    else if (data.weather[0].main == "Rain") {

        weatherIcon.src = "images/rain.png";

    }

    else if (data.weather[0].main == "Drizzle") {

        weatherIcon.src = "images/drizzle.png";

    }

    else if (data.weather[0].main == "Snow") {

        weatherIcon.src = "images/snow.png";

    }

    else if (data.weather[0].main == "Mist") {

        weatherIcon.src = "images/mist.png";

    }

}

searchButton.addEventListener("click", function() {

    let cityName = searchBox.value.trim();


    if (cityName == "") {

        alert("Please enter a city name");

        return;

    }


    suggestions.innerHTML = "";

    checkWeather(cityName);

});