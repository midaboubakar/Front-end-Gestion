// src/components/EquipeCard.jsx

export default function EquipeCard({ equipe, onClick }) {
  return (
    <div style={styles.card} onClick={() => onClick?.(equipe)}>
      <h3 style={styles.nom}>{equipe.nom}</h3>
      <p><strong>Ville :</strong> {equipe.ville || "Inconnue"}</p>
      <p><strong>Entraîneur :</strong> {equipe.entraineur || "Non renseigné"}</p>
      {/* Ajoute d'autres champs si nécessaires */}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    background: "#f8f9fa",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  nom: {
    marginBottom: "0.5rem",
    color: "#2c3e50",
  },
};
