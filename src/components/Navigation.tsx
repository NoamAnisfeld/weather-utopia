import { Link } from 'react-router-dom';

export default function Navigation() {

    return <nav>
        <Link to="/">Main</Link>
        {" "}
        <Link to="favorites">Favorites</Link>
    </nav>
}
