import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJoueurs, addJoueur } from "../services/api";

export default function JoueursPage() {
  const { id } = useParams(); // id de l'équipe
  const [joueurs, setJoueurs] = useState([]);
  const [nom, setNom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchJoueurs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getJoueurs(id);
        setJoueurs(data);
      } catch (err) {
        setError("Erreur lors de la récupération des joueurs. Veuillez réessayer plus tard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJoueurs();
  }, [id]);

  const handleAdd = async () => {
    if (!nom.trim()) {
      setError("Le nom du joueur ne peut pas être vide.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addJoueur(id, { nom });
      const refreshed = await getJoueurs(id);
      setJoueurs(refreshed);
      setNom("");
      setSuccess(true);
    } catch (err) {
      setError("Erreur lors de l'ajout du joueur. Veuillez réessayer plus tard.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Joueurs</h2>
      {loading && <p aria-live="polite">Chargement en cours...</p>}
      {error && <p style={{ color: 'red' }} aria-live="assertive">{error}</p>}
      {success && <p style={{ color: 'green' }} aria-live="polite">Joueur ajouté avec succès !</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {joueurs.map(j => (
          <li key={j._id} style={{ padding: '8px', margin: '4px 0', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            {j.nom}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <input
          value={nom}
          onChange={e => setNom(e.target.value)}
          placeholder="Nom joueur"
          style={{ padding: '8px', marginRight: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          aria-label="Nom du joueur"
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
          aria-label="Ajouter joueur"
        >
          {loading ? 'Ajout en cours...' : 'Ajouter joueur'}
        </button>
      </div>
    </div>
  );
}
