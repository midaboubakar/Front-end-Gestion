import { useState, useEffect } from "react";
import { getEquipes, addEquipe } from "../services/api";
import EquipeCard from "../components/EquipeCard";
import EquipeForm from "../components/EquipeForm";

export default function EquipePage({ championnatId }) {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const data = await getEquipes(championnatId);
        setEquipes(data);
      } catch {
        setError("Erreur chargement équipes");
      } finally {
        setLoading(false);
      }
    }
    if (championnatId) fetch();
  }, [championnatId]);

  async function handleAddEquipe(data) {
    try {
      const newEquipe = await addEquipe(championnatId, data);
      setEquipes(prev => [...prev, newEquipe]);
    } catch {
      alert("Erreur ajout équipe");
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Équipes</h2>
      <EquipeForm onSubmit={handleAddEquipe} />
      {equipes.map(e => (
        <EquipeCard key={e._id} equipe={e} />
      ))}
    </div>
  );
}
