import './App.css';
import { useEffect, useState } from 'react';
import type { CityCurrentConditions } from './API/dataTypes';
import { validateCityCurrentConditions } from './API/dataTypes';
import { getResult } from './API/mockAPI'
import CitySearchBox from './components/CitySearchBox';
import CityInfoWidget from './components/CityInfoWidget';

function App() {
  const [cityName, setCityName] = useState('Tel Aviv'),
    [cityConditionsInfo, setCityConditionsInfo] =
      useState<CityCurrentConditions>();
  
  useEffect(() => {
    (async () => {
      const APICitiesData = await getResult('autocomplete'),
        cityData = APICitiesData[cityName]?.[0],
        cityKey = cityData.Key;
      
      const conditionsInfo = validateCityCurrentConditions(
        (await getResult('currentconditions'))[cityKey]?.[0]
      );

      setCityConditionsInfo(conditionsInfo);
    })();
  }, [cityName]);

  return (
    <div className="App">
      <h1>Weather Viewer</h1>
      <CitySearchBox />
      {cityConditionsInfo && <CityInfoWidget
        name={cityName}
        info={cityConditionsInfo}
      />}
    </div>
  );
}

export default App;
