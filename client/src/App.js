import './App.scss';
import fetch from 'node-fetch';
import React, { Component } from 'react'
import Weather from './Weather';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { weather: null, lat: 0, lon: 0, url: null };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((success, error) => {
      if (error) console.log(error);
      if (success) {
        this.setState({ lat: success.coords.latitude, lon: success.coords.longitude });
        let url = "https://api.weatherapi.com/v1/forecast.json?key=88472bbc0970485fba022616210207&q=" + this.state.lat + "," + this.state.lon + "&days=2&aqi=no&alerts=yes"
        try {
          fetch(url)
            .then(res => res.json())
            .then((json) => {
              return this.setState({ weather: json, url: url });
            });
        } catch (e) {
          return console.log(e);
        }
      }
    });
  }

  render() {
    if (!localStorage.getItem("theme"))
      localStorage.setItem("theme", "dark");
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.getElementById("root").classList.add('dark')
    } else {
      document.getElementById("root").classList.remove('dark')
    }
    return (
      <div className="bg-gray-200 dark:bg-gray-800 dark:text-white flex flex-wrap flex-col py-16 px-32">
        <Header />
        {this.state.weather ? <Weather data={this.state.weather} url={this.state.url} /> : <button className="w-max bg-green-500 rounded hover:bg-green-600 p-3 text-white text-2xl">Get Weather</button>}
      </div>
    );
  }
}

export default App;