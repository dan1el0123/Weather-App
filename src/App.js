import { useState, useEffect } from "react";
import CurrentForecast from "./components/CurrentForecast";
import DailyForecast from "./components/DailyForecast";
import NavButtons from "./components/NavButtons";
import SearchBar from "./components/SearchBar";

function App() {
  const [location, setLocation] = useState({
    lat: "42",
    lon: "21.4333",
    name: "Skopje, MK",
    unit: "metric",
  });
  const [weather, setWeather] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  return (
    <main className="App">
      <SearchBar />
      <CurrentForecast />
      <NavButtons />
      <DailyForecast />
    </main>
  );
}

export default App;
