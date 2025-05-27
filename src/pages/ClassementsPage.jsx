import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassement } from "../services/api";

export default function ClassementsPage() {
  const { id } = useParams();
  const [classement, setClassement] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassement = async () => {
      setLoading(true);
      try {
        const data = await getClassement(id);
        setClassement(data);
      } catch (err) {
        setError("Erreur lors de la récupération du classement.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassement();
  }, [id]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Classement</h2>
      {loading && <p aria-live="polite">Chargement en cours...</p>}
      {error && <p style={{ color: 'red' }} aria-live="assertive">{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Équipe</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Points</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>V</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>D</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>N</th>
          </tr>
        </thead>
        <tbody>
          {classement.map((equipe, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{equipe.nom}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{equipe.points}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{equipe.victoires}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{equipe.defaites}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{equipe.nuls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
