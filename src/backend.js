const electron = require('electron');
const ipc = electron.ipcRenderer

var input = document.getElementById('weather_input');
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit_btn").click();
    }
});


const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.style.display = 'block'
}

function hideSpinner() {
  spinner.style.display = 'none'
}


var button_call = document.getElementById('submit_btn');
button_call.addEventListener('click', function () {
    document.getElementById('alert').style.display = "";
    document.getElementById('name').innerText = "";
    document.getElementById('country').innerText = "";
    document.getElementById('latitude').innerText = "";
    document.getElementById('longitude').innerText = "";
    document.getElementById('sunrise').innerText = "";
    document.getElementById('sunset').innerText = "";
    document.getElementById('temp').innerText = "";
    document.getElementById('pressure').innerText = "";
    document.getElementById('humidity').innerText = "";
    document.getElementById('weather').innerText = "";
    document.getElementById('wind').innerText = "";
    var call_value = document.getElementById('weather_input').value;
    if (call_value != ""){
        call_value = call_value.toLowerCase();
        call_value = call_value.replace(" ", "+")
        showSpinner()
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+ call_value +'&units=metric&appid=d354361919e1095621eccda6b47a4b60')
        .then(res => res.json())
        .then((data) => {
            var name = data.name;
            var coordinates = data.coord;
            var sun = data.sys;
            var main = data.main;
            var weather = (data.weather);
            var wind = data.wind;
            weather_sub = weather['0'];
            hideSpinner()
            document.getElementById('name').innerText = name + ", ";
            document.getElementById('country').innerText = sun['country'];
            document.getElementById('latitude').innerText = "Latitude: " + coordinates['lat'];
            document.getElementById('longitude').innerText = "Longitude: " + coordinates['lon'];
            document.getElementById('sunrise').innerText = "Sunrise: " + sun['sunrise'];
            document.getElementById('sunset').innerText = "Sunset: " + sun['sunset'];
            document.getElementById('temp').innerText = "Temperature: " + main['temp'] + "°C";
            document.getElementById('pressure').innerText = "Pressure: " + main['pressure'];
            document.getElementById('humidity').innerText = "Humidity: " + main['humidity'];
            document.getElementById('weather').innerText = "Weather: " + weather_sub['description'];
            document.getElementById('wind').innerText = " Wind Speed: " + wind['speed'];
        }).catch(err => console.error(err));
    }
    else{
        document.getElementById('alert').style.display = "block";
    }
})