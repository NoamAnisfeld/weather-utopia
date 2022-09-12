import { useEffect, useState } from "react";
import type { CityConditions } from "../API/cityConditions";
import cityConditions from "../API/cityConditions";
import FavoritesControlButton from "./FavoritesControlButton";
import Loader from "./Loader";
import Card from 'react-bootstrap/Card';

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

    return <Card className="city-info-widget bg-info m-3">
        <Card.Header className="d-flex justify-content-between bg-primary">
                <h2>{cityName}</h2>
                <FavoritesControlButton {...{
                    cityKey,
                    cityName,
                }} />
        </Card.Header>
        <Card.Body className="fs-4">
            <dl className="city-info-details d-flex flex-column justify-content-around align-content-center">
                <dt>Weather:</dt>
                <dd>
                    {conditions ?
                    conditions.weatherText :
                    <Loader />}
                </dd>

                <dt>Temperature:</dt>
                <dd>
                    {conditions ?
                    `${conditions.temperatureC}°C` :
                    <Loader />}
                </dd>
            </dl>
        </Card.Body>
    </Card>
}