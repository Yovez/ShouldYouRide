import React, { Component } from 'react'
import WeatherAlert from './WeatherAlert';
import WeatherHour from './WeatherHour';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    degree(degree) {
        if (localStorage.getItem("degreeUnit") == null || localStorage.getItem("degreeUnit") === "f") {
            return degree + "°F";
        }
        return Math.round(((degree - 32) * (5 / 9))) + "°C";
    }

    render() {
        const data = this.props.data;
        const alerts = [];
        const events = [];
        if (data.alerts.alert.length >= 1) {
            for (const event of data.alerts.alert) {
                if (events.includes(event.event)) {
                    continue;
                } else {
                    alerts.push(<WeatherAlert headline={event.headline} />);
                    events.push(event.event);
                }
            }
        }
        const future = [];
        var hours = data.forecast.forecastday[0].hour;
        // hi world - Helen 2022
        for (var i = new Date().getHours() + 1; i < hours.length; i++) {
            const hour = hours[i];
            future.push(
                <WeatherHour
                    time={hour.time}
                    temp={this.degree(hour.temp_f)}
                    feels={this.degree(hour.feelslike_f)}
                    wind_speed={hour.wind_mph}
                    wind_dir={hour.wind_dir}
                    rain={hour.chance_of_rain}
                />
            );
        }
        if (future.length <= 12) {
            hours = data.forecast.forecastday[1].hour;
            for (var i = 0; i < 24 - future.length - 2; i++) {
                const hour = hours[i];
                future.push(
                    <WeatherHour
                        time={hour.time}
                        temp={this.degree(hour.temp_f)}
                        feels={this.degree(hour.feelslike_f)}
                        wind_speed={hour.wind_mph}
                        wind_dir={hour.wind_dir}
                        rain={hour.chance_of_rain}
                    />
                );
            }
        }
        return (
            <div className="Weather font-mono">
                <div className="flex justify-center">
                    <div className="flex-initial rounded-md border-4 border-black p-3">
                        <h1 className="text-4xl">{data.location.name.replace("Heights", "")} Riding Conditions</h1>
                        <h2 className="text-2xl">API URL for this Weather report: <a href={this.props.url} target="_blank" rel="noreferrer">Click Here</a></h2>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center pt-3 space-y-2">
                    {alerts}
                </div>
                <div className="flex flex-wrap justify-center p-3 space-x-4">
                    <div className="flex-initial max-w-5xl rounded-md border-2 p-3 border-green-900 bg-gradient-to-b from-yellow-400 to-blue-600 p-4">
                        <span className="text-4xl text-blue-900">Weather Forecast</span>
                        <br />
                        <p className="text-xl" style={{ margin: 0 }}>
                            <img className="inline" src={data.current.condition.icon} alt={data.current.condition.text} />
                            {this.degree(data.current.temp_f)} (Feels Like {this.degree(data.current.feelslike_f)})</p>
                        <br />
                        <h2 className="text-xl">
                            <i className="bi-wind" /> {data.current.wind_mph} mph {data.current.wind_dir}
                        </h2>
                        <h1 className="text-2xl pt-3">Upcoming Weather</h1>
                        <div className="flex flex-row flex-nowrap overflow-x-auto space-x-12">
                            {future}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;