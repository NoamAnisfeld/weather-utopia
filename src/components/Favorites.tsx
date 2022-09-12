import { useContext } from "react";
import { FavoriteCitiesContext } from "../FavoriteCitiesContext";
import CityInfoWidget from "./CityInfoWidget";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Favorites() {
    const favoriteCitiesContext = useContext(FavoriteCitiesContext);
    if (!favoriteCitiesContext) {
        return <>Something went wrong</>;
    }

    const {
        favoriteCities,
        addFavoriteCity,
        removeFavoriteCity,
    } = favoriteCitiesContext;

    return <Container fluid className="favorites-area p-5">
        <Row className="justify-content-center">
            {favoriteCities.map(city =>
                <Col
                    key={city.key}
                    className="col-auto"
                >
                    <CityInfoWidget {...{
                        cityKey: city.key,
                        cityName: city.name,
                    }} />
                </Col>
            )}
        </Row>
    </Container>
}