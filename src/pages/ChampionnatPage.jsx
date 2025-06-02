import React, { useEffect, useState } from "react";
import { API_URL } from "../components/config";

export default function ChampionnatPage() {
  const [championnats, setChampionnats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchChampionnats = async () => {
      try {
        const response = await fetch(`${API_URL}/championships`);

        if (!response.ok) {
          throw new Error("Erreur réseau : " + response.statusText);
        }

        const data = await response.json();
        setChampionnats(data.slice(0, 5));
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setError("Erreur de chargement des championnats.");
      } finally {
        setLoading(false);
      }
    };

    fetchChampionnats();
  }, []);

  const headerColor = "#1f2e57"; // couleur du header

  const styles = {
    container: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    mainTitle: {
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "1rem",
    },
    subTitle: {
      fontSize: "1.75rem",
      color: "#ddd",
      marginBottom: "2rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      width: "100%",
      maxWidth: "1100px",
    },
    card: {
      padding: "2rem",
      borderRadius: "16px",
      backgroundColor: "#f8f9fa",
      color: "#333",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      fontWeight: 600,
      transition: "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "150px",
    },
    hover: {
      backgroundColor: headerColor,
      color: "#fff",
      transform: "scale(1.05)",
      boxShadow: `0 8px 20px ${headerColor}88`,
    },
    error: {
      color: "#e74c3c",
      fontWeight: "bold",
      textAlign: "center",
      marginTop: "2rem",
    },
    loading: {
      color: "#ccc",
      fontSize: "1.5rem",
      marginTop: "2rem",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.loading}>Chargement en cours...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Championnats</h1>
      <h2 style={styles.subTitle}>🏆 Les 5 principaux championnats</h2>

      <div style={styles.grid}>
        {championnats.map((c, i) => (
          <div
            key={c._id || i}
            style={{
              ...styles.card,
              ...(hoveredIndex === i ? styles.hover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => alert(`Détails du championnat : ${c.nom}`)}
          >
            {c.nom || "Nom indisponible"}
          </div>
        ))}
      </div>
    </div>
  );
}
