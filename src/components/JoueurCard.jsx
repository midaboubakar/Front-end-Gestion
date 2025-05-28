export default function JoueurCard({ joueur }) {
  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "1rem",
      width: "200px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
    },
    name: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    info: {
      fontSize: "0.9rem",
      color: "#555",
    }
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={styles.name}>{joueur.nom}</div>
      <div style={styles.info}>Âge : {joueur.age}</div>
      <div style={styles.info}>Poste : {joueur.poste}</div>
    </div>
  );
}
