import { useEffect, useState } from "react";
import { getMatchs } from "../services/api";

export default function MatchsPage() {
  const [matchs, setMatchs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const selectedChampId = "64f377aaa963d56fc32d04dc"; // ID du championnat sélectionné
  const headerColor = "#1f2e57"; // couleur principale du thème

  useEffect(() => {
    async function fetchMatchs() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMatchs(selectedChampId);
        setMatchs(data);
      } catch (err) {
        setError("Erreur lors du chargement des matchs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (selectedChampId.trim()) {
      fetchMatchs();
    }
  }, [selectedChampId]);

  const styles = {
    container: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      color: "#fff",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      width: "100%",
      maxWidth: "1100px",
    },
    matchCard: {
      borderRadius: "16px",
      padding: "1.5rem",
      backgroundColor: "transparent",
      border: `1px solid ${headerColor}`,
      color: "#eee",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textAlign: "center",
      userSelect: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "180px",
    },
    matchCardHover: {
      backgroundColor: headerColor,
      color: "#fff",
      transform: "scale(1.05)",
      boxShadow: `0 8px 20px ${headerColor}88`,
    },
    matchTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    matchInfo: {
      fontSize: "1rem",
      margin: "0.4rem 0",
    },
    error: {
      color: "#e74c3c",
      fontWeight: "bold",
      textAlign: "center",
      marginTop: "2rem",
    },
    loading: {
      fontSize: "1.2rem",
      textAlign: "center",
      marginTop: "2rem",
    },
    noMatch: {
      fontSize: "1rem",
      color: "#bbb",
      textAlign: "center",
      marginTop: "2rem",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📅 Liste des matchs</h2>

      {loading && <p style={styles.loading}>Chargement des matchs...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && matchs.length === 0 && (
        <p style={styles.noMatch}>Aucun match trouvé pour ce championnat.</p>
      )}

      <div style={styles.grid}>
        {matchs.map((match, i) => (
          <div
            key={match._id}
            style={{
              ...styles.matchCard,
              ...(hoveredIndex === i ? styles.matchCardHover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h3 style={styles.matchTitle}>{match.nom}</h3>
            <p style={styles.matchInfo}>⚽ Équipe 1 : {match.equipe1?.nom || "N/A"}</p>
            <p style={styles.matchInfo}>⚽ Équipe 2 : {match.equipe2?.nom || "N/A"}</p>
            <p style={styles.matchInfo}>
              📅 Date : {match.date ? new Date(match.date).toLocaleDateString() : "N/A"}
            </p>
            <p style={styles.matchInfo}>🏟 Stade : {match.stade || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
