import './App.css';
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from './components/Navigation';
import Main from './components/Main';
import Favorites from './components/Favorites';

function App() {
  
  return (
    <div className="App">
      <h1>Weather Viewer</h1>
      <Navigation />
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;