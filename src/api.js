import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

export const getCoordsFromApi = async (entryText, units) => {
  const regex = /^\d+$/g; // entries that start and end with numbers = assume it is zip code
  const flag = regex.test(entryText) ? "zip" : "q";
  const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
  const encodedUrl = encodeURI(url);

  try {
    const response = await axios.get(encodedUrl);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const getWeatherFromCoords = async (locationObj) => {
  const { lat, lon, unit: units } = locationObj;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};
