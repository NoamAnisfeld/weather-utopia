import './App.css';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Main from './components/Main';
import Favorites from './components/Favorites';
import { FavoriteCitiesContextProvider } from './FavoriteCitiesContext';

function App() {
    const DEFAULT_CITY = 'Tel Aviv';
    const [cityName, setCityName] = useState(DEFAULT_CITY),
        [cityKey, setCityKey] = useState('');

    return (
        <div className="App">
            <Navigation />
            <main>
                <FavoriteCitiesContextProvider>
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
                </FavoriteCitiesContextProvider>
            </main>
        </div>
    );
}

export default App;