export default function JoueurCard({ joueur }) {
  return (
    <div
      style={{
        padding: "0.6rem",
        marginBottom: "0.4rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#fefefe",
      }}
    >
      <strong>{joueur.nom}</strong> - {joueur.poste}
    </div>
  );
}
