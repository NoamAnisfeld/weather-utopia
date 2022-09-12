import { useContext } from "react";
import { FavoriteCitiesContext } from "../FavoriteCitiesContext";

export default function FavoritesControlButton({
    cityKey,
    cityName,
}: {
    cityKey: string,
    cityName: string,
}) {
    const favoriteCitiesContext = useContext(FavoriteCitiesContext);
    if (!favoriteCitiesContext) {
        return <></>;
    }

    const {
        favoriteCities,
        addFavoriteCity,
        removeFavoriteCity,
    } = favoriteCitiesContext;

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
            onClick={() => addFavoriteCity({
                key: cityKey,
                name: cityName
            })}
        >
            <img
                src={`${process.env.PUBLIC_URL}/assets/star.svg`}
                width="20"
                height="20"
            />
        </button>
}