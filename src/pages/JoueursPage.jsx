import { useEffect, useState } from "react";
import { getJoueurs } from "../services/api";
import JoueurCard from "../components/JoueurCard";

export default function JoueursPage({ equipeId }) {
  const [joueurs, setJoueurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!equipeId) return; // Pas d'équipe sélectionnée

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

  if (!equipeId) return <p>Sélectionnez une équipe pour voir ses joueurs.</p>;
  if (loading) return <p>Chargement des joueurs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Joueurs de l'équipe</h2>
      {joueurs.length === 0 ? (
        <p>Aucun joueur trouvé.</p>
      ) : (
        joueurs.map(joueur => <JoueurCard key={joueur._id} joueur={joueur} />)
      )}
    </div>
  );
}
