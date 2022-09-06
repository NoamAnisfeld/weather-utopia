import { useEffect, useState, useRef } from "react";
// import { getAutocompleteList } from "../API/mockAPI";
import type { City } from "../API/autocomplete";
import autocomplete from '../API/autocomplete';

// function fromAPIListToOptionList(list: any[]) {
//     let prevHasSameShortName = false;

//     return list.map((item, index) => {
//         const cityShortName = item.LocalizedName,
//             nextShortName = list[index + 1]?.LocalizedName;

//         let currentlyNeedLongName = prevHasSameShortName;
//         prevHasSameShortName = cityShortName === nextShortName;
//         currentlyNeedLongName ||= prevHasSameShortName;
                
//         const cityName = currentlyNeedLongName ?
//             `${item.LocalizedName} (${item.Country.LocalizedName})` :
//             item.LocalizedName;

//         return <option value={item.Key}>{cityName}</option>
//     });
// }

function citiesToOptionList(cities: City[]) {
    return cities.map(city =>
        <option
            value={city.apiKey}
            key={city.apiKey}
        >
            {city.name}
        </option>
    );
}

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
    const [citiesList, setCitiesList] = useState<City[]>([]);
    debugger;

    useEffect(() => {
        cityName && (async () => {
            debugger;
            const newCitiesList = await autocomplete(cityName);
            setCitiesList(newCitiesList);
        })();
    }, [cityName]);

    const isFirstTime = useRef(true);
    useEffect(() => {
        // On app init, try to fetch data even without the user
        // actively selecting an entry from the list
        if (citiesList.length && isFirstTime.current) {
            isFirstTime.current = false;
            
            debugger;
            const findCityKey =
                citiesList.find(city => city.name === cityName)?.apiKey;
            if (findCityKey) {
                setCityKey(findCityKey);
            }
        }
    }, [citiesList, setCityKey, cityName]);

   return <>
        <label>
            City:
            <input
                type="text"
                placeholder="start typing to search"
                value={cityName}
                onChange={e => setCityName(e.currentTarget.value)}
            />
        </label>
        Test: {cityName}
        <select
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
    </>
}