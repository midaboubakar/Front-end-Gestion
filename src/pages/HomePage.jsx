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
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', sans-serif",
      textAlign: "center",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      //color: "#4a6fa5",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1.5rem",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Liste des Championnats</h2>
      <div style={styles.grid}>
        {list.map((c) => (
          <ChampionnatCard
            key={c._id}
            championnat={c}
            onClick={() => alert("Voir détails du championnat")}
          />
        ))}
      </div>
    </div>
  );
}
