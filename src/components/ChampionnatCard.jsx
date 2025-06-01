// ChampionnatCard.jsx
export default function ChampionnatCard({ championnat, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "1rem",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ fontSize: "1.2rem", color: "#333" }}>{championnat.nom}</h3>
    </div>
  );
}
