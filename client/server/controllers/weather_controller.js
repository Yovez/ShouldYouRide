var async = require('async');
var fetch = require('node-fetch');

exports.weather_get = (req, res, next) => {
    async.series(
        [
            (callback) => {
                var lat = req.params.lat;
                var lon = req.params.lon;
                let url = "https://api.weatherapi.com/v1/forecast.json?key=88472bbc0970485fba022616210207&q=" + lat + "," + lon + "&days=2&aqi=no&alerts=yes"
                try {
                    fetch(url)
                        .then(res => res.json())
                        .then((json) => {
                            return callback(null, json);
                        });
                } catch (e) {
                    return callback(e, null);
                }
            }
        ],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.render('weather', { error: err });
            }
            if (results) {
                if (!results[0]) {
                    return res.render('weather', { message: "Please enable location to use this website!" });
                }
                return res.render('weather', { weather: results[0] });
            } else {
                return res.render('weather', { message: "Please enable location to use this website!" });
            }
        }
    );
}