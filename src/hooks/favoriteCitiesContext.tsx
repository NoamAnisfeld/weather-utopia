import { useState, createContext, PropsWithChildren } from "react";
import { safeJSONParse } from "../utils/utils";

const MAX_FAVORITE_CITIES = 3,
    STORAGE_KEY = 'favorite-cities';
const storedFavoritesCities = safeJSONParse(
    localStorage.getItem(STORAGE_KEY) || '[]',
    []);

interface City {
    key: string,
    name: string
}

function updateStorage(cities: City[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

export interface FavoriteCitiesProps {
    favoriteCities: City[],
    addFavoriteCity: (cityKey: string, cityName: string) => void,
    removeFavoriteCity: (cityKey: string) => void,
}

export const FavoritesContext = createContext<FavoriteCitiesProps>({
  favoriteCities: [],
  addFavoriteCity: () => {},
  removeFavoriteCity: () => {}
});

export default function useFavoriteCitiesContext() {
    const [favoriteCities, setFavoriteCities] = useState<City[]>(
        Array.isArray(storedFavoritesCities) ? storedFavoritesCities : []
    );
  
    function addFavoriteCity(cityKey: string, cityName: string) {
      setFavoriteCities(currentFavoriteCities => {
        if (currentFavoriteCities.length >= MAX_FAVORITE_CITIES) {
          // ToDo: instruct the user
          return currentFavoriteCities;
        } else {
          const newFavoriteCities = [...currentFavoriteCities].concat([{
            key: cityKey,
            name: cityName
          }]);
          updateStorage(newFavoriteCities);
          return newFavoriteCities;
        }
      });
    }
  
    function removeFavoriteCity(cityKey: string) {
      setFavoriteCities(currentFavoriteCities => {
        const index = currentFavoriteCities.findIndex(item => item.key === cityKey);
  
        if (index === -1) {
          return currentFavoriteCities;
        } else {
          const newFavoriteCities = [...currentFavoriteCities];
          newFavoriteCities.splice(index, 1);
          updateStorage(newFavoriteCities);
          return newFavoriteCities;
        }
      })
    }

    const contextProps: FavoriteCitiesProps = { favoriteCities, addFavoriteCity, removeFavoriteCity },
        ContextProvider = ({ children }: PropsWithChildren) => {
            return <FavoritesContext.Provider value={contextProps}>
                {children}
            </FavoritesContext.Provider>;
        }

    return ContextProvider;
}