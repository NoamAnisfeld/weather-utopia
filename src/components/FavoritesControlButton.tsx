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
            className="bg-transparent border-0"
            type="button"
            title="Remove from favorites"
            onClick={() => removeFavoriteCity(cityKey)}
        >
            <img
                src={`${process.env.PUBLIC_URL}/assets/star-fill.svg`}
                width="20"
                height="20"
            />
         </button> :
        <button
            className="bg-transparent border-0"
            type="button"
            title="Add to favorites"
            onClick={() => addFavoriteCity(cityKey, cityName)}
        >
            <img
                src={`${process.env.PUBLIC_URL}/assets/star.svg`}
                width="20"
                height="20"
            />
        </button>
}