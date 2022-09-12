import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {

    return <Navbar bg="secondary" variant="dark" className="p-0">
        <Container fluid>
            <Navbar.Brand>
                <h1>Weather Viewer</h1>
            </Navbar.Brand>
            <Nav>
                <Nav.Item>
                    <Link className="nav-link active text-bg-primary p-4 mx-2" to="/">Main</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link text-bg-primary p-4 mx-2" to="favorites">Favorites</Link>
                </Nav.Item>
            </Nav>
        </Container>
    </Navbar>
}