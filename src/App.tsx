import './App.css';
import { useState } from 'react';
import { Link, Routes, Route, Outlet } from "react-router-dom";
import CitySearchBox from './components/CitySearchBox';
import CityInfoWidget from './components/CityInfoWidget';

function App() {
  const [cityName, setCityName] = useState('Tel Aviv'),
    [cityKey, setCityKey] = useState('');
  
  return (
    <div className="App">
      <h1>Weather Viewer</h1>
      <nav>
        <Link to="/">Main</Link>
        <Link to="favorites">Favorites</Link>
      </nav>
      <Routes>
        <Route path="*" element={
          <>
            <CitySearchBox {...{
              cityName,
              setCityName,
              setCityKey,
            }} />
            <CityInfoWidget {...{
              cityName,
              cityKey
            }}/>
          </>
        } />
        <Route path="favorites" element={
          <>
            Favorite cities
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;