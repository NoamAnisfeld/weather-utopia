import CitySearchBox from './CitySearchBox';
import CityInfoWidget from './CityInfoWidget';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Main({
    cityName,
    setCityName,
    cityKey,
    setCityKey,
}:{
    cityName: string,
    setCityName: (cityName: string) => void,
    cityKey: string,
    setCityKey: (cityKey: string) => void,
} ) {

    return <Container>
        <Row>
            <Col className="search-area py-5">
                <CitySearchBox {...{
                    cityName,
                    setCityName,
                    cityKey,
                    setCityKey,
                }} />
            </Col>
            <Col className="info-area p-5 d-flex justify-content-center">
                <CityInfoWidget {...{
                    cityName,
                    cityKey,
                }}/>
            </Col>
        </Row>
    </Container>
}