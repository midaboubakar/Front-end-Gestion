export default function ClassementTable({ classement }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>Position</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>Équipe</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>Points</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>V</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>N</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>D</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>BP</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>BC</th>
        </tr>
      </thead>
      <tbody>
        {classement.map((equipe, i) => (
          <tr key={equipe._id} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
            <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{i + 1}</td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{equipe.nom}</td>
            <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{equipe.points}</td>
            <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{equipe.victoires}</td>
            <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{equipe.nuls}</td>
            <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{equipe.defaites}</td>
            <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{equipe.butsPour}</td>
            <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{equipe.butsContre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
