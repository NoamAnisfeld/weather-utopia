import { useEffect, useState } from "react";
import type { CityConditions } from "../API/cityConditions";
import cityConditions from "../API/cityConditions";
import FavoritesControlButton from "./FavoritesControlButton";
import Loader from "./Loader";

export default function CityInfoWidget({
    cityName,
    cityKey,
}: {
    cityName: string,
    cityKey: string,
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

    return <div className="city-info-widget">
        <FavoritesControlButton {...{
            cityKey,
            cityName,
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