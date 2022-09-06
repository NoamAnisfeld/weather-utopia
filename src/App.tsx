import './App.css';
import { useState } from 'react';
import CitySearchBox from './components/CitySearchBox';
import CityInfoWidget from './components/CityInfoWidget';

function App() {
  const [cityName, setCityName] = useState('Tel Aviv'),
    [cityKey, setCityKey] = useState('');
  
  return (
    <div className="App">
      <h1>Weather Viewer</h1>
      <CitySearchBox {...{
        cityName,
        setCityName,
        setCityKey,
      }}
      />
      <CityInfoWidget {...{
        cityName,
        cityKey
      }}/>
    </div>
  );
}

export default App;