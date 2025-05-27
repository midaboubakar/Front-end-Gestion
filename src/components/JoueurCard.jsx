export default function JoueurCard({ joueur }) {
  return (
    <div style={styles.card}>
      <h4 style={styles.nom}>{joueur.nom}</h4>
      <p style={styles.poste}>Poste : {joueur.poste || "N/A"}</p>
    </div>
  );
}

const styles = {
  card: {
    padding: "0.8rem",
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  nom: {
    margin: 0,
    fontSize: "1.1rem",
    color: "#333",
  },
  poste: {
    margin: "0.4rem 0 0",
    color: "#666",
    fontSize: "0.9rem",
  },
};
