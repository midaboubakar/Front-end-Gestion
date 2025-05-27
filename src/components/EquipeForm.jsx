import { useState, useEffect } from "react";

export default function EquipeForm({ initialData = {}, onSubmit }) {
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [entraineur, setEntraineur] = useState("");

  useEffect(() => {
    if (initialData) {
      setNom(initialData.nom || "");
      setVille(initialData.ville || "");
      setEntraineur(initialData.entraineur || "");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nom.trim()) {
      alert("Le nom est obligatoire");
      return;
    }

    const formData = { nom, ville, entraineur };
    onSubmit(formData); // Appelle la fonction passée en prop
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>{initialData._id ? "Modifier l'équipe" : "Ajouter une équipe"}</h3>
      <div style={styles.field}>
        <label>Nom de l'équipe:</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>

      <div style={styles.field}>
        <label>Ville:</label>
        <input
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />
      </div>

      <div style={styles.field}>
        <label>Entraîneur:</label>
        <input
          type="text"
          value={entraineur}
          onChange={(e) => setEntraineur(e.target.value)}
        />
      </div>

      <button type="submit" style={styles.button}>
        {initialData._id ? "Mettre à jour" : "Créer"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    maxWidth: "400px",
    background: "#f9f9f9",
  },
  field: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
