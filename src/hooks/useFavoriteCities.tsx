import { useState } from "react";

const storedFavoritesCities = localStorage.getItem('favorite-cities');
const MAX_FAVORITE_CITIES = 3;
  
export default function useFavoriteCities() {
    const [favoriteCities, setFavoriteCities] = useState<string[]>(
      Array.isArray(storedFavoritesCities) ? JSON.parse(storedFavoritesCities) : []
    );
  
    function addFavoriteCity(cityKey: string) {
      setFavoriteCities(currentFavoriteCities => {
        if (currentFavoriteCities.length >= MAX_FAVORITE_CITIES) {
          // ToDo: instruct the user
          return currentFavoriteCities;
        } else {
          return [...currentFavoriteCities].concat([cityKey]);
        }
      });
    }
  
    function removeFavoriteCity(cityKey: string) {
      setFavoriteCities(currentFavoriteCities => {
        const index = currentFavoriteCities.indexOf(cityKey);
  
        if (index === -1) {
          return currentFavoriteCities;
        } else {
          const newFavoriteCities = [...currentFavoriteCities];
          newFavoriteCities.splice(index, 1);
          return newFavoriteCities;
        }
      })
    }

    return { favoriteCities, addFavoriteCity, removeFavoriteCity };
}