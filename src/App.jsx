import { useState } from "react";
import clear_m from "./assets/clear_sky.png";
import clear_n from "./assets/moon@night.png"
import cloud_m from "./assets/cloudy_sky.png";
import cloud_n from "./assets/moon@night.png"
import humidity from "./assets/humidity.png";
import search from "./assets/search.png";
import wind from "./assets/wind.png";
import rain_m from "./assets/rain@morning.png"
import rain_n from "./assets/rain@night.png"
import few_clouds_m from "./assets/fcm.png"
import few_clouds_n from './assets/fcn.png'
import thunder_m from './assets/tm.png'
import thunder_n from './assets/tn.png'
import snow_m from './assets/sm.png'
import snow_n from './assets/sn.png'
import mist_m from './assets/mm.png'
import mist_n from './assets/mn.png'
import "./App.css";

const Climate = ({
  image,
  place,
  country,
  lat,
  log,
  humidity_data,
  wind_data,
  temp,
}) => {
  return (
    <>
      <div className="climate">
        <img className="image-state" src={image} alt={image} />
      </div>
      <div className="content">
        <div className="tem">{temp}°C</div>
        <div className="place">{place}</div>
        <div className="country">{country}</div>
        <div className="co-ordinates-container">
          <div className="co-ordinates">
            <span>latitude</span>
            <span>{lat}</span>
          </div>
          <div className="co-ordinates">
            <span>loglitude</span>
            <span>{log}</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="humidity">
          <img src={humidity} alt="humidity" className="bottom-image" />
          <div>{humidity_data} %</div>
        </div>
        <div className="wind">
          <img src={wind} alt="wind speed" className="bottom-image" />
          <div>{wind_data} km/hr</div>
        </div>
      </div>
    </>
  );
};

function App() {
  const weatherObj = {
    "01d": clear_m,
    "01n": clear_n,
    "02d": few_clouds_m,
    "02n": few_clouds_n,
    "03d": cloud_m,
    "04d": cloud_m,
    "04n": cloud_n,
    "03n": cloud_n,
    "09d": rain_m,
    "10d": rain_m,
    "09n": rain_n,
    "10n": rain_n,
    "11d": thunder_m,
    "11n": thunder_n,
    "13d": snow_m,
    "13n": snow_n,
    "50d": mist_m,
    "50n": mist_n,
  };
  const [image, setImage] = useState(few_clouds_n);
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [wind_data, setWind_data] = useState(0);
  const [humidity_data, setHumidity_data] = useState(0);
  const [temp, setTemp] = useState(0);
  const [loading, setLoading] = useState(false);

  const search_data = async (e) => {
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=fb6f58f819c528a07b9c68778408b772&units=metric`;
    const trimmed = place.trim();
    if (!trimmed) {
      console.log("cannot be empty");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      let response = await fetch(url);
      if (response.status === 404) {
        alert("city not found. please make sure given name is correct");
        setLoading(false);
        return;
      }
      let data = await response.json();
      let key=data.weather[0].icon
      setCountry(data.sys.country);
      setHumidity_data(data.main.humidity);
      setTemp(data.main.temp);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setWind_data(data.wind.speed);
      setLoading(false);
      setImage(weatherObj[key])
      
      return;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setPlace(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search_data(e);
              }
            }}
          />
          <img src={search} alt="search" onClick={(e) => search_data(e)} />
        </div>
        <Climate
          image={image}
          place={place}
          country={country}
          lat={lat}
          log={log}
          humidity_data={humidity_data}
          wind_data={wind_data}
          temp={temp}
        />
      </div>
    </>
  );
}

export default App;
