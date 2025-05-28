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
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>
        {initialData._id ? "Modifier l'équipe" : "Ajouter une équipe"}
      </h3>

      <div style={styles.field}>
        <label style={styles.label}>Nom de l'équipe:</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Ville:</label>
        <input
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Entraîneur:</label>
        <input
          type="text"
          value={entraineur}
          onChange={(e) => setEntraineur(e.target.value)}
          style={styles.input}
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
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "2rem",
    borderRadius: "12px",
    marginBottom: "2rem",
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "transparent",
    color: "#fff",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    margin: "0 auto",
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  field: {
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
  },
  input: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "0.75rem",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  button: {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "1rem 2rem",          // ↑ plus de hauteur et largeur
  fontSize: "1.1rem",            // ↑ texte plus lisible
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  alignSelf: "center",           // ← centré horizontalement
  width: "80%",                  // ← large mais pas 100%
  maxWidth: "300px",             // ← limite la taille sur grands écrans
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)", // ombre douce
  transition: "background 0.3s",
  },
};
