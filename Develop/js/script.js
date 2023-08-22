const apiKey = 'be8e0248d5c480564f7b163365324150';

var searchBtn = document.querySelector('#searchBtn');
var asideSection = document.querySelector('#aside-section');
var tempDisplay = document.querySelector('.tempDisplay');
var description = document.querySelector('.description');
var cityDisplay = document.querySelector('.cityName');
var dateContainer = document.querySelector('.dateContainer');
var iconDisplay = document.querySelector('.icon');
var humidity = document.querySelector('.humidity');
var windSpeed = document.querySelector('.windSpeed')
var fiveDayContainer = document.querySelector('#fiveDayForcast')

// API call function

function getApi() {
    let cityInput = document.querySelector('.city-input').value;

    localStorage.setItem('historyBtn', cityInput);

    // Geocode Url to get lat and long

    var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=5&appid=' + apiKey;

    fetch(geoCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("GEO ", data);

            // weather URL to apply lat and long to get results

            var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&limit=5&appid=' + apiKey;

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
                    humidity.textContent = "Humidity: " + data.main.humidity;
                    windSpeed.textContent = "Wind Speed: " + data.wind.speed;
                });

            var forcastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=' + apiKey;

            fetch(forcastUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('FORCAST ', data);

                    // Day One                
                    // Date
                    for(var i = 0; i <= 40 ; i+=8){

                        const dayContainer = document.createElement('div');
                        dayContainer.setAttribute('class', 'dayContainer');
                    
                    const date = document.createElement('p');
                    date.setAttribute('class', 'fiveDayFormat')
                    date.textContent = dayjs(data.list[i].dt_txt);
                    console.log(dayjs(data.list[i].dt_txt))
                    // Temp
                    var Tempurature = document.createElement('h3');
                    Tempurature.setAttribute('class', 'fiveDayFormat')
                    Tempurature.textContent = data.list[i].main.temp + ' °F';
                    // Wind
                    var wind = document.createElement('p');
                    wind.setAttribute('class', 'fiveDayFormat')
                    wind.textContent = 'Wind Speed: ' + data.list[i].wind.speed;
                    // Humidity
                    var hum = document.createElement('p');
                    hum.setAttribute('class', 'fiveDayFormat')
                    hum.textContent = 'Humidity: ' + data.list[i].main.humidity;
                    // Icon
                    var Icon = document.createElement('img');
                    Icon.setAttribute('class', 'fiveDayFormat')
                    Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");

                    fiveDayContainer.appendChild(dayContainer);
                    dayContainer.appendChild(date);
                    dayContainer.appendChild(Icon)
                    dayContainer.appendChild(Tempurature);
                    dayContainer.appendChild(hum);
                    dayContainer.appendChild(wind);
                    
                    };
        })
        .catch(function (error) {
            console.log('error fetching data', error)
        })
        searchHistory();
});
}
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