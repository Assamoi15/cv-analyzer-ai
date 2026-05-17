function DashboardAnalytics({ stats }) {
  if (!stats) return null;

  return (
    <div className="analytics-grid">
      <div className="analytics-card">

        <h3>📊 Total CV</h3>
        <p>{stats.total_cv}</p>
      </div>

      <div className="analytics-card">
        <h3>📈 Score Moyen</h3>
        <p>{Number(stats.average_score || 0).toFixed(1)}%</p>
      </div>

      <div className="analytics-card">
        <h3>👔 Seniors</h3>
        <p>{stats.senior_count || stats.seniors || 0}</p>
      </div>

      <div className="analytics-card">
        <h3>👨‍💼 Mid-Level</h3>
        <p>{stats.mid_levels || 0}</p>
      </div>

      <div className="analytics-card">
        <h3>🌱 Juniors</h3>
        <p>{stats.juniors || 0}</p>
      </div>
    </div>
  );
}

export default DashboardAnalytics;