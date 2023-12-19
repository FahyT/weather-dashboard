const APIKey = "33101dd1a6ef29a5fb92acaf1c7ede91";
const today = dayjs().format("D/M/YYYY");

function getWeather(city){
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey; //set url for API
    fetch(queryURL)
    .then(function (response) {
        return response.json(); //get data from server
    })
    .then(function (data) {
        $('#today').empty(); //clear previous info from webpage
        $('#today').addClass("border border-dark p-3"); //put border around today's data
        let temperature = Math.round(((data.main.temp) - 273.15) * 100) / 100;    // calculate the temperature (converted from Kelvin)
        $('#today').append('<h2>' + data.name + ' (' + today + ')');
        $('#today').append('<p> Temp: ' + temperature + '°C');
        $('#today').append('<p> Wind Speed: ' + data.wind.speed + ' KPH');
        $('#today').append('<p> Humidity: ' + data.main.humidity + '%'); 

        let newQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+ data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIKey; //url for forecast data

        fetch(newQueryURL)
        .then(function (forecastResponse) {
            return forecastResponse.json();
        })
        .then(function (forecastData) {
            $('#forecast').empty();
            $('#forecast').append("<h3> 5-Day Forecast: ");
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



// when search submitted, function will send weather info to webpage
$("#search-button").on("click", function() {
    event.preventDefault();
    let city = $('#search-input').val();

    //print current weather to page
    getWeather(city);

    //when search is submitted, add a button with the term searched for
    $('#history').append($('<button type=button>').addClass('btn btn-secondary mt-3 search-history').attr('data-city', city).text(city));

    var cityList = JSON.parse(localStorage.getItem('searchHistory'));
    cityList === null? citylist = [city] : cityList.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(cityList));

  });


let searchHistory = JSON.parse(localStorage.getItem('searchHistory')); //get searchHistory array from local storage

if (searchHistory !== null) {
    for (let i = 0; i < searchHistory.length; i ++ ) { //append all items in searchhistory array as buttons
        $('#history').append($('<button type=button>').addClass('btn btn-secondary mt-3').attr('data-city', searchHistory[i]).text(searchHistory[i]));
    };
};


// when search history button is clicked, call getWeathern function to send info to webpage
$(document).on('click', '.search-history', function(event) {
    event.preventDefault();
    let city = $(this).attr('data-city');
    getWeather(city);
});
