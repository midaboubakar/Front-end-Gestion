import { useState } from "react";
import "./EquipeForm.css";

export default function EquipeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nom: "",
    logoUrl: "",
    stade: "",
    dateCreation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.stade || !formData.dateCreation) {
      alert("Merci de remplir tous les champs requis.");
      return;
    }
    onSubmit(formData);
    setFormData({ nom: "", logoUrl: "", stade: "", dateCreation: "" });
  };

  return (
    <form className="equipe-form" onSubmit={handleSubmit}>
      <h3>➕ Ajouter une équipe</h3>
      <input
        type="text"
        name="nom"
        placeholder="Nom de l'équipe"
        value={formData.nom}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="logoUrl"
        placeholder="URL du logo"
        value={formData.logoUrl}
        onChange={handleChange}
      />
      <input
        type="text"
        name="stade"
        placeholder="Nom du stade"
        value={formData.stade}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dateCreation"
        value={formData.dateCreation}
        onChange={handleChange}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
