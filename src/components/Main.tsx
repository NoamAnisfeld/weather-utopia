import { useState } from 'react';
import CitySearchBox from './CitySearchBox';
import CityInfoWidget from './CityInfoWidget';

export default function Main({
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity,
}: {
    favoriteCities: string[],
    addFavoriteCity: (cityKey: string) => void,
    removeFavoriteCity: (cityKey: string) => void,
}) {
    const [cityName, setCityName] = useState('Tel Aviv'),
    [cityKey, setCityKey] = useState('');

    return <>
        <CitySearchBox {...{
            cityName,
            setCityName,
            setCityKey,
        }} />
        <CityInfoWidget {...{
            cityName,
            cityKey,
            favoriteCities,
            addFavoriteCity,
            removeFavoriteCity,
        }}/>
    </>
}