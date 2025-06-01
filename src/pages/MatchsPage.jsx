import { useEffect, useState } from "react";
import { getMatchs } from "../services/api";

export default function MatchsPage() {
  const [matchs, setMatchs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedChampId = "64f377aaa963d56fc32d04dc"; // Remplace avec l’ID réel

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
      padding: "2rem",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start", // ✅ le contenu commence en haut
      gap: "1.5rem", // ✅ espacement entre les blocs
      minHeight: "100vh",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
    },
    matchCard: {
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "1rem 1.5rem",
      width: "100%",
      backgroundColor: "#fff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    matchTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      color: "#34495e",
    },
    matchInfo: {
      fontSize: "1rem",
      margin: "0.25rem 0",
    },
    error: {
      color: "#e74c3c",
      fontWeight: "bold",
    },
    loading: {
      fontSize: "1.2rem",
    },
    noMatch: {
      fontSize: "1rem",
      color: "#555",
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

      {matchs.map((match) => (
        <div key={match._id} style={styles.matchCard}>
          <h3 style={styles.matchTitle}>{match.nom}</h3>
          <p style={styles.matchInfo}>⚽ Équipe 1 : {match.equipe1?.nom}</p>
          <p style={styles.matchInfo}>⚽ Équipe 2 : {match.equipe2?.nom}</p>
          <p style={styles.matchInfo}>📅 Date : {new Date(match.date).toLocaleDateString()}</p>
          <p style={styles.matchInfo}>🏟 Stade : {match.stade}</p>
        </div>
      ))}
    </div>
  );
}
