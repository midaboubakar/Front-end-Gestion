import { useState } from "react";

export default function EquipeForm({ onSubmit }) {
  const [formData, setFormData] = useState({ nom: "", pays: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom.trim()) return;

    onSubmit(formData);
    setFormData({ nom: "", pays: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        name="nom"
        placeholder="Nom de l'équipe"
        value={formData.nom}
        onChange={handleChange}
        required
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        name="pays"
        placeholder="Pays"
        value={formData.pays}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Ajouter Équipe</button>
    </form>
  );
}
