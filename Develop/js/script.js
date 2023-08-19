//apiKey = 'be8e0248d5c480564f7b163365324150'

var searchBtn = document.querySelector('#searchBtn');
var asideSection = document.querySelector('#aside-section');
var tempDisplay = document.querySelector('.tempDisplay');
var description = document.querySelector('.description');
var cityDisplay = document.querySelector('.cityName');
var dateContainer = document.querySelector('.dateContainer');
var iconDisplay = document.querySelector('.icon');
var humidity = document.querySelector('.humidity');
var windSpeed = document.querySelector('.windSpeed')
let cityInput = document.querySelector('.city-input').value;
// API call function

function getApi() {

    let cityInput = document.querySelector('.city-input').value;

    localStorage.setItem('historyBtn', cityInput);

    // Geocode Url to get lat and long

    var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=5&appid=be8e0248d5c480564f7b163365324150';

    fetch(geoCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("GEO ", data);

            // weather URL to apply lat and long to get results

            var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&limit=5&appid=be8e0248d5c480564f7b163365324150';

            fetch(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log("WEATHER", data);

                    let weatherIcon = data.weather[0].icon

                    tempDisplay.textContent = data.main.temp + ' °F';
                    description.textContent = data.weather[0].description;
                    cityDisplay.textContent = data.name;
                    dateContainer.textContent = dayjs().format('MMM,D');
                    iconDisplay.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                    console.log(data.weather[0].icon);
                    humidity.textContent = "Humidity: " + data.main.humidity;
                    windSpeed.textContent = "Wind Speed: " + data.wind.speed;
                });
        })
        .catch(function (error) {
            console.log('error fetching data', error)
        })

    if (!cityInput) {
        window.alert('Please enter a city name')
    } else {
        searchHistory();
    }
};

searchBtn.addEventListener('click', getApi);

// Create separate function for history btn and call it in this function
// Figure out how to search button label in that function

function searchHistory() {

    for (let i = 0; i <= 0; i++) {

        let historyBtn = document.createElement('button');
        // console.log(localStorage.getItem('historyBtn'))
        historyBtn.classList.add('history-btn');
        historyBtn.textContent = localStorage.getItem('historyBtn');
        asideSection.appendChild(historyBtn);

        historyBtn.addEventListener('click', getApi);
    }

};

var forcastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ cityInput +'&appid=be8e0248d5c480564f7b163365324150&cnt=5';

fetch(forcastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log("FORCAST", data);
        console.log(dayjs(data[0].dt).format(dddd));

    });
// .catch(function (error) {
// console.log('error fetching data', error)
// })

