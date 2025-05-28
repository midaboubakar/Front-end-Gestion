import React, { useEffect, useState } from "react";
import { getChampionnats } from "../services/api";

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    color: '#333',
  },
  h2: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#4a6fa5',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    padding: '12px 16px',
    marginBottom: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  listItemHover: {
    backgroundColor: '#e9ecef',
  },
};

function ChampionnatPage() {
  const [championnats, setChampionnats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null); // pour gérer l'hover

  useEffect(() => {
    getChampionnats()
      .then(data => {
        setChampionnats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur de chargement :", err);
        setError("Erreur de chargement des championnats");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.container}>Chargement en cours...</div>;
  if (error) return <div style={styles.container}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Liste des championnats</h2>
      <ul style={styles.list}>
        {championnats.length > 0 ? (
          championnats.map((c, i) => (
            <li
              key={c.id}
              style={{
                ...styles.listItem,
                backgroundColor: hoveredIndex === i ? styles.listItemHover.backgroundColor : styles.listItem.backgroundColor,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {c.nom}
            </li>
          ))
        ) : (
          <p>Aucun championnat trouvé.</p>
        )}
      </ul>
    </div>
  );
}

export default ChampionnatPage;
