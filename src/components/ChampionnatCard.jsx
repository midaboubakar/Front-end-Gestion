// src/components/ChampionnatCard.jsx
export default function ChampionnatCard({ championnat, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer"
      }}
    >
      <h4>{championnat.nom}</h4>
    </div>
  );
}
