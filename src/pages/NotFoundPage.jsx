import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{
      textAlign: "center",
      padding: "4rem 1rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#444"
    }}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>404 - Page non trouvée</h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Cette page n'existe pas.
      </p>
      <Link to="/" style={{
        textDecoration: "none",
        color: "white",
        backgroundColor: "#007bff",
        padding: "0.75rem 1.5rem",
        borderRadius: "6px",
        fontWeight: "600",
        transition: "background-color 0.3s",
      }}
      onMouseEnter={e => (e.target.style.backgroundColor = "#0056b3")}
      onMouseLeave={e => (e.target.style.backgroundColor = "#007bff")}
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
