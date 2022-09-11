import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {

    return <Navbar bg="secondary" variant="dark">
        <Container fluid className="justify-content-end">
            <Nav className="text-bg-primary">
                <Nav.Item>
                    <Link className="nav-link" to="/">Main</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="favorites">Favorites</Link>
                </Nav.Item>
            </Nav>
        </Container>
    </Navbar>
}