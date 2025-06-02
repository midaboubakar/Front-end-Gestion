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
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "2rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
    },
    matchCard: {
      borderRadius: "16px",
      padding: "1.5rem",
      backgroundColor: "transparent", // pas de fond blanc
      border: `1px solid ${headerColor}`,
      color: "#eee",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textAlign: "center",
    },
    matchCardHover: {
      backgroundColor: headerColor,
      color: "#fff",
      transform: "scale(1.03)",
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
    },
    loading: {
      fontSize: "1.2rem",
      textAlign: "center",
    },
    noMatch: {
      fontSize: "1rem",
      color: "#bbb",
      textAlign: "center",
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
            <p style={styles.matchInfo}>⚽ Équipe 1 : {match.equipe1?.nom}</p>
            <p style={styles.matchInfo}>⚽ Équipe 2 : {match.equipe2?.nom}</p>
            <p style={styles.matchInfo}>
              📅 Date : {new Date(match.date).toLocaleDateString()}
            </p>
            <p style={styles.matchInfo}>🏟 Stade : {match.stade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
