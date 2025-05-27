import React from "react";

export default function EquipeCard({ equipe }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "12px",
      width: "200px",
      backgroundColor: "#f2f2f2"
    }}>
      <h3 style={{ marginBottom: "8px" }}>{equipe.nom}</h3>
      <p><strong>Pays :</strong> {equipe.pays || "Non spécifié"}</p>
    </div>
  );
}
