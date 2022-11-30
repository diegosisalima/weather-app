import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  //accediendo a las coordenadas
  const [myCoords, setMyCoords] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(sucess);
    function sucess(pos) {
      setMyCoords({
        lon: pos.coords.longitude,
        lat: pos.coords.latitude,
      });
    }
  }, []);
  //petición
  const [apiData, setApiData] = useState();
  useEffect(() => {
    if (myCoords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myCoords.lat}&lon=${myCoords.lon}&appid=42189a6cacada4bcb7faa6acfb9a6979&units=metric`;
      axios
        .get(url)
        .then((res) => setApiData(res.data))
        .catch((err) => console.log(err));
    }
  }, [myCoords]);
  //resultado
  console.log(apiData);
  return (
    <div
      className="App page-height"
      style={{
        backgroundImage: `url(${
          apiData?.weather[0].icon &&
          `http://openweathermap.org/img/wn/${apiData?.weather[0].icon}@4x.png`
        })`,
      }}
    >
      <h1 className="title">Weather app</h1>
      <WeatherCard apiData={apiData} />
    </div>
  );
}

export default App;
