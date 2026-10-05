
import React from "react";
import "./Dashboard.css";

function Dashboard({ weatherData }) {

    // No weather data yet
    if (!weatherData) {
        return (
            <div className="dashboard">
                <h2>Weather Dashboard</h2>
                <p>Search and select a city to view weather.</p>
            </div>
        );
    }

    // Separate city and weather information
    const city = weatherData.city;
    const weather = weatherData.weather;
    const current = weather.current;
    const units = weather.current_units;
    const daily = weather.daily;
    const dateTime = weather.dateTime;


    // Weather code description
    const getWeatherDescription = (code) => {
        const weatherCodes = {
                                0: "Clear Sky",
                                1: "Mainly Clear",
                                2: "Partly Cloudy",
                                3: "Overcast",
                                45: "Fog",
                                48: "Fog",
                                51: "Light Drizzle",
                                53: "Moderate Drizzle",
                                55: "Dense Drizzle",
                                61: "Slight Rain",
                                63: "Moderate Rain",
                                65: "Heavy Rain",
                                71: "Slight Snow",
                                73: "Moderate Snow",
                                75: "Heavy Snow",
                                80: "Rain Showers",
                                81: "Moderate Rain Showers",
                                82: "Heavy Rain Showers",
                                95: "Thunderstorm",
                                96: "Thunderstorm",
                                99: "Thunderstorm"
                             };

        return weatherCodes[code] || "Unknown";
    };


    // Convert API time to 12-hour format
    const formatTime = (dateTime) => {
        if (!dateTime) {
            return "";
        }
        const time = dateTime.split("T")[1];
        const date = dateTime.split("T")[0];
        let [hour, minute] = time.split(":");
        hour = Number(hour);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${date} ${hour}:${minute} ${ampm}`;
    };


    return (

        <div className="dashboard">
            <h2>Weather Report as on {formatTime(current.time)} </h2>
            {/* City */}
            <div className="city">
                <h3>{city.name}</h3>
                <p>
                    {city.admin1 ? `${city.admin1},` : ""}
                    {city.country}
                </p>
            </div>

            {/* Main Weather */}

            <div className="main-weather">
                <div className="weather-icon">🌧️</div>
                <div>
                    <div className="temperature">
                        {current.temperature_2m}
                        {units.temperature_2m}
                    </div>

                    <div className="description">
                        {getWeatherDescription(current.weather_code)}
                    </div>
                </div>
            </div>


            {/* Weather Details */}

            <div className="weather-details">

                <div className="weather-box">
                    <h4>Feels Like</h4>
                    <p>
                        {current.apparent_temperature}
                        {units.apparent_temperature}
                    </p>
                </div>

                <div className="weather-box">
                    <h4>Humidity</h4>
                    <p>
                        {current.relative_humidity_2m}
                        {units.relative_humidity_2m}
                    </p>
                </div>

                <div className="weather-box">
                    <h4>Precipitation</h4>
                    <p>
                        {current.precipitation}
                        {units.precipitation}
                    </p>
                </div>

                <div className="weather-box">
                    <h4>Wind Speed</h4>
                    <p>
                        {current.wind_speed_10m}
                        {units.wind_speed_10m}
                    </p>
                </div>

                <div className="weather-box">
                    <h4>Wind Direction</h4>
                    <p>
                        {current.wind_direction_10m}
                        {units.wind_direction_10m}
                    </p>
                </div>

                <div className="weather-box">
                    <h4>Weather Code</h4>
                    <p>
                        {current.weather_code}
                    </p>
                </div>
            </div>

            {/* Sunrise / Sunset */}

            <div className="sun-details">
                <div>
                    <h4>🌅 Sunrise</h4>
                    <p>
                        {formatTime(daily.sunrise[0])}
                    </p>
                </div>

                <div>
                    <h4>🌇 Sunset</h4>
                    <p>
                        {formatTime(daily.sunset[0])}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;

