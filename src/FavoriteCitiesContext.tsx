import { useState, createContext, PropsWithChildren } from "react";
import { safeJSONParse } from "./utils/utils";

const MAX_FAVORITE_CITIES = 3,
    STORAGE_KEY = 'favorite-cities';
const fetchedFavoritesCities = safeJSONParse(
    localStorage.getItem(STORAGE_KEY) || '[]',
    []),
    favoriteCities = Array.isArray(fetchedFavoritesCities) ? fetchedFavoritesCities : [];

interface City {
    key: string,
    name: string
}

function updateStorage(cities: City[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

function cloneCitiesList(list: City[]): City[] {
    return list.map(item => ({...item}));
}

function addFavoriteCityToList(list: City[], newCity: City) {
    const newList = cloneCitiesList(list);
    newList.push({...newCity});
    return newList;
}

function removeFavoriteCityFromList(list: City[], cityKey: string) {
    const newList = cloneCitiesList(list);
    const index = newList.findIndex(item => item.key === cityKey);

    if (index !== -1) {
        newList.splice(index, 1);
    }

    return newList;
}

export interface FavoriteCitiesProps {
    favoriteCities: City[],
    addFavoriteCity: (city: City) => void,
    removeFavoriteCity: (cityKey: string) => void,
}

export const FavoriteCitiesContext = createContext<FavoriteCitiesProps | null>(null);

export function FavoriteCitiesContextProvider ({ children }: React.PropsWithChildren) {
    const [citiesList, setCitiesList] = useState(favoriteCities);

    function addFavoriteCity(city: City) {
        setCitiesList(list => {
            if (list.length >= MAX_FAVORITE_CITIES) {
                // ToDo: Switch to using a modal
                alert(`Can't add more than ${MAX_FAVORITE_CITIES} favorites`);
                return list;
            }
            return addFavoriteCityToList(list, city);
        });
    }

    function removeFavoriteCity(cityKey: string) {
        setCitiesList(list => removeFavoriteCityFromList(list, cityKey) );
    }
    
    return <FavoriteCitiesContext.Provider value={{
        favoriteCities: cloneCitiesList(citiesList),
        addFavoriteCity,
        removeFavoriteCity
    }}>
        {children}
    </FavoriteCitiesContext.Provider>
}