
import "@fontsource/pacifico"
import "@fontsource/pacifico/400.css"
import "@fontsource/pacifico/cyrillic-400.css"
import '../../stylesheet/Header.css';
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header>
            <div className="logo">Bidmaster</div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/create-auction">Skapa annons</Link> </li>
                    <li><a href="#">Skapa konto</a></li>
                    <li><a href="#">Logga in</a></li>
                    <li><a href="#">English</a></li>
                </ul>
            </nav>
        </header>
    )
};


export default Header