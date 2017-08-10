import React from 'react';

function WeatherDetails({ country_name, temperature }) {
  return (
    <div className='weather-details'>
      <div className='country'>{country_name}</div>
      <div className='temperature'>{temperature} &deg; C</div>
    </div>
  );
}

export default WeatherDetails;