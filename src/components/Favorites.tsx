import { useContext } from "react";
import { FavoritesContext } from "../hooks/favoriteCitiesContext";
import CityInfoWidget from "./CityInfoWidget";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Favorites() {
    const {
        favoriteCities,
        addFavoriteCity,
        removeFavoriteCity,
    } = useContext(FavoritesContext)

    return <Container className="favorites-area p-5">
        <Row className="justify-content-center">
            {favoriteCities.map(city => <Col className="col-auto">
                <CityInfoWidget {...{
                        cityKey: city.key,
                        cityName: city.name,
                    }} />
                </Col>
            )}
        </Row>
    </Container>
}