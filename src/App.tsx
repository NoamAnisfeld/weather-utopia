import './App.css';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Main from './components/Main';
import Favorites from './components/Favorites';
import useFavoriteCitiesContext from './hooks/favoriteCitiesContext';

function App() {
  const FavoritesContext = useFavoriteCitiesContext();
  
  const DEFAULT_CITY = 'Tel Aviv';
  const [cityName, setCityName] = useState(DEFAULT_CITY),
    [cityKey, setCityKey] = useState('');

  return (
    <FavoritesContext>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="*" element={
              <Main {...{
                cityName,
                setCityName,
                cityKey,
                setCityKey,
              }} />
            } />
            <Route path="favorites" element={
              <Favorites />
            } />
          </Routes>
        </main>
      </div>
    </FavoritesContext>
  );
}

export default App;