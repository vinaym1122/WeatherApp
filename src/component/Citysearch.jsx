import React, { useState } from "react";
import { apiUrl, callApi } from "../lib";
import './CitySearch.css';

function CitySearch({ onWeatherReceived }) {

    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);


    const searchCity = async (value) => {

        setSearch(value);
        if (value.length < 2) {
            setCities([]);
            return;
        }


        try {

            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=en&format=json`);
            const data = await response.json();

            if (data.results) {
                setCities(data.results);
            }
            else {
                setCities([]);
            }
        }
        catch (error) {
            console.error(error);
        }

    };


    const selectCity = (city) => {
        setSearch(city.name);
        setSelectedCity(city);
        setCities([]);
    };


    const getWeather = () => {

        if (!selectedCity) {
            alert("Please select a city");
            return;
        }

        const cityData = { latitude: selectedCity.latitude,  longitude: selectedCity.longitude };

        callApi("POST", apiUrl("weather/current"), cityData, "", weatherHandler, "");
    };

    const weatherHandler = (res) => {
        console.log("Weather Response:", res);

        if (res.code === 200 && res.success) {
            onWeatherReceived({ city: selectedCity, weather: res.data });
        }
        else {
            alert(res.message);
        }
    };


    return (

        <div className="city-search">            
            <label>Enter the City Name </label>
            <input type="text" placeholder="Search city..." value={search} onChange={(e) => searchCity(e.target.value) } />

            {cities.length > 0 && (
                <div className="suggestions">
                    {cities.map((city) => (
                        <div key={`${city.id}-${city.latitude}`}  className="suggestion" onClick={() => selectCity(city) } >
                            <strong>{city.name}</strong>
                            <span>
                                {city.admin1 ? `, ${city.admin1}` : ""}
                                {city.country ? `, ${city.country}` : ""}
                            </span>
                        </div>
                    ))}
                </div>
            )}


            {selectedCity && (
                <div className="selected-city">
                    <p>Selected:
                        <strong>{selectedCity.name}</strong>
                    </p>
                    <button onClick={getWeather} >Get Weather</button>
                </div>
            )}        
        </div>
    );
}
export default CitySearch;