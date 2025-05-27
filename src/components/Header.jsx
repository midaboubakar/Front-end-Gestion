import { Link } from "react-router-dom";
import { isAuthenticated, logout, getUserInfo } from "../Utils/auth";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "linear-gradient(135deg, #4a6fa5, #2d466b)",
    color: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "1.5rem",
    color: "#fff",
    textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  userInfo: {
    marginLeft: "1rem",
    fontWeight: "500",
    color: "#ffe",
  },
  button: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default function Header() {
  const user = getUserInfo();

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>🏆 Championnats</h1>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Accueil</Link>
        <Link to="/championnats" style={styles.link}>Championnats</Link>
        <Link to="/equipes" style={styles.link}>Équipes</Link>
        <Link to="/matchs" style={styles.link}>Matchs</Link>
        <Link to="/classements" style={styles.link}>Classements</Link>
        <Link to="/joueurs" style={styles.link}>Joueurs</Link>

        {isAuthenticated() ? (
          <>
            <span style={styles.userInfo}>👤 {user?.email || "Utilisateur"}</span>
            <button onClick={logout} style={styles.button}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Connexion</Link>
            <Link to="/forgot-password" style={styles.link}>Mot de passe oublié</Link>
          </>
        )}
      </nav>
    </header>
  );
}
