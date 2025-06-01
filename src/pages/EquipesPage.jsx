import { useEffect, useState } from "react";
import { getEquipes, addEquipe } from "../services/api";
import EquipeForm from "../components/EquipeForm";
import EquipeCard from "../components/EquipeCard";
import "./EquipesPage.css"; // 💡 Import du fichier CSS

export default function EquipesPage() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedChampId = "6657eeb5b0c5806e9f676e76"; // 🔧 Remplace par un vrai ID de championnat

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

  return (
    <div className="equipes-container">
      <h2 className="equipes-title">📋 Équipes du championnat</h2>

      <EquipeForm onSubmit={handleAddEquipe} />

      {loading && <p className="equipes-loading">Chargement des équipes...</p>}
      {error && <p className="equipes-error">{error}</p>}
      {!loading && equipes.length === 0 && (
        <p className="equipes-empty">Aucune équipe trouvée.</p>
      )}

      <div className="equipes-list">
        {equipes.map((equipe) => (
          <EquipeCard key={equipe._id} equipe={equipe} />
        ))}
      </div>
    </div>
  );
}
