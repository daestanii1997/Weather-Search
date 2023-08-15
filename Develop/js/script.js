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
// API call function

function getApi() {

    let cityInput = document.querySelector('.city-input').value;
    console.log(cityInput)
    localStorage.setItem('historyBtn', cityInput);

    // Geocode Url to get lat and long

    var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=1&appid=be8e0248d5c480564f7b163365324150';

    fetch(geoCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('GeoCode Lat: ', data);

            // weather URL to apply lat and long to get results

            console.log(data[0].lat)
            console.log(data[0].lon)

            var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&limit=5&appid=be8e0248d5c480564f7b163365324150';

            fetch(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('weather:', data);

                    tempDisplay.textContent = data.main.temp + ' °F';
                    description.textContent = data.weather[0].description;
                    cityDisplay.textContent = data.name;
                    // dateContainer.textContent = dayjs().format(MMM,D);
                    iconDisplay.textContent = data.weather[0].icon;
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
        // tempDisplay.innerHTML = data.weather[0].main.temp;
        // description.innerHTML = weather.weather[0].description;
    }
};

searchBtn.addEventListener('click', getApi);

// Create separate function for history btn and call it in this function
// Figure out how to search button label in that function

function searchHistory() {

    let historyBtn = document.createElement('button');
    console.log(localStorage.getItem('historyBtn'))
    historyBtn.classList.add('history-btn');
    historyBtn.textContent = localStorage.getItem('historyBtn');

    asideSection.appendChild(historyBtn);
};

