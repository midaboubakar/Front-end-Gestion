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
        setError("Erreur de chargement des championnats.");
      }
    }
    fetchChampionnats();
  }, []);

  useEffect(() => {
    if (!selectedChampionnatId) {
      setClassement([]);
      return;
    }
    async function fetchClassement() {
      setLoading(true);
      setError("");
      try {
        const data = await getClassement(selectedChampionnatId);
        setClassement(data);
      } catch {
        setError("Erreur lors du chargement du classement.");
      } finally {
        setLoading(false);
      }
    }
    fetchClassement();
  }, [selectedChampionnatId]);

  const headerColor = "#1f2e57";

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "960px",
      margin: "2rem auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      //backgroundColor: "#121212",
      color: "#fff",
      borderRadius: "16px",
    },
    title: {
      fontSize: "2.25rem",
      fontWeight: "700",
      color: "#fff",
    },
    label: {
      alignSelf: "flex-start",
      marginBottom: "0.25rem",
      fontWeight: "600",
      color: "#fff",
      fontSize: "1rem",
    },
    select: {
      padding: "0.6rem 1rem",
      fontSize: "1rem",
      borderRadius: "8px",
      border: `1.5px solid ${headerColor}`,
      backgroundColor: "#1c1c1c",
      color: "#fff",
      outline: "none",
      width: "100%",
      maxWidth: "320px",
      marginBottom: "1rem",
    },
    tableWrapper: {
      width: "100%",
      overflowX: "auto",
      marginTop: "1rem",
      borderRadius: "12px",
      boxShadow: "0 4px 14px rgba(255,255,255,0.05)",
      backgroundColor: "#1c1c1c",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "600px",
      color: "#fff",
    },
    th: {
      backgroundColor: headerColor,
      color: "#fff",
      padding: "12px 15px",
      fontWeight: "700",
      borderBottom: "2px solid #31437d",
      textAlign: "left",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #2a2a2a",
      color: "#eee",
    },
    trHover: {
      backgroundColor: "#2c2c2c",
      transition: "background-color 0.3s",
    },
    error: {
      color: "#e74c3c",
      fontWeight: "700",
    },
    loading: {
      fontSize: "1.2rem",
      color: "#aaa",
      fontWeight: "600",
    },
    emptyMsg: {
      fontSize: "1rem",
      color: "#888",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Classements</h2>

      <label htmlFor="championnat-select" style={styles.label}>
        Sélectionnez un championnat :
      </label>
      <select
        id="championnat-select"
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

      {loading && <p style={styles.loading}>Chargement du classement...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && classement.length === 0 && selectedChampionnatId && !error && (
        <p style={styles.emptyMsg}>Aucun classement disponible pour ce championnat.</p>
      )}

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
                <tr
                  key={equipe.equipeId || index}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a2a2a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
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
