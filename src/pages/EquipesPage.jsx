import { useEffect, useState } from "react";
import { getEquipes, addEquipe } from "../services/api";
import EquipeForm from "../components/EquipeForm";
import EquipeCard from "../components/EquipeCard";
import "./EquipesPage.css"; // Tu peux garder ce fichier pour styles généraux

export default function EquipesPage() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const selectedChampId = "6657eeb5b0c5806e9f676e76"; // Remplace par un vrai ID

  useEffect(() => {
    async function fetchEquipes() {
      setLoading(true);
      setError(null);
      try {
        const data = await getEquipes(selectedChampId);
        setEquipes(data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des équipes.");
      } finally {
        setLoading(false);
      }
    }

    if (selectedChampId.trim()) {
      fetchEquipes();
    }
  }, [selectedChampId]);

  async function handleAddEquipe(formData) {
    try {
      const nouvelleEquipe = await addEquipe(selectedChampId, formData);
      setEquipes((prev) => [...prev, nouvelleEquipe]);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de l'équipe.");
    }
  }

  const headerColor = "#4a6fa5"; // Même couleur que ton header

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      minHeight: "100vh",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      color: headerColor,
    },
    loading: {
      marginTop: "1rem",
      color: "#666",
    },
    error: {
      marginTop: "1rem",
      color: "#e74c3c",
      fontWeight: "bold",
    },
    empty: {
      marginTop: "1rem",
      color: "#999",
      fontStyle: "italic",
    },
    list: {
      marginTop: "2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.5rem",
      width: "100%",
      maxWidth: "1100px",
    },
    cardWrapper: {
      backgroundColor: "#f8f9fa",
      borderRadius: "16px",
      padding: "1.5rem",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      cursor: "pointer",
      fontWeight: 600,
      transition: "transform 0.3s ease, background-color 0.3s ease",
      userSelect: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "120px",
      color: "#333",
    },
    cardHover: {
      backgroundColor: headerColor,
      color: "#fff",
      transform: "scale(1.05)",
      boxShadow: `0 8px 20px ${headerColor}88`,
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 Équipes du championnat</h2>

      <EquipeForm onSubmit={handleAddEquipe} />

      {loading && <p style={styles.loading}>Chargement des équipes...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && equipes.length === 0 && (
        <p style={styles.empty}>Aucune équipe trouvée.</p>
      )}

      <div style={styles.list}>
        {equipes.map((equipe, i) => (
          <div
            key={equipe._id}
            style={{
              ...styles.cardWrapper,
              ...(hoveredIndex === i ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <EquipeCard equipe={equipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
