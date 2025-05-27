import { useEffect, useState } from "react";
import EquipeForm from "../components/EquipeForm";
import { getEquipes, addEquipe } from "../services/api";
import EquipeCard from "../components/EquipeCard"; // à créer si pas encore fait

export default function EquipesPage() {
  const [equipes, setEquipes] = useState([]);
  const [selectedChampId] = useState(null); // exemple fixe ou récupéré dynamiquement
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEquipes() {
      setLoading(true);
      try {
        const data = await getEquipes(selectedChampId);
        setEquipes(data);
      } catch (err) {
        console.error("Erreur chargement équipes:", err);
      } finally {
        setLoading(false);
      }
    }

    if (selectedChampId) {
      fetchEquipes();
    }
  }, [selectedChampId]);

  async function handleAddEquipe(data) {
    try {
      const newEquipe = await addEquipe(selectedChampId, data);
      setEquipes((prev) => [...prev, newEquipe]);
    } catch {
      alert("Erreur lors de l'ajout");
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Équipes du championnat</h2>

      <EquipeForm onSubmit={handleAddEquipe} />

      {loading ? (
        <p>Chargement des équipes...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {equipes.map((equipe) => (
            <EquipeCard key={equipe._id} equipe={equipe} />
          ))}
        </div>
      )}
    </div>
  );
}
