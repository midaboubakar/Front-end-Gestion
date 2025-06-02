import { useEffect, useState } from "react";
import { getChampionnats } from "../services/api";
import ChampionnatCard from "../components/ChampionnatCard";

export default function HomePage() {
  const [list, setList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getChampionnats()
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des championnats");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const headerColor = "#4a6fa5"; // Couleur du header pour le hover

  const styles = {
    container: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', sans-serif",
      textAlign: "center",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontSize: "2.8rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      color: "#fff",
    },
    gridWrapper: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      justifyContent: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "2rem",
      width: "100%",
      maxWidth: "1100px",
    },
    cardWrapper: {
      backgroundColor: "#f8f9fa",
      borderRadius: "16px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      padding: "2.5rem",
      cursor: "pointer",
      transition: "transform 0.3s ease, background-color 0.3s ease",
      color: "#333",
      fontWeight: 600,
      userSelect: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
    },
    cardHover: {
      backgroundColor: headerColor,
      color: "#fff",
      transform: "scale(1.05)",
      boxShadow: `0 8px 20px ${headerColor}88`,
    },
    loading: {
      fontSize: "1.5rem",
      color: "#ccc",
      marginTop: "2rem",
    },
    error: {
      fontSize: "1.3rem",
      color: "#ff6b6b",
      marginTop: "2rem",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Liste des Championnats</h2>

      {loading && <p style={styles.loading}>Chargement en cours...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && (
        <div style={styles.gridWrapper}>
          <div style={styles.grid}>
            {list.map((c, i) => (
              <div
                key={c._id}
                style={{
                  ...styles.cardWrapper,
                  ...(hoveredIndex === i ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => alert("Voir détails du championnat")}
              >
                <ChampionnatCard championnat={c} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
