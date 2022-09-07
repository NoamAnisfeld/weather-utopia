import { useEffect, useState, useRef } from "react";
import type { City } from "../API/autocomplete";
import autocomplete from '../API/autocomplete';

export default function CitySearchBox({
    cityName,
    setCityName,
    cityKey,
    setCityKey,
}: {
    cityName: string,
    setCityName: (cityName: string) => void,
    cityKey: string,
    setCityKey: (cityKey: string) => void,
}) {
    const [inputText, setInputText] = useState(cityName),
        [citiesList, setCitiesList] = useState<City[]>([]);

    useEffect(() => {
        inputText && (async () => {
            const newCitiesList = await autocomplete(inputText);
            setCitiesList(newCitiesList);
        })();
    }, [inputText]);

    const isFirstTime = useRef(true);
    useEffect(() => {
        // On app init, try to fetch data even without the user
        // actively selecting an entry from the list
        if (isFirstTime.current && citiesList.length) {
            isFirstTime.current = false;
            
            const findCityKey =
                citiesList.find(city => city.name === cityName)?.apiKey;
            if (findCityKey) {
                setCityKey(findCityKey);
            }
        }
    }, [citiesList, cityName, setCityKey]);

    function citiesToOptionList(cities: City[]) {
        return cities.map(city =>
            <option
                value={city.apiKey}
                key={city.apiKey}
                selected={city.apiKey === cityKey && city.name === inputText}
            >
                {city.name}
            </option>
        );
    }
    
    return <div className="city-search">
        <label>
            City:
            <input
                type="text"
                placeholder="start typing to search"
                value={inputText}
                onChange={e => setInputText(e.currentTarget.value)}
            />
        </label>

        <select
            size={5}
            onChange={e => {
                const newCityKey = e.currentTarget.value; 
                setCityKey(newCityKey);
                setCityName(
                    citiesList.find(item => item.apiKey === newCityKey)?.name ||
                    'name is missing'
                );
            }}
        >
            {citiesToOptionList(citiesList)}
        </select>
    </div>
}