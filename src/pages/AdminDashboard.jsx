import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";
import ScoreChart from "../components/ScoreChart";
import TopCandidates from "../components/TopCandidates";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Stats error:", err));

    API.get("/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Users error:", err));
  }, []);

  if (!stats) return <p>Chargement...</p>;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <div className="header-row">
          <div className="page-header">
            <h1>👑 Dashboard Admin</h1>
            <p>Supervision globale de la plateforme IA RH</p>
          </div>
          <div className="header-badge">Mode Admin</div>
        </div>

        <StatsCards stats={stats} />

        <div className="chart-card">
          <h2>Analyses Globales</h2>
          <ScoreChart history={stats.history ?? []} />
        </div>

        <div className="admin-grid">
          <div className="admin-card">
            <h2>👥 Utilisateurs Plateforme</h2>
            <div className="user-list">
              {users.map((u, i) => (
                <div key={i} className="user-item">
                  <div>
                    <h4>{u.username}</h4>
                    <p>{u.email || "utilisateur@enterprise.ai"}</p>
                  </div>
                  <span className={`role-badge ${u.role}`}>
                    {u.role === 'admin' ? 'Administrateur' : 'Recruteur'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <TopCandidates />
        </div>

        <div className="platform-card">
          <h2>🚀 État du Système</h2>
          <div className="platform-grid">
            <div className="platform-item">
              <h3>Statut API</h3>
              <p>✅ En ligne</p>
            </div>
            <div className="platform-item">
              <h3>Moteur IA</h3>
              <p>✅ Optimal</p>
            </div>
            <div className="platform-item">
              <h3>Base de données</h3>
              <p>✅ Connectée</p>
            </div>
            <div className="platform-item">
              <h3>Volume Ops</h3>
              <p>{stats.total_cv} analyses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;