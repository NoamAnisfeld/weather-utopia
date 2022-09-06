import { useContext } from "react";
import { FavoritesContext } from "../hooks/favoriteCitiesContext";

export default function FavoritesControlButton({
    cityKey,
    cityName,
}: {
    cityKey: string,
    cityName: string,
}) {
    const {
        favoriteCities,
        addFavoriteCity,
        removeFavoriteCity,
    } = useContext(FavoritesContext)

    return favoriteCities.find(item => item.key === cityKey) ?
        <button
            type="button"
            onClick={() => removeFavoriteCity(cityKey)}
        >
            Remove from favorites
        </button> :
        <button
            type="button"
            onClick={() => addFavoriteCity(cityKey, cityName)}
        >
            Add to favorites
        </button>
}