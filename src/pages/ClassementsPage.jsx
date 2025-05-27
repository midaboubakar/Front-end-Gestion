// src/pages/ClassementsPage.jsx
import { useEffect, useState } from "react";
import { getChampionnats, getClassement } from "../services/api";

export default function ClassementsPage() {
  const [championnats, setChampionnats] = useState([]);
  const [selectedChampionnatId, setSelectedChampionnatId] = useState("");
  const [classement, setClassement] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charger la liste des championnats au montage
  useEffect(() => {
    async function fetchChampionnats() {
      try {
        const data = await getChampionnats();
        setChampionnats(data);
      } catch (err) {
        setError("Erreur de chargement des championnats");
      }
    }
    fetchChampionnats();
  }, []);

  // Charger le classement quand un championnat est sélectionné
  useEffect(() => {
    if (!selectedChampionnatId) return;
    async function fetchClassement() {
      setLoading(true);
      try {
        const data = await getClassement(selectedChampionnatId);
        setClassement(data);
        setError("");
      } catch {
        setError("Erreur lors du chargement du classement");
      } finally {
        setLoading(false);
      }
    }
    fetchClassement();
  }, [selectedChampionnatId]);

  return (
    <div>
      <h2>Classements</h2>

      {/* Sélection d’un championnat */}
      <label>
        Choisir un championnat :
        <select
          value={selectedChampionnatId}
          onChange={(e) => setSelectedChampionnatId(e.target.value)}
        >
          <option value="">-- Sélectionner --</option>
          {championnats.map((c) => (
            <option key={c._id} value={c._id}>
              {c.nom}
            </option>
          ))}
        </select>
      </label>

      {loading && <p>Chargement du classement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Affichage du classement */}
      {classement.length > 0 && (
        <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Équipe</th>
              <th>Points</th>
              <th>Matchs joués</th>
              <th>Victoires</th>
              <th>Défaites</th>
              <th>Nuls</th>
              <th>Différence de buts</th>
            </tr>
          </thead>
          <tbody>
            {classement.map((equipe, index) => (
              <tr key={equipe.equipeId}>
                <td>{index + 1}</td>
                <td>{equipe.nom}</td>
                <td>{equipe.points}</td>
                <td>{equipe.matchsJoues}</td>
                <td>{equipe.victoires}</td>
                <td>{equipe.defaites}</td>
                <td>{equipe.nuls}</td>
                <td>{equipe.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
