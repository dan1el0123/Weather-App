import { useState, useEffect } from "react";
import CurrentForecast from "./components/CurrentForecast";
import DailyForecast from "./components/DailyForecast";
import NavButtons from "./components/NavButtons";
import SearchBar from "./components/SearchBar";
import { getWeatherFromCoords } from "./api";

function App() {
  const [location, setLocation] = useState({
    lat: "42",
    lon: "21.4333",
    name: "Skopje, MK",
    unit: "metric",
  });
  const [weather, setWeather] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const getWeather = async () => {
      try {
        const weatherData = await getWeatherFromCoords(location);
        setWeather(weatherData);
        setErrMsg("");
      } catch (err) {
        setErrMsg(err.message);
      }
    };

    getWeather();
  }, [location]);

  return (
    <main className="App">
      <SearchBar
        location={location}
        setLocation={setLocation}
        setErrMsg={setErrMsg}
      />
      {weather && (
        <CurrentForecast
          errMsg={errMsg}
          weather={weather}
          unit={location.unit}
          name={location.name}
        />
      )}
      <NavButtons />
      <DailyForecast />
    </main>
  );
}

export default App;
