// API key: be8e0248d5c480564f7b163365324150

var weatherUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=be8e0248d5c480564f7b163365324150'

fetch(weatherUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });

var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=be8e0248d5c480564f7b163365324150'

fetch(geoCodeUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });