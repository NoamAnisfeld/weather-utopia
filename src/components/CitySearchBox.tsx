import { useEffect, useState } from "react";
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

export default function CitySearchBox() {
    const [cityName, setCityName] = useState('Tel Aviv'),
        [cityKey, setCityKey] = useState(''),
        [citiesList, setCitiesList] = useState<City[]>([]);

    useEffect(() => {
        cityName && (async () => {
            setCitiesList(await autocomplete(cityName));
        })();
    }, [cityName]);

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