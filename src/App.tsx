import './App.css';
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from './components/Navigation';
import Main from './components/Main';
import Favorites from './components/Favorites';
import useFavoriteCities from './hooks/useFavoriteCities';

function App() {
  const { favoriteCities, addFavoriteCity, removeFavoriteCity } = useFavoriteCities();

  return (
    <div className="App">
      <h1>Weather Viewer</h1>
      <Navigation />
      <Routes>
        <Route path="*" element={
          <Main {...{
            favoriteCities,
            addFavoriteCity,
            removeFavoriteCity,
          }} />
        } />
        <Route path="favorites" element={
          <Favorites {...{
            favoriteCities,
            addFavoriteCity,
            removeFavoriteCity,
          }} />
        } />
      </Routes>
    </div>
  );
}

export default App;