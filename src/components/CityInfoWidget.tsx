import { useEffect, useState } from "react";
import type { CityConditions } from "../API/cityConditions";
import cityConditions from "../API/cityConditions";
import FavoritesControlButton from "./FavoritesControlButton";
import Loader from "./Loader";

export default function CityInfoWidget({
    cityName,
    cityKey,
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity,
}: {
    cityName: string,
    cityKey: string,
    favoriteCities: string[],
    addFavoriteCity: (cityKey: string) => void,
    removeFavoriteCity: (cityKey: string) => void,
}) {
    const [conditions, setConditions] = useState<CityConditions>();

    useEffect(() => {
        setConditions(undefined);

        (async () => {
            const conditions = await cityConditions(cityKey);
            if (conditions) {
                setConditions(conditions);
            }
        })()
    }, [cityKey]);

    return <div className="outlined">
        <FavoritesControlButton {...{
            cityKey,
            favoriteCities,
            addFavoriteCity,
            removeFavoriteCity,
        }} />
        <h2>{cityName}</h2>
        {conditions ?
        <dl>
            <dt>Weather:</dt>
            <dd>{conditions.weatherText}</dd>

            <dt>Temperature:</dt>
            <dd>{`${conditions.temperatureC}°C`}</dd>
        </dl> :
        <Loader />}
    </div>
}