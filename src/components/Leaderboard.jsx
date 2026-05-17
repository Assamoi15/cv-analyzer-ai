function Leaderboard({ history }) {

  const sorted = [...history]

    .sort((a, b) =>
      b.score - a.score
    )

    .slice(0, 5);

  return (

    <div className="leaderboard">

      <h2>Top Candidats</h2>

      {sorted.map((item, index) => (

        <div
          key={index}
          className="leader-item"
        >

          <span>
            #{index + 1} {item.name}
          </span>

          <strong>
            {item.score}
          </strong>

        </div>
      ))}

    </div>
  );
}

export default Leaderboard;