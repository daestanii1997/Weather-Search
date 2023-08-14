//apiKey = 'be8e0248d5c480564f7b163365324150'

var searchBtn = document.querySelector('#searchBtn');
var asideSection = document.querySelector('#aside-section');

// API call function

function getApi() {

    let cityInput = document.querySelector('.city-input').value;
    console.log(cityInput)

    // Geocode Url to get lat and long

    var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=1&appid=be8e0248d5c480564f7b163365324150';

    fetch(geoCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('GeoCode Lat: ', data);

            // weather URL to apply lat and long to get results

            var weatherUrl = 'http://api.openweathermap.org/geo/1.0/reverse?lat=' + data[0].lat + '&lon=' + data[0].lon + '&limit=5&appid=be8e0248d5c480564f7b163365324150';

            fetch(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('Weather: ', data);
                });
        })
        .catch(function (error) {
            console.log('error fetching data', error)
        })



    if (!cityInput) {
        window.alert('Please enter a city name')
        // find a way to 
    }

    searchHistory();
};

searchBtn.addEventListener('click', getApi);

// Create separate function for history btn and call it in this function
// Figure out how to search button label in that function

function searchHistory() {
    let cityInput = document.querySelector('.city-input').value;
    let historyBtn = document.createElement('button');
    historyBtn.classList.add('history-btn');
    historyBtn.textContent = cityInput;
    asideSection.appendChild(historyBtn);

    localStorage.setItem(historyBtn, cityInput);
    historyBtn.value = localStorage.getItem('cityInput');
};
