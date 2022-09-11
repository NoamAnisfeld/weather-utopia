import { useEffect, useState } from "react";
import type { CityConditions } from "../API/cityConditions";
import cityConditions from "../API/cityConditions";
import FavoritesControlButton from "./FavoritesControlButton";
import Loader from "./Loader";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

    return <Card className="city-info-widget">
        {/* <Container>
            <Row>
            </Row>
            <Row>
            </Row>
        </Container> */}
        <Card.Header className="d-flex justify-content-between">
                <h2>{cityName}</h2>
                <FavoritesControlButton {...{
                    cityKey,
                    cityName,
                }} />
        </Card.Header>
        <Card.Body className="fs-4">
            {conditions ? <dl className="city-info-details d-flex flex-column justify-content-around align-content-center">
                <dt>Weather:</dt>
                <dd>{conditions.weatherText}</dd>

                <dt>Temperature:</dt>
                <dd>{`${conditions.temperatureC}°C`}</dd>
            </dl> :
            <Loader />}
        </Card.Body>
    </Card>
}