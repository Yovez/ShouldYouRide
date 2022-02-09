import React, { Component } from 'react'

class WeatherAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="flex-initial rounded border-4 border-red-900 p-3">
                <h1 className="text-xl">{this.props.headline}</h1>
            </div>
        );
    }
}

export default WeatherAlert;