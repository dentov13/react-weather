import React, { Component } from 'react';
import WeatherIcon from './components/WeatherIcon.jsx';
import WeatherDetails from './components/WeatherDetails.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      time: 1,
      country_name: '',
      temperature: '',
      weatherCode: '',
      fetching: true
    }
  }

  componentDidMount() {
    this.fetchIP();
  }

  fetchWeatherData = country_name => {
    const baseUrl = `https://api.openweathermap.org`;
    const path = `/data/2.5/weather`;
    const appId = `ff380fa0a26c755c7880e066db650f55`;
    const query = `units=metric&lang=ru&appid=${appId}`;

    fetch(`${baseUrl}${path}?q=${country_name}&${query}`)
      .then(response => response.json())
      .then(data => {
        const date = new Date();
        const time = date.getHours();

        this.setState({
          time,
          country_name,
          temperature: Math.round(data.main.temp),
          weatherCode: data.weather[0].id,
          fetching: false
        });
      })
      .catch(error => console.error(error));
  }
  
  fetchIP = () => {
    fetch('//freegeoip.net/json/')
      .then(response => response.json())
      .then(({ country_name }) => this.fetchWeatherData(country_name))
      .catch(error => console.log(error));
  }

  render() {
    const { fetching, icon, time, country_name, temperature, weatherCode } = this.state;

    return fetching ?
      <div className='app'>Loading...</div>
      :
      <div className='app' data-hour={time}>
        <WeatherIcon
          icon={icon}
          weatherCode={weatherCode}
          time={time}
        />
        <WeatherDetails
          country_name={country_name}
          temperature={temperature}
        />
      </div>
  }
}

export default App;
