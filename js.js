
var lat;
var lon;
var far_status= 1;
var cel_status =0;
$(document).ready(function(){
    // start_icon();
    getGeoLocation();
    // start_icon();

});

function toggle_Temp(){
    var temp = document.getElementById("temp");

    if(far_status == 1)
    {

        changeToCelsius(parseFloat(temp.innerHTML));

    }
    else{

       changeToFahrenheit(parseFloat(temp.innerHTML));

    }
}

function changeToFahrenheit(cel_temp)
{

    var far =Math.round(((cel_temp * 9/5) + 32) *100)/100;
    var f= document.getElementById("temp");
    f.innerHTML = parseFloat(far);

    var f_icon = document.getElementById("f_icon");
    f_icon.innerHTML = "<i class='wi wi-fahrenheit faren'></i>";

    cel_status =0;
    far_status=1;


}
function changeToCelsius(faren_temp)
{

    var cel =  Math.round(((faren_temp -32) * 5/9)*100)/100;
    var c= document.getElementById("temp");
     c.innerHTML= parseFloat(cel);

     var f_icon = document.getElementById("f_icon");
     f_icon.innerHTML= "<i class='wi wi-celsius faren'></i>";

    far_status =0;
    cel_status=1;


}

function getGeoLocation()
{
    if(navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition(function(position){
           lat = position.coords.latitude;
           lon = position.coords.longitude;
            getWeatherData(lat , lon);
        })
      }
}


function update(response)
{



    var data_summary = document.getElementById("data_summary");
    var data_temp =document.getElementById("data_temp");
    var data_icon = document.getElementById("data_icon");

    var icons = document.getElementById("icons");

    var far_temp =  response.currently.temperature;

    var temp = document.getElementById("temp");
    // data_summary.innerHTML = response.currently.summary + "<br><span id='temp' >" + response.currently.temperature+ "</span>" +
    //     "<button class='btn btn-default btn_color' onclick='toggle_Temp();'>" +
    //     "<span id='f_icon'><i class='wi wi-fahrenheit faren'></i></span></button><br>" + response.currently.icon;

    data_summary.innerHTML = response.currently.summary;
    data_temp.innerHTML = "<span id='temp' >" + response.currently.temperature  + "</span>" + "<button class='btn btn-default btn_color' onclick='toggle_Temp();'>"
    + "<span id='f_icon'><i class='wi wi-fahrenheit faren'></i></span></button>";

    

    var weather_icon;
    switch(response.currently.icon){
        case "clear-day":
            weather_icon  = "<i class='wi wi-day-sunny'></i>";
            break;

        case "clear-night":
            weather_icon  = "<i class='wi wi-night-clear'></i>";
            break;

        case "partly-cloudy-day":
            weather_icon  = "<i class='wi wi-day-cloudy'></i>";
            break;

        case "partly-cloudy-night":
            weather_icon  = "<i class='wi wi-night-alt-cloudy'></i>";
            break;

        case "cloudy":
            weather_icon  = "<i class='wi wi-cloudy'></i>";
            break;

        case "rain":
            weather_icon  = "<i class='wi wi-raindrops'></i>";
            break;

        case "sleet":
            weather_icon  = "<i class='wi wi-sleet'></i>";
            break;

        case "snow":
            weather_icon  = "<i class='wi wi-snow'></i>";
            break;

        case "wind":
            weather_icon  = "<i class='wi wi-windy'></i>";
            break;





    }
    icons.innerHTML = weather_icon ;
    data_icon.innerHTML = response.currently.icon;
    // icons_id.id="fog";
    // document.getElementById("icons").innerHTML ="<figure class='icons'><canvas id='clear-day' width='64' height='64'  style='background-color: brown'></canvas></figure>";
    // console.log("<figure class='icons'><canvas id= 'clear-day' width='64' height='64'></canvas></figure>");
}

function getWeatherData(lat ,lon ){

    var latitude= lat;
    // var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
    var darksky ="https://api.darksky.net/forecast/35d72e631f751572f08e52a24a0e9160/" +
         lat +"," + lon +"?" + "UNITS=us";
    // $.getJSON(url)
    //     .done(function(data){
    //         $("#data").html(JSON.stringify(data.weather[0].description) + JSON.stringify(data.weather[0].icon) );
    //         console.log(JSON.stringify(data));              // printing on console the object
    //     })
    //     .fail(function(jqxhr, textStatus, err){
    //        console.log("Request Failed" + textStatus + " , " + err);
    // });
    $.ajax({

        url: darksky,
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data){
        console.log(JSON.stringify(data));
        update(data);              // calling function to display all data with respect to icons
    }})



}




// function start_icon(){
//     var icons = new Skycons(),
//         list  = [
//             "clear-day", "clear-night", "partly-cloudy-day",
//             "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
//             "fog"
//         ],
//         i;
//     for(i = list.length; i--; )
//         icons.set(list[i], list[i]);
//     icons.play();
// }
