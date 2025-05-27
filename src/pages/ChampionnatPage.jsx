// src/pages/ChampionnatPage.jsx
import { useEffect, useState } from "react";
import { getChampionnats, addChampionnat } from "../services/api";
import ChampionnatCard from "../components/ChampionnatCard";

export default function ChampionnatPage({ onSelectChampionnat }) {
  const [championnats, setChampionnats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nouveauNom, setNouveauNom] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getChampionnats();
        setChampionnats(data);
      } catch (err) {
        setError("Erreur lors du chargement des championnats");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleAddChampionnat(e) {
    e.preventDefault();
    if (!nouveauNom.trim()) return;

    try {
      const newChamp = await addChampionnat(nouveauNom);
      setChampionnats(prev => [...prev, newChamp]);
      setNouveauNom("");
    } catch {
      alert("Erreur lors de l'ajout");
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Liste des championnats</h2>

      <form onSubmit={handleAddChampionnat} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Nom nouveau championnat"
          value={nouveauNom}
          onChange={e => setNouveauNom(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      {championnats.map(c => (
        <ChampionnatCard
          key={c._id}
          championnat={c}
          onSelect={() => onSelectChampionnat(c)}
        />
      ))}
    </div>
  );
}
