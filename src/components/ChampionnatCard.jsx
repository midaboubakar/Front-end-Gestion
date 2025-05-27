// src/components/ChampionnatCard.jsx
import React from "react";

export default function ChampionnatCard({ championnat }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{championnat.nom}</h3>
      <p>ID: {championnat._id}</p>
    </div>
  );
}
