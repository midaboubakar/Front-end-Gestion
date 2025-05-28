export default function EquipeCard({ equipe }) {
  const styles = {
    card: {
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "1rem",
      backgroundColor: "white",
      width: "200px",
      boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
    },
    cardHover: {
      transform: "scale(1.05)",
    },
    title: {
      fontSize: "1.2rem",
      margin: "0 0 0.5rem 0",
    },
    info: {
      margin: "0.2rem 0",
    }
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={styles.title}>{equipe.nom}</h3>
      <p style={styles.info}>Ville : {equipe.ville}</p>
      {/* Ajoute d'autres infos si nécessaire */}
    </div>
  );
}
