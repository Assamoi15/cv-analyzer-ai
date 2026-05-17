function StatsCards({ stats }) {

  return (

    <div className="stats-grid">

      <div className="stat-card">
        <h3>Total CV</h3>
        <p>{stats.total_cv}</p>
      </div>

      <div className="stat-card">
        <h3>Average Score</h3>
        <p>{stats.average_score}</p>
      </div>

      <div className="stat-card">
        <h3>Seniors</h3>
        <p>{stats.senior_count}</p>
      </div>

    </div>
  );
}

export default StatsCards;