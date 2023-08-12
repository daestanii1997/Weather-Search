// var apiKey: 'be8e0248d5c480564f7b163365324150'

var searchBtn = document.querySelector('#searchBtn');
var asideSection = document.querySelector('#aside-section');

// API call function

function getApi() {

    var weatherUrl = 'http://api.openweathermap.org/geo/1.0/reverse?lat=40.6111&lon=-111.8999&limit=5&appid=be8e0248d5c480564f7b163365324150';

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Weather: ', data);
        });

    var cityInput = document.querySelector('.city-input').value;
    console.log(cityInput)

    var geoCodeUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + { cityInput } + '&limit=1&appid=be8e0248d5c480564f7b163365324150';

    fetch(geoCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('GeoCode: ', data);
        })
        .catch(function (error) {
            console.log('error fetching data', error)
        })

        var historyBtn = document.createElement('button');
        historyBtn.classList.add('history-btn');
        historyBtn.textContent = cityInput;
        asideSection.appendChild(historyBtn);

        localStorage.setItem(historyBtn, cityInput);
        historyBtn.value = localStorage.getItem('cityInput');
};

searchBtn.addEventListener('click', getApi);

// function searchHistory() {
//     console.log(cityInput)
// }