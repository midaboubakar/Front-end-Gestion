import { useEffect, useState } from "react";
import { getJoueurs } from "../services/api";
import JoueurCard from "../components/JoueurCard";

export default function JoueursPage({ equipeId }) {
  const [joueurs, setJoueurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!equipeId) return;

    async function fetchJoueurs() {
      try {
        setLoading(true);
        const data = await getJoueurs(equipeId);
        setJoueurs(data);
      } catch (err) {
        setError("Erreur lors du chargement des joueurs");
      } finally {
        setLoading(false);
      }
    }

    fetchJoueurs();
  }, [equipeId]);

  // 🎨 Styles
  const styles = {
    container: {
      padding: "1rem",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "1.8rem",
      marginBottom: "1rem",
    },
    message: {
      fontStyle: "italic",
      color: "#555",
    },
    error: {
      color: "red",
      fontWeight: "bold",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      marginTop: "1rem",
    }
  };

  if (!equipeId) {
    return <p style={styles.message}>⚠️ Sélectionnez une équipe pour voir ses joueurs.</p>;
  }

  if (loading) {
    return <p style={styles.message}>⏳ Chargement des joueurs...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 Joueurs de l'équipe</h2>
      {joueurs.length === 0 ? (
        <p style={styles.message}>Aucun joueur trouvé.</p>
      ) : (
        <div style={styles.grid}>
          {joueurs.map(joueur => (
            <JoueurCard key={joueur._id} joueur={joueur} />
          ))}
        </div>
      )}
    </div>
  );
}
