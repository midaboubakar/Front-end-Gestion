import { useEffect, useState } from "react";
import { getChampionnats, getClassement } from "../services/api";

export default function ClassementsPage() {
  const [championnats, setChampionnats] = useState([]);
  const [selectedChampionnatId, setSelectedChampionnatId] = useState("");
  const [classement, setClassement] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchChampionnats() {
      try {
        const data = await getChampionnats();
        setChampionnats(data.slice(0, 5));
      } catch (err) {
        setError("Erreur de chargement des championnats");
      }
    }
    fetchChampionnats();
  }, []);

  useEffect(() => {
    if (!selectedChampionnatId) return;
    async function fetchClassement() {
      setLoading(true);
      try {
        const data = await getClassement(selectedChampionnatId);
        setClassement(data);
        setError("");
      } catch {
        setError("Erreur lors du chargement du classement");
      } finally {
        setLoading(false);
      }
    }
    fetchClassement();
  }, [selectedChampionnatId]);

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "960px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    select: {
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "1px solid #ccc",
    },
    tableWrapper: {
      width: "100%",
      overflowX: "auto",
      marginTop: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#f1f1f1",
      padding: "12px",
      fontWeight: "bold",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #eee",
    },
    error: {
      color: "#e74c3c",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Classements</h2>

      <select
        value={selectedChampionnatId}
        onChange={(e) => setSelectedChampionnatId(e.target.value)}
        style={styles.select}
      >
        <option value="">-- Sélectionner un championnat --</option>
        {championnats.map((c) => (
          <option key={c._id} value={c._id}>
            {c.nom}
          </option>
        ))}
      </select>

      {loading && <p>Chargement du classement...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {classement.length > 0 && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Position</th>
                <th style={styles.th}>Équipe</th>
                <th style={styles.th}>Points</th>
                <th style={styles.th}>Matchs joués</th>
                <th style={styles.th}>Victoires</th>
                <th style={styles.th}>Défaites</th>
                <th style={styles.th}>Nuls</th>
                <th style={styles.th}>Diff. de buts</th>
              </tr>
            </thead>
            <tbody>
              {classement.map((equipe, index) => (
                <tr key={equipe.equipeId}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{equipe.nom}</td>
                  <td style={styles.td}>{equipe.points}</td>
                  <td style={styles.td}>{equipe.matchsJoues}</td>
                  <td style={styles.td}>{equipe.victoires}</td>
                  <td style={styles.td}>{equipe.defaites}</td>
                  <td style={styles.td}>{equipe.nuls}</td>
                  <td style={styles.td}>{equipe.diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
