
import React, { useState } from "react";

import CitySearch from "./Citysearch";
import Dashboard from "./Dashboard";
import './WeatherReport.css';

function WeatherReport() {

    const [weatherData, setWeatherData] = useState(null);

    return (
        <div className="weather-board">
            <CitySearch onWeatherReceived={setWeatherData}/>

            <Dashboard weatherData={weatherData}/>
        </div>
    );
}
export default WeatherReport;

