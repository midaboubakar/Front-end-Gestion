import "./Header.css";
import { Link } from "react-router-dom";
import { isAuthenticated, logout, getUserInfo } from "../Utils/auth";

export default function Header() {
  const user = getUserInfo();

  return (
    <header className="header">
      <h1 className="logo">🏆 Championnats</h1>
      <nav className="nav">
        <Link to="/" className="link">🏠 Accueil</Link>
        <Link to="/championnats" className="link">🥇 Championnats</Link>
        <Link to="/equipes" className="link">👥 Équipes</Link>
        <Link to="/matchs" className="link">⚽ Matchs</Link>
        <Link to="/classements" className="link">📊 Classements</Link>
        <Link to="/joueurs" className="link">🎯 Joueurs</Link>

        {isAuthenticated() ? (
          <>
            <span className="user-info">👤 {user?.email || "Utilisateur"}</span>
            <button onClick={logout} className="button">🚪 Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="link">🔐 Connexion</Link>
            <Link to="/forgot-password" className="link">❓ Mot de passe oublié</Link>
          </>
        )}
      </nav>
    </header>
  );
}
