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
  const [reload, setReload] = useState(0);

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
  }, [location, reload]);

  const handleSaveLocation = () => {
    localStorage.setItem("homeLocation", JSON.stringify(location));
  };

  const handleReload = () => {
    setReload((prev) => prev + 1);
  };

  const handleUnitChange = () => {
    const newUnit = location.unit === "metric" ? "imperial" : "metric";
    setLocation({ ...location, unit: newUnit });
  };

  return (
    <main className="App">
      <SearchBar
        location={location}
        setLocation={setLocation}
        setErrMsg={setErrMsg}
      />
      {weather && (
        <CurrentForecast
          key={reload}
          errMsg={errMsg}
          weather={weather}
          unit={location.unit}
          name={location.name}
        />
      )}
      <NavButtons
        handleReload={handleReload}
        handleUnitChange={handleUnitChange}
        handleSaveLocation={handleSaveLocation}
      />
      <hr />
      {weather && <DailyForecast daily={weather.daily.slice(1, 7)} />}
    </main>
  );
}

export default App;
