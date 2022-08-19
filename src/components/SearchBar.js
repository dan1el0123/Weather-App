import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { getCoordsFromApi } from "../api";

const SearchBar = ({ location, setLocation, setErrMsg }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanText = (text) => {
      const regex = / {2,}/g;
      const entryText = text.replaceAll(regex, " ").trim();
      return entryText;
    };
    const entryText = cleanText(inputText);
    if (!entryText) return;

    const coordsData = await getCoordsFromApi(entryText, location.unit);
    if (coordsData) {
      if (coordsData.cod === 200) {
        setLocation({
          ...location,
          lon: coordsData.coord.lon,
          lat: coordsData.coord.lat,
          name: coordsData.sys.country
            ? `${coordsData.name}, ${coordsData.sys.country}`
            : coordsData.name,
        });
      } else {
        setErrMsg(coordsData.message);
      }
    } else {
      setErrMsg("City not found");
    }
  };

  return (
    <section className="searchBar">
      <form className="searchForm" onSubmit={handleSubmit}>
        <label htmlFor="searchText" className="offscreen">
          Enter new location
        </label>
        <input
          id="searchText"
          type="text"
          placeholder="Enter City, State, Country, Zip Code"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="searchButton"
          title="Submit Location"
          aria-label="Submit Search"
        >
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
