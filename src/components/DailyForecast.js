import "./DailyForecast.css";
import { getDayAbbreviation } from "../utils";

const DailyForecast = ({ daily }) => {
  return (
    <section
      className="dailyForecast fade-in"
      aria-labelledby="dailyForecastTitle"
    >
      <h2 className="dailyForecastTitle offscreen">Six Day Forecast</h2>
      <div className="dailyContents">
        {daily.map((day) => (
          <div className="forecastDay" key={day.dt}>
            <p className="dayAbbreviation">{getDayAbbreviation(day.dt)}</p>
            <img
              src={`icons/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <p className="dayHigh">{Math.round(Number(day.temp.max))}°</p>
            <p className="dayLow">{Math.round(Number(day.temp.min))}°</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyForecast;
