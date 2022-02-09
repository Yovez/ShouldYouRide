import React, { Component } from 'react'

class WeatherHour extends Component {
    constructor(props) {
        super(props);
        this.state = { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
    }
    render() {
        return (
            <div>
                <span className="text-xl">{new Date(this.props.time).toLocaleTimeString('en-US', { timeZone: this.state.timeZone, hour12: true, minute: '2-digit', hour: 'numeric'})} </span>
                <i className="bi-thermometer-sun inline pr-1" />
                <span className="inline">{this.props.temp} (Feels {this.props.feels})</span>
                <br />
                <i className="bi-wind pr-1" />{this.props.wind_speed}mph {this.props.wind_dir}
                <br />
                <i className="bi-cloud-rain inline pr-1" />{this.props.rain}%
                <br />
            </div>
        );
    }
}

export default WeatherHour;