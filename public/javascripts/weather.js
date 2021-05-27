function getLocation() {
    if (!window.location.search)
        navigator.geolocation.getCurrentPosition((success, error) => {
            console.log('tried to get location');
            if (error) console.log(error);
            if (success) {
                return { lat: success.coords.latitude, lon: success.coords.longitude };
            }
        });
    return null;
}

function getWeather() {
    let location = getLocation();
    if (location != null) {
        let lat = location.lat;
        let lon = location.lon;
        let url = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=f0e9be06b2eace17712b103c03cdc6d4';
        try {
            fetch(url)
                .then(res => res.json())
                .then((json) => {
                    ReactDOM.render(WeatherComponent({weather: json}), document.getElementById("weather"));
                });
        } catch (e) {
            return console.log(e);
        }
    }
}

const WeatherComponent = (props) => pug`
    .col-sm
        .weather.border.border-warning.rounded.p-3.bg-darker
            h1.display-5.title Weather Forecast
            h2.display-6.capitalize 
                if props.weather.current.weather[0].description === "clear sky"
                    +icon("bi-sun")
                if props.weather.current.weather[0].description === "light rain"
                    +icon("bi-cloud-drizzle")
                if props.weather.current.weather[0].description === "broken clouds" || props.weather.current.weather[0].description === "scattered clouds"
                    +icon("bi-cloud-haze")
                if props.weather.current.weather[0].description === "overcast clouds"
                    +icon("bi-clouds")
                |  #{props.weather.current.weather[0].description} 
            - var temp = props.weather.current.temp;
            h2.display-6
                +tempColor(temp) #{temp}°F
            h2.display-6
                +tempColor(props.weather.current.feels_like) Feels: #{props.weather.current.feels_like}°F
            h3.display-6
                if props.weather.hourly[0].pop >= 0 && props.weather.hourly[0].pop <= 33
                    +icon("bi-cloud-drizzle")
                if props.weather.hourly[0].pop >= 33 && props.weather.hourly[0].pop <= 66
                    +icon("bi-cloud-rain")
                if props.weather.hourly[0].pop >= 66 && props.weather.hourly[0].pop <= 100
                    +icon("bi-cloud-rain-heavy")
                |  Rain: #{props.weather.hourly[0].pop}%
            h3.display-6 
                if props.weather.current.humidity >= 0 && props.weather.current.humidity <= 33
                    +icon("bi-droplet")
                if props.weather.current.humidity >= 33 && props.weather.current.humidity <= 66
                    +icon("bi-droplet-half")
                if props.weather.current.humidity >= 66 && props.weather.current.humidity <= 100
                    +icon("bi-droplet-fill")
                |  #{props.weather.current.humidity}% Humidity
            h4.display-6 
                +icon("bi-wind")
                |  #{props.weather.current.wind_speed} mph #{degToCard(props.weather.current.wind_deg)}
            -
                var date = new Date(Math.round(props.weather.current.sunset) * 1000).toLocaleString('en-US', {timeZone: props.weather.timezone});
                var string = date.substr(date.lastIndexOf(",") + 1);
            h3.display-6 
                +icon("bi-sunset")
                |  Sunset: #{string}
    .col-sm
        .weather.border.border-info.rounded.p-3.bg-darker
            h1.display-4 Next 12 Hours
            - var counter = 0;
            .overflow-auto
                table.table.table-hover.table-dark
                    thead
                        th(scope="col") Time
                        th(scope="col") Temp
                        th(scope="col") Rain
                        th(scope="col") Wind
                        th(scope="col") Humidity
                    tbody
                        each hour in props.weather.hourly
                            if counter < 12
                                tr
                                    - var date = new Date(Math.round(hour.dt) * 1000).toLocaleString('en-US', {timeZone: props.weather.timezone})
                                    - var time = date.substr(10, 3).replace(":", "") + " " + date.substr(19);
                                    th(scope="row") #{time}
                                    th(scope="row") #{hour.temp}°F
                                    unless hour.rain
                                        th(scope="row") 0%
                                    else
                                        th(scope="row") #{hour.rain}%
                                    th(scope="row") #{hour.wind_speed} MPH #{degToCard(hour.wind_deg)}
                                    th(scope="row") #{hour.humidity}%
                                - counter++;
        .border.border-danger.my-3.p-3.rounded.bg-darker.traffic
            h1 Traffic Conditions
            span.text-secondary A traffic heat map for your current area
            br
            br
            #map
            - var lat = props.weather.lat;
            - var lon = props.weather.lon;
            script.
                function initMap() {
                    const map = new google.maps.Map(document.getElementById("map"), {
                        zoom: 13,
                        center: { lat: #{lat}, lng: #{lon} },
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                        },
                        streetViewControl: true,
                        streetViewControlOptions: {
                            position: google.maps.ControlPosition.LEFT_BOTTOM,
                        }
                    });
                    const trafficLayer = new google.maps.TrafficLayer();
                    trafficLayer.setMap(map);
                }
`

document.addEventListener('load', getWeather());