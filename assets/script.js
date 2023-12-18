const APIKey = "33101dd1a6ef29a5fb92acaf1c7ede91";
const today = dayjs().format("D/M/YYYY");

function getWeather(city){
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        $('#today').empty();
        $('#today').addClass("border border-dark p-3");
        console.log(data);
        let temperature = Math.round(((data.main.temp) - 273.15) * 100) / 100;    // calculate the temperature (converted from Kelvin)
        $('#today').append('<h2>' + data.name + ' (' + today + ')');
        $('#today').append('<p> Temp: ' + temperature + '°C');
        $('#today').append('<p> Wind Speed: ' + data.wind.speed + ' KPH');
        $('#today').append('<p> Humidity: ' + data.main.humidity + '%'); 

        let newQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+ data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIKey;

        fetch(newQueryURL)
        .then(function (forecastResponse) {
            return forecastResponse.json();
        })
        .then(function (forecastData) {
            $('#forecast').empty();
            $('#forecast').append("<h3> 5-Day Forecast: ");
            console.log(forecastData);
            for (let i=0; i < forecastData.list.length; i ++) {

                let date = dayjs.unix(forecastData.list[i].dt).format("D/M/YYYY");
                let forecastTemperature = Math.round(((forecastData.list[i].main.temp) - 273.15) * 100) / 100;    

                $('#forecast').append("<div class='card text-bg-primary m-3 p-3 col-2'>");
                $('#forecast').children().eq(i+1).append('<h5 class=card-title>' + date);
                $('#forecast').children().eq(i+1).append('<p class=card-text> Temp: ' + forecastTemperature + ' °C');
                $('#forecast').children().eq(i+1).append('<p class=card-text> Wind: ' + forecastData.list[i].wind.speed + ' KPH');
                $('#forecast').children().eq(i+1).append('<p class=card-text> Wind: ' + forecastData.list[i].main.humidity + '%');
            };
        })

     })
};


$("#search-button").on("click", function() {
    event.preventDefault();
    let city = $('#search-input').val();

    //print current weather to page
    getWeather(city);

    //when search is submitted, add a button with the term searched for
    $('#history').append($('<button type=button>').addClass('btn btn-secondary mt-3 search-history').attr('data-city', city).text(city));

    let cityList = JSON.parse(localStorage.getItem('searchHistory'));
    cityList.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(cityList));

  });


let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
console.log(searchHistory);

for (let i = 0; i < searchHistory.length; i ++ ) {
    $('#history').append($('<button type=button>').addClass('btn btn-secondary mt-3').attr('data-city', searchHistory[i]).text(searchHistory[i]));
};


