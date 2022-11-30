import { useState } from "react";
import "../styles/WeatherCard.css";
const WeatherCard = ({ apiData }) => {
  const [isC, setIsC] = useState(true);
  const [isBtnActiveC, setIsBtnActiveC] = useState(true);
  const [isBtnActiveF, setIsBtnActiveF] = useState(false);
  const convertTemp = () => {
    if (apiData?.main.temp) {
      let convert = apiData?.main.temp;
      if (isC === false) {
        convert = apiData?.main.temp * 1.8 + 32;
      }
      return Math.round(convert);
    }
  };
  return (
    <div className="Weather-card">
      <section className="main filter flex-col">
        <h2>
          {apiData?.name}, {apiData?.sys.country}
        </h2>
        <section className="temperature">
          <h1>{convertTemp()}</h1>
          <div className="button flex-col">
            <a
              className={isBtnActiveC ? "btn-active" : "btn-desactive"}
              onClick={() => {
                setIsC(!isC), setIsBtnActiveF(false), setIsBtnActiveC(true);
              }}
            >
              °C
            </a>
            <a
              className={isBtnActiveF ? "btn-active" : "btn-desactive"}
              onClick={() => {
                setIsC(!isC), setIsBtnActiveC(false), setIsBtnActiveF(true);
              }}
            >
              °F
            </a>
          </div>
        </section>
        <ul className="footer flex-col">
          <div className="img-item">
            <img
              src={
                apiData &&
                `http://openweathermap.org/img/wn/${apiData?.weather[0].icon}@4x.png`
              }
              alt=""
            />
          </div>
          <p>"{apiData?.weather[0].description}"</p>
        </ul>
      </section>

      <ul className="flex-col">
        <li className="item">
          <i className="bx bx-show-alt"></i>
          <div>
            <p>Visibility </p>
            <h2>{apiData?.visibility / 1000} Km</h2>
          </div>
        </li>
        <li className="item">
          <i className="bx bx-wind"></i>
          <div>
            <p>Speed </p>
            <h2>{apiData?.wind.speed} m/s</h2>
          </div>
        </li>
        <li className="item">
          <i className="bx bxs-droplet-half"></i>
          <div>
            <p>Humidity </p>
            <h2>{apiData?.main.humidity} %</h2>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default WeatherCard;
