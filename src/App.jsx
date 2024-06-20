import { useState } from "react";
import clear_sky from "./assets/clear_sky.png";
import cloud_sky from "./assets/cloudy_sky.png";
import humidity from "./assets/humidity.png";
import search from "./assets/search.png";
import temperature from "./assets/temperature.png";
import wind from "./assets/wind.png";
import "./App.css";

const Climate = ({ image, place, country, lat, log,humidity_data,wind_data,temp }) => {
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
  const [image, setImage] = useState(cloud_sky);
  const [place, setPlace] = useState("erode");
  const [country, setCountry] = useState("in");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [wind_data, setWind_data] = useState(0);
  const [humidity_data, setHumidity_data] = useState(0);
  const [temp,setTemp]=useState(0)
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" placeholder="Search" />
          <img src={search} alt="search" />
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
