import "./CurrentForecast.css";

const CurrentForecast = ({ errMsg, weather, unit, name }) => {
  return (
    <section
      className="currentForecast fade-in"
      aria-labelledby="currentLocation"
    >
      <h2 id="currentLocation" className="currentLocation">
        {errMsg ? errMsg : name}
      </h2>
      <div id="currentConditions" className="currentConditions">
        <div className="icon" id="icon">
          <img
            src={`icons/${weather.current.weather[0].icon}.png`}
            alt={weather.current.weather[0].description}
          />
        </div>
        <div className="temp">
          {Math.round(Number(weather.current.temp))}°
          <div className="unit">{unit === "metric" ? "C" : "F"}</div>
        </div>
        <div className="desc">{weather.current.weather[0].description}</div>
        <div className="feels">
          Feels like {Math.round(Number(weather.current.feels_like))}°
        </div>
        <div className="maxtemp">
          High {Math.round(Number(weather.daily[0].temp.max))}°
        </div>
        <div className="mintemp">
          Low {Math.round(Number(weather.daily[0].temp.min))}°
        </div>
        <div className="humidity">Humidity {weather.current.humidity}%</div>
        <div className="wind">
          Wind {Math.round(Number(weather.current.wind_speed))}
          {unit === "metric" ? "m/s" : "mph"}
        </div>
      </div>
    </section>
  );
};

export default CurrentForecast;
