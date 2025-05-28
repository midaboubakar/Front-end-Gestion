export default function ClassementTable({ classement }) {
  const tableWrapperStyle = {
    overflowX: "auto",
    margin: "1rem auto",  // <-- centrage horizontal ici
    maxWidth: "900px",    // Optionnel : limite la largeur max pour un joli rendu
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
    fontSize: "0.9rem",
  };

  const thStyle = {
    padding: "8px",
    border: "1px solid #ddd",
    textAlign: "center",
    backgroundColor: "#007bff",
    color: "white",
  };

  const tdStyle = {
    padding: "8px",
    border: "1px solid #ddd",
    textAlign: "center",
  };

  const firstColumnTdStyle = {
    ...tdStyle,
    width: "60px",
  };

  const teamNameTdStyle = {
    ...tdStyle,
    textAlign: "left",
  };

  return (
    <div style={tableWrapperStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Position</th>
            <th style={thStyle}>Équipe</th>
            <th style={thStyle}>Points</th>
            <th style={thStyle}>V</th>
            <th style={thStyle}>N</th>
            <th style={thStyle}>D</th>
            <th style={thStyle}>BP</th>
            <th style={thStyle}>BC</th>
          </tr>
        </thead>
        <tbody>
          {classement.map((equipe, i) => {
            const rowStyle = {
              backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white",
              cursor: "default",
            };
            return (
              <tr key={equipe._id} style={rowStyle}>
                <td style={firstColumnTdStyle}>{i + 1}</td>
                <td style={teamNameTdStyle}>{equipe.nom}</td>
                <td style={tdStyle}>{equipe.points}</td>
                <td style={tdStyle}>{equipe.victoires}</td>
                <td style={tdStyle}>{equipe.nuls}</td>
                <td style={tdStyle}>{equipe.defaites}</td>
                <td style={tdStyle}>{equipe.butsPour}</td>
                <td style={tdStyle}>{equipe.butsContre}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
