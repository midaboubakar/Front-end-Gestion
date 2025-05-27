import { useState } from "react";

export default function JoueurForm({ onSubmit }) {
  const [nom, setNom] = useState("");
  const [poste, setPoste] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!nom.trim() || !poste.trim()) return;
    onSubmit({ nom, poste });
    setNom("");
    setPoste("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Nom du joueur"
        value={nom}
        onChange={e => setNom(e.target.value)}
        required
        style={{ padding: "0.5rem", marginRight: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Poste"
        value={poste}
        onChange={e => setPoste(e.target.value)}
        required
        style={{ padding: "0.5rem", marginRight: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "6px", backgroundColor: "#007bff", color: "#fff", border: "none" }}>
        Ajouter joueur
      </button>
    </form>
  );
}
