import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchs, addMatch } from "../services/api";

export default function MatchsPage() {
  const { id } = useParams();
  const [matchs, setMatchs] = useState([]);
  const [newMatch, setNewMatch] = useState({ equipeA: "", equipeB: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMatchs = async () => {
      setLoading(true);
      try {
        const data = await getMatchs(id);
        setMatchs(data);
      } catch (err) {
        setError("Erreur lors de la récupération des matchs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchs();
  }, [id]);

  const handleAdd = async () => {
    if (!newMatch.equipeA.trim() || !newMatch.equipeB.trim() || !newMatch.date.trim()) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addMatch(id, newMatch);
      const refreshed = await getMatchs(id);
      setMatchs(refreshed);
      setNewMatch({ equipeA: "", equipeB: "", date: "" });
      setSuccess(true);
    } catch (err) {
      setError("Erreur lors de l'ajout du match.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Matchs</h2>
      {loading && <p aria-live="polite">Chargement en cours...</p>}
      {error && <p style={{ color: 'red' }} aria-live="assertive">{error}</p>}
      {success && <p style={{ color: 'green' }} aria-live="polite">Match ajouté avec succès !</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {matchs.map((m, i) => (
          <li key={i} style={{ padding: '8px', margin: '4px 0', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            {m.equipeA} vs {m.equipeB} - {new Date(m.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <input
          placeholder="Équipe A"
          value={newMatch.equipeA}
          onChange={e => setNewMatch({ ...newMatch, equipeA: e.target.value })}
          style={{ padding: '8px', marginRight: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          aria-label="Équipe A"
        />
        <input
          placeholder="Équipe B"
          value={newMatch.equipeB}
          onChange={e => setNewMatch({ ...newMatch, equipeB: e.target.value })}
          style={{ padding: '8px', marginRight: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          aria-label="Équipe B"
        />
        <input
          type="date"
          value={newMatch.date}
          onChange={e => setNewMatch({ ...newMatch, date: e.target.value })}
          style={{ padding: '8px', marginRight: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          aria-label="Date du match"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          aria-label="Ajouter match"
        >
          {loading ? 'Ajout en cours...' : 'Ajouter match'}
        </button>
      </div>
    </div>
  );
}
