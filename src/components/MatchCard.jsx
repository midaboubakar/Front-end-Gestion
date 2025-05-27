export default function MatchCard({ match }) {
  return (
    <div
      style={{
        padding: "0.5rem 1rem",
        marginBottom: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "#fafafa",
      }}
    >
      <div>
        <strong>{match.equipeDomicile.nom}</strong> vs <strong>{match.equipeVisiteur.nom}</strong>
      </div>
      <div>
        Résultat : {match.scoreDomicile} - {match.scoreVisiteur}
      </div>
      <div>Journée : {match.journee}</div>
    </div>
  );
}
