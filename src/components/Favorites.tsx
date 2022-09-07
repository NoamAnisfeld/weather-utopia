import { useContext } from "react";
import { FavoritesContext } from "../hooks/favoriteCitiesContext";
import CityInfoWidget from "./CityInfoWidget";

export default function Favorites() {
    const {
        favoriteCities,
        addFavoriteCity,
        removeFavoriteCity,
    } = useContext(FavoritesContext)

    return <div className="favorites-area">
        {favoriteCities.map(city => <CityInfoWidget {...{
                cityKey: city.key,
                cityName: city.name,
            }} />
        )}
    </div>
}