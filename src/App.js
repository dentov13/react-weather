import React, { Component } from 'react';
import WeatherIcon from './components/WeatherIcon';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

class App extends Component {
  state = {
    icon: '',
    time: 1,
    city: '',
    temperature: '',
    weatherCode: '',
    fetching: true
  }

  componentDidMount() {
    this.fetchIP();
  }

  fetchWeatherData = city => {
    const baseUrl = `http://api.openweathermap.org`;
    const path = `/data/2.5/weather`;
    const appId = `ff380fa0a26c755c7880e066db650f55`;
    const query = `units=metric&lang=ru&appid=${appId}`;

    fetch(`${baseUrl}${path}?q=${city}&${query}`)
      .then(response => response.json())
      .then(data => {
        const date = new Date();
        const time = date.getHours();

        this.setState({
          time,
          city,
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
      .then(({ city }) => this.fetchWeatherData(city))
      .catch(error => console.log(error));
  }

  render() {
    const { fetching, icon, time, city, temperature, weatherCode } = this.state;

    return (
      <div className='app'>Загрузка...</div>
      :
      <div className='app' data-hour={time}>
        <WeatherIcon
          icon={icon}
          weatherCode={weatherCode}
          time={time}
        />
        <WeatherDetails
          city={city}
          temperature={temperature}
        />
      </div>
    );
  }
}

export default App;
