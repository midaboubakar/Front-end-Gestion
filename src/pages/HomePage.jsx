import { useEffect, useState } from "react";
import { getChampionnats } from "../services/api";
import ChampionnatCard from "../components/ChampionnatCard";

export default function HomePage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getChampionnats().then(setList);
  }, []);

  // 🎨 Styles en ligne
  const styles = {
    container: {
      padding: "1rem",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "1.8rem",
      marginBottom: "1rem",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Championnat(s)</h2>
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
