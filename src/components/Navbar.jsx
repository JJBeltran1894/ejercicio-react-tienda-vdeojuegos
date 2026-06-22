import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar-epic">
      <span className="navbar-logo">Tienda Videojuegos</span>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Videojuegos
        </Link>
        <Link to="/nuevo" className="nav-link">
          Nuevo Videojuego
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
