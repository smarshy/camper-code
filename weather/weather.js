/* Checking if geolocation supported by browser else option to get weather by geolocation not shown*/
var current=1;
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* Gets location of user and calls loadweather function passing the latitude and longitude as parameters*/
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude);
  });
});


//load weather function-using the docs
function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.alt.temp+'&deg;'+weather.alt.unit+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';  
      
      $("#weather").html(html);
      
       $("#weather h2").on("click", function(){
        if ((current%2)==1)
        {
          $(this).html('<h2><i class="icon-'+weather.code+'"></i> '+ weather.temp+'&deg;'+weather.units.temp+'</h2>');
        }
        else
        {
            $(this).html('<h2><i class="icon-'+weather.code+'"></i> '+weather.alt.temp+'&deg;'+weather.alt.unit+'</h2>');
        }
        current++;
                 
       });
      
      //based on the type of weather we get,we need to update the background
      var imageUrl =[
        "http://i.ytimg.com/vi/EinzBoVnmRs/maxresdefault.jpg",
        "https://thenypost.files.wordpress.com/2014/08/tropical-weather_moor-1.jpg",
        "http://cdn2.hubspot.net/hub/254742/file-773973517-jpg/US_Navy_050709-N-0000B-004_Hurricane_Dennis_batters_palm_trees_and_floods_parts_of_Naval_Air_Station_(NAS)_Key_Westrsquo,s_Truman_Annex.jpg",
        "http://wac.450f.edgecastcdn.net/80450F/hot991.com/files/2012/05/thunderstorm-Kenneth-O-Hansen.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "http://revelwallpapers.net/d/346C78736D6E6D2D353636356F716153785A467171384366724B4A6959773D3D/raining.jpg",
        "http://revelwallpapers.net/d/346C78736D6E6D2D353636356F716153785A467171384366724B4A6959773D3D/raining.jpg",
        "http://images.wookmark.com/15208_1292909333-8WVUSOB.jpg",
        "http://images.wookmark.com/15208_1292909333-8WVUSOB.jpg",
        "http://images.wookmark.com/15208_1292909333-8WVUSOB.jpg",
        "http://images.wookmark.com/15208_1292909333-8WVUSOB.jpg",
        "http://images.wookmark.com/15208_1292909333-8WVUSOB.jpg",
        "http://icons.wunderground.com/data/wximagenew/a/apphotos/5-800.jpg",
        "http://icons.wunderground.com/data/wximagenew/a/apphotos/5-800.jpg",
        "http://icons.wunderground.com/data/wximagenew/a/apphotos/5-800.jpg",
        "http://icons.wunderground.com/data/wximagenew/a/apphotos/5-800.jpg",
        "http://icons.wunderground.com/data/wximagenew/a/apphotos/5-800.jpg",
        "http://icons.wunderground.com/data/wximagenew/a/apphotos/5-800.jpg",
        "http://icons.wunderground.com/data/wximagenew/a/apphotos/5-800.jpg",
        "http://icons.wunderground.com/data/wximagenew/a/apphotos/5-800.jpg",
        "http://www.backyardsecretexposed.com/wp-content/uploads/2014/04/bad-weather_149a.jpg",
        "http://www.backyardsecretexposed.com/wp-content/uploads/2014/04/bad-weather_149a.jpg",
        "http://www.backyardsecretexposed.com/wp-content/uploads/2014/04/bad-weather_149a.jpg",
        "http://www.backyardsecretexposed.com/wp-content/uploads/2014/04/bad-weather_149a.jpg",
        "http://www.backyardsecretexposed.com/wp-content/uploads/2014/04/bad-weather_149a.jpg",
        "https://ladysyb.files.wordpress.com/2014/05/sunny-day1.jpg",
        "https://ladysyb.files.wordpress.com/2014/05/sunny-day1.jpg",
        "https://ladysyb.files.wordpress.com/2014/05/sunny-day1.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Guy_with_an_umbrella_battling_rain_and_snow_on_a_bridge.jpg",
        "http://images.fineartamerica.com/images-medium-large-5/winding-snowy-road-in-winter-donna-doherty.jpg"
      ];
      
      
      $("body").css('background-image', 'url(' + imageUrl[weather.code] + ')')
      
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}