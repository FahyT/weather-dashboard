const APIKey = "33101dd1a6ef29a5fb92acaf1c7ede91";
const today = dayjs().format("D/M/YYYY");

function currentWeather(city){
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // Create CODE HERE to calculate the temperature (converted from Kelvin)
        let temperature = Math.round(((data.main.temp) - 273.15) * 100) / 100;
        $('#today').append('<div></div>').addClass("today-data").text(data.name + ' (' + today + ')');
        $('#today').append('<div></div>').addClass("today-data").text('Temp:' + temperature + '°C');
        $('#today').append('<div></div>').addClass("today-data").text(data.name);
        $('#today').append('<div></div>').addClass("today-data").text(data.name);
  });
};

function weatherForecast() {

}





$("#search-button").on("click", function() {



    //when search is submitted, add a button with the term searched for
    event.preventDefault();
    let city = $('#search-input').val();
    $('#history').append($('<button type=button>').addClass('btn btn-secondary').attr('data-city', city).text(city));
  });

  currentWeather("London");