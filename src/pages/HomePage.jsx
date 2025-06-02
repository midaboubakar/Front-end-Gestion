import { useEffect, useState } from "react";
import { getChampionnats } from "../services/api";
import ChampionnatCard from "../components/ChampionnatCard";

export default function HomePage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getChampionnats().then(setList);
  }, []);

  const styles = {
    container: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', sans-serif",
      textAlign: "center",
    },
    title: {
      fontSize: "2.8rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      color: "#fff",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
    },
    cardWrapper: {
      backgroundColor: "#f8f9fa",
      borderRadius: "16px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "scale(1.03)",
      backgroundColor: "#e9ecef",
    },
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Liste des Championnats</h2>
      <div style={styles.grid}>
        {list.map((c, i) => (
          <div
            key={c._id}
            style={{
              ...styles.cardWrapper,
              ...(hoveredIndex === i ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => alert("Voir détails du championnat")}
          >
            <ChampionnatCard championnat={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
