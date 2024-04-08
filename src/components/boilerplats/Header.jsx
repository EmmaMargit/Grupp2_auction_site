/* import "@fontsource/pacifico"
import "@fontsource/pacifico/400.css"
import "@fontsource/pacifico/cyrillic-400.css" */
import '../../stylesheet/Header.css'; 

const Header = () => {
    return (
        <header>
            <div className="logo">Bidmaster</div>
            <nav>
                <ul className="nav-links">
                    <li><a href="#">Lägg till annons</a></li>
                    <li><a href="#">Skapa konto</a></li>
                    <li><a href="#">Logga in</a></li>
                    <li><a href="#">English</a></li>
                </ul>
            </nav>
        </header>
    );
};


/*const Header = () => {

    return (
        <>
            <header style={{ backgroundColor: "#1E253C", minHeight: "273px" }}>
                <p style={{ color: "#FFFFFF", fontFamily: "Pacifico", fontSize: "48px", marginTop: "0", paddingTop: "40px", paddingLeft: "40px" }}>Bidmaster</p>
            </header>
        </>
    )
}
*/


export default Header