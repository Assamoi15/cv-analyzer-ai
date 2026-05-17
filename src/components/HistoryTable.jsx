function HistoryTable({ history }) {

  return (

    <div className="history-table">

      <h2>Historique Analyses</h2>

      <table>

        <thead>
          <tr>
            <th>Candidat</th>
            <th>Score</th>
            <th>Niveau</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {history.map((item, index) => (

            <tr key={index}>

              <td>{item.name}</td>

              <td>{item.score}</td>

              <td>{item.level}</td>

              <td>{item.date}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default HistoryTable;