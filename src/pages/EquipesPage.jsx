import { useEffect, useState } from "react";
import { getEquipes, addEquipe } from "../services/api";
import EquipeForm from "../components/EquipeForm";
import EquipeCard from "../components/EquipeCard";

export default function EquipesPage() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedChampId = " "; // Remplacer par un ID réel

  useEffect(() => {
    async function fetchEquipes() {
      setLoading(true);
      setError(null);
      try {
        const data = await getEquipes(selectedChampId);
        setEquipes(data);
      } catch (err) {
        setError("Erreur lors du chargement des équipes.");
        console.error(err);
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

  // Styles pour EquipesPage
  const styles = {
    container: {
      padding: "1.5rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: "960px",
      margin: "0 auto",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color:"#fff",
      minHeight: "100vh", // Assurez-vous que le conteneur prend au moins toute la hauteur de la fenêtre
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    equipeList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      marginTop: "1rem",
      justifyContent: "center",
    },
    loading: {
      //color: "#34495e",
      fontSize: "1.2rem",
      textAlign: "center",
    },
    error: {
      color: "#e74c3c",
      fontWeight: "700",
      fontSize: "1.1rem",
      textAlign: "center",
    },
    noTeams: {
      fontSize: "1.1rem",
      textAlign: "center",
      marginTop: "1rem",
      color: "#7f8c8d",
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 Équipes du championnat</h2>

      <EquipeForm onSubmit={handleAddEquipe} />

      {loading && <p style={styles.loading}>Chargement des équipes...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && equipes.length === 0 && <p style={styles.noTeams}>Aucune équipe trouvée.</p>}

      <div style={styles.equipeList}>
        {equipes.map((equipe) => (
          <EquipeCard key={equipe._id} equipe={equipe} />
        ))}
      </div>
    </div>
  );
}
