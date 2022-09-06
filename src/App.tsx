import './App.css';
import { useEffect, useState } from 'react';
import { getResult } from './API/mockAPI'
import CityInfoWidget from './components/CityInfoWidget';

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      const cityName = 'Tel Aviv';

      const APICitiesData = await getResult('autocomplete'),
        cityData = APICitiesData[cityName]?.[0],
        cityKey = cityData.Key;
      
      const conditionsData = await getResult('currentconditions'),
        cityConditionsInfo = conditionsData[cityKey]?.[0];
      
      setText(JSON.stringify(cityConditionsInfo));
    })();
  }, []);

  return (
    <div className="App">
      <h1>Weather Viewer</h1>
      <CityInfoWidget
        name="Lumenaria"
        info={{
          WeatherText: "Rainy",
          Temperature: {
            Metric: {
              Value: 5
            }
          }
        }}
      />
    </div>
  );
}

export default App;
