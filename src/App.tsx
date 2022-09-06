import './App.css';
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Main from './components/Main';
import Favorites from './components/Favorites';
import useFavoriteCitiesContext from './hooks/favoriteCitiesContext';

function App() {
  const FavoritesContext = useFavoriteCitiesContext();

  return (
    <FavoritesContext>
      <div className="App">
        <h1>Weather Viewer</h1>
        <Navigation />
        <Routes>
          <Route path="*" element={
            <Main />
          } />
          <Route path="favorites" element={
            <Favorites />
          } />
        </Routes>
      </div>
    </FavoritesContext>
  );
}

export default App;