import React, { useEffect, useState } from "react";
import { getChampionnats } from "../services/api";

export default function ChampionnatPage() {
  const [championnats, setChampionnats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    getChampionnats()
      .then((data) => {
        setChampionnats(data.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement :", err);
        setError("Erreur de chargement des championnats.");
        setLoading(false);
      });
  }, []);

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "800px",
      margin: "2rem auto",
      borderRadius: "16px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: "100vh",
      //backgroundColor: "#1f2937", // ✅ fond foncé pour texte blanc
      color: "#fff",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", // ✅ même style que les autres pages
    },
    mainTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#fff",
      marginBottom: "1rem",
    },
    subTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#f1f1f1",
      marginBottom: "1.5rem",
    },
    list: {
      width: "100%",
      listStyle: "none",
      padding: 0,
    },
    listItem: {
      padding: "1rem",
      marginBottom: "1rem",
      borderRadius: "10px",
      backgroundColor: "#f8f9fa",
      color: "#333",
      boxShadow: "inset 0 0 5px rgba(0,0,0,0.05)",
      cursor: "pointer",
      fontWeight: 600,
      transition: "background-color 0.3s",
      textAlign: "center",
    },
    hover: {
      backgroundColor: "#e9ecef",
    },
    error: {
      color: "#e74c3c",
      fontWeight: "bold",
    },
  };

  if (loading) return <div style={styles.container}>Chargement en cours...</div>;
  if (error)
    return (
      <div style={styles.container}>
        <p style={styles.error}>{error}</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Championnats</h1>
      <h2 style={styles.subTitle}>🏆 Liste des championnats</h2>

      <ul style={styles.list}>
        {championnats.map((c, i) => (
          <li
            key={c._id}
            style={{
              ...styles.listItem,
              ...(hoveredIndex === i ? styles.hover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {c.nom}
          </li>
        ))}
      </ul>
    </div>
  );
}
