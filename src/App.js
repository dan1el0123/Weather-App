import { useState, useEffect } from "react";
import CurrentForecast from "./components/CurrentForecast";
import DailyForecast from "./components/DailyForecast";
import NavButtons from "./components/NavButtons";
import SearchBar from "./components/SearchBar";
import { getWeatherFromCoords } from "./api";
import { getHomeLocation } from "./utils";

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
    const geoLocation = () => {
      if (!navigator.geolocation) {
        return;
      } else {
        setErrMsg("Locating...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setErrMsg("");
            setLocation((prev) => {
              return {
                ...prev,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                name: `Lat:${position.coords.latitude
                  .toString()
                  .slice(0, 10)} • Lon:${position.coords.longitude
                  .toString()
                  .slice(0, 10)}`,
              };
            });
          },
          () => {
            setErrMsg("Unable to retrieve your location");
          }
        );
      }
    };
    const home = getHomeLocation();
    if (home) {
      setLocation(home);
    } else {
      geoLocation();
    }
  }, []);

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

  const handleGeoLocation = (event) => {
    if (event && event.type === "click" && !navigator.geolocation) {
      setErrMsg("Geolocation not supported");
    } else if (!navigator.geolocation) {
      return;
    } else {
      setErrMsg("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setErrMsg("");
          setLocation({
            ...location,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: `Lat:${position.coords.latitude
              .toString()
              .slice(0, 10)} • Lon:${position.coords.longitude
              .toString()
              .slice(0, 10)}`,
          });
        },
        () => {
          setErrMsg("Unable to retrieve your location");
        }
      );
    }
  };

  const handleHomeLocation = () => {
    const home = getHomeLocation();
    if (home) {
      setLocation(home);
      setErrMsg("");
      setReload((prev) => prev + 1);
    } else {
      setErrMsg("No home location");
    }
  };

  const handleSaveLocation = () => {
    localStorage.setItem("homeLocation", JSON.stringify(location));
    setErrMsg("Saved home location");
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
        handleGeoLocation={handleGeoLocation}
        handleHomeLocation={handleHomeLocation}
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
