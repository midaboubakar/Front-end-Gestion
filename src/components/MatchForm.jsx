import { useState } from "react";

export default function MatchForm({ equipes, onSubmit }) {
  const [domicile, setDomicile] = useState("");
  const [visiteur, setVisiteur] = useState("");
  const [scoreDomicile, setScoreDomicile] = useState("");
  const [scoreVisiteur, setScoreVisiteur] = useState("");
  const [journee, setJournee] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!domicile || !visiteur || !journee) return;
    if (domicile === visiteur) {
      alert("Une équipe ne peut pas jouer contre elle-même");
      return;
    }
    onSubmit({
      equipeDomicileId: domicile,
      equipeVisiteurId: visiteur,
      scoreDomicile: Number(scoreDomicile),
      scoreVisiteur: Number(scoreVisiteur),
      journee,
    });
    setDomicile("");
    setVisiteur("");
    setScoreDomicile("");
    setScoreVisiteur("");
    setJournee("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <select value={domicile} onChange={e => setDomicile(e.target.value)} required style={{ marginRight: "0.5rem", padding: "0.5rem", borderRadius: "6px" }}>
        <option value="">Équipe domicile</option>
        {equipes.map(e => (
          <option key={e._id} value={e._id}>{e.nom}</option>
        ))}
      </select>

      <select value={visiteur} onChange={e => setVisiteur(e.target.value)} required style={{ marginRight: "0.5rem", padding: "0.5rem", borderRadius: "6px" }}>
        <option value="">Équipe visiteur</option>
        {equipes.map(e => (
          <option key={e._id} value={e._id}>{e.nom}</option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        placeholder="Score domicile"
        value={scoreDomicile}
        onChange={e => setScoreDomicile(e.target.value)}
        required
        style={{ width: "100px", marginRight: "0.5rem", padding: "0.5rem", borderRadius: "6px" }}
      />

      <input
        type="number"
        min="0"
        placeholder="Score visiteur"
        value={scoreVisiteur}
        onChange={e => setScoreVisiteur(e.target.value)}
        required
        style={{ width: "100px", marginRight: "0.5rem", padding: "0.5rem", borderRadius: "6px" }}
      />

      <input
        type="text"
        placeholder="Journée"
        value={journee}
        onChange={e => setJournee(e.target.value)}
        required
        style={{ width: "100px", marginRight: "0.5rem", padding: "0.5rem", borderRadius: "6px" }}
      />

      <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "6px", backgroundColor: "#007bff", color: "#fff", border: "none" }}>
        Ajouter match
      </button>
    </form>
  );
}
