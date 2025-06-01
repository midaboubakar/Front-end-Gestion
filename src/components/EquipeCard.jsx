import "./EquipeCard.css";

export default function EquipeCard({ equipe }) {
  return (
    <div className="equipe-card">
      <img
        src={equipe.logoUrl || "/placeholder-logo.png"}
        alt={`Logo de ${equipe.nom}`}
        className="equipe-logo"
      />
      <h3 className="equipe-nom">{equipe.nom}</h3>
      <p className="equipe-stade">🏟️ {equipe.stade}</p>
      <p className="equipe-date">📅 Créée le : {new Date(equipe.dateCreation).toLocaleDateString()}</p>
    </div>
  );
}
