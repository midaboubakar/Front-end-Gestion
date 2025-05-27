import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#007bff", color: "#fff", marginBottom: "1rem" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "1rem", textDecoration: "none", fontWeight: "bold" }}>
        Accueil
      </Link>
      <Link to="/championnats" style={{ color: "#fff", marginRight: "1rem", textDecoration: "none" }}>
        Championnats
      </Link>
      <Link to="/equipes" style={{ color: "#fff", marginRight: "1rem", textDecoration: "none" }}>
        Équipes
      </Link>
      <Link to="/joueurs" style={{ color: "#fff", marginRight: "1rem", textDecoration: "none" }}>
        Joueurs
      </Link>
      <Link to="/matchs" style={{ color: "#fff", textDecoration: "none" }}>
        Matchs
      </Link>
    </nav>
  );
}
