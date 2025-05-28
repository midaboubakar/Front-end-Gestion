import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, getUserInfo } from "../Utils/auth";

export default function Header({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = getUserInfo();

  // Couleur commune header/footer
  //const bgColor = "#282c34";

  const styles = {
    header: {
      background: 'linear-gradient(135deg, #2d466b, #4a6fa5)',
      color: "white",
      padding: "0.8rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      margin: 0,
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    navMobile: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      width: "100%",
      marginTop: "0.5rem",
      //backgroundColor: bgColor,
      padding: "0.5rem 0",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "1rem",
      padding: "0.4rem 0.8rem",
      borderRadius: "5px",
      transition: "background 0.2s",
    },
    linkHover: {
      backgroundColor: "#3c4048",
    },
    button: {
      backgroundColor: "#ff4d4d",
      color: "white",
      border: "none",
      padding: "0.3rem 0.8rem",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      marginLeft: "1rem",
    },
    userInfo: {
      fontWeight: "500",
      marginLeft: "1rem",
      whiteSpace: "nowrap",
    },
    hamburger: {
      cursor: "pointer",
      width: "25px",
      height: "18px",
      display: "none",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    bar: {
      height: "3px",
      width: "100%",
      backgroundColor: "white",
      borderRadius: "2px",
    },

    // Media Queries via JS (using window.innerWidth for demo)
  };

  // Gestion du hover avec simple inline style n'est pas possible facilement, donc je conseille CSS dans un vrai projet.
  // Ici on laisse simple.

  // Media Query en React inline : 
  // Pour faire du responsive, on peut utiliser CSS ou conditionner l'affichage ici
  // Ou plus simple, on ajoute un petit hook pour détecter largeur écran (non implémenté ici).
  // Ici on fait un truc basique : le menu hamburger s'affiche seulement en < 768px

  // Pour simuler media queries en inline, on peut ajouter dans le JSX une condition pour hamburger/menu mobile.

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>🏆 Championnats</h1>

      {/* Hamburger pour petits écrans */}
      <div
        style={{
          ...styles.hamburger,
          display: window.innerWidth < 768 ? "flex" : "none",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <div style={styles.bar} />
        <div style={styles.bar} />
        <div style={styles.bar} />
      </div>

      {/* Navigation normale sur desktop */}
      <nav
        style={{
          ...styles.nav,
          display: window.innerWidth >= 768 ? "flex" : "none",
        }}
      >
        <Link to="/" style={styles.link}>🏠 Accueil</Link>
        <Link to="/championnats" style={styles.link}>🥇 Championnats</Link>
        <Link to="/equipes" style={styles.link}>👥 Équipes</Link>
        <Link to="/matchs" style={styles.link}>⚽ Matchs</Link>
        <Link to="/classements" style={styles.link}>📊 Classements</Link>
        <Link to="/joueurs" style={styles.link}>🎯 Joueurs</Link>

        {isAuthenticated() ? (
          <>
            <span style={styles.userInfo}>👤 {user?.email || "Utilisateur"}</span>
            <button onClick={onLogout} style={styles.button}>🚪 Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>🔐 Connexion</Link>
           {/*<Link to="/forgot-password" style={styles.link}>❓ Mot de passe oublié</Link>*/} 
          </>
        )}
      </nav>

      {/* Navigation mobile */}
      <nav style={styles.navMobile}>
        {menuOpen && (
          <>
            <Link to="/" style={styles.link} onClick={() => setMenuOpen(false)}>🏠 Accueil</Link>
            <Link to="/championnats" style={styles.link} onClick={() => setMenuOpen(false)}>🥇 Championnats</Link>
            <Link to="/equipes" style={styles.link} onClick={() => setMenuOpen(false)}>👥 Équipes</Link>
            <Link to="/matchs" style={styles.link} onClick={() => setMenuOpen(false)}>⚽ Matchs</Link>
            <Link to="/classements" style={styles.link} onClick={() => setMenuOpen(false)}>📊 Classements</Link>
            <Link to="/joueurs" style={styles.link} onClick={() => setMenuOpen(false)}>🎯 Joueurs</Link>

            {isAuthenticated() ? (
              <>
                <span style={styles.userInfo}>👤 {user?.email || "Utilisateur"}</span>
                <button onClick={() => { onLogout(); setMenuOpen(false); }} style={styles.button}>🚪 Déconnexion</button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.link} onClick={() => setMenuOpen(false)}>🔐 Connexion</Link>
                {/*<Link to="/forgot-password" style={styles.link} onClick={() => setMenuOpen(false)}>❓ Mot de passe oublié</Link> */}
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
