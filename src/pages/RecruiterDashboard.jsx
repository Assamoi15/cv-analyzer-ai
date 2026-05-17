import { useEffect, useState } from "react";
import StatsCards from "../components/StatsCards";
import ScoreChart from "../components/ScoreChart";
import { Link } from "react-router-dom";
import { ArrowRight, BrainCircuit, Users } from "lucide-react";
import API from "../services/api";

function RecruiterDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/stats")
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error("Dashboard data load failed:", err);
        setStats({});
      });
  }, []);

  if (!stats) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner" />
        <p>Synchronisation des données...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* ── Header ── */}
        <div className="header-row">
          <div className="page-header">
            <h1>Vue d'ensemble</h1>
            <p>Indicateurs globaux et santé du pipeline de talents</p>
          </div>
          <div className="header-badge">
            <span className="dot animate-pulse" style={{ width: '8px', height: '8px', background: '#12b76a', borderRadius: '50%' }}></span>
            Temps réel
          </div>
        </div>

      {/* ── KPIs ── */}
      <StatsCards stats={stats} />

      {/* ── Main Chart ── */}
      <div className="chart-card">
        <h2>Évolution du Recrutement</h2>
        <ScoreChart history={stats.history ?? []} />
      </div>

      {/* ── Shortcuts ── */}
      <div className="dashboard-shortcuts">
        <Link to="/recruiter/toolkit" className="shortcut-card">
          <div className="shortcut-icon"><BrainCircuit size={20} /></div>
          <div className="shortcut-info">
            <h3>Outils IA</h3>
            <p>Accéder aux outils de matching avancés</p>
          </div>
          <ArrowRight size={18} />
        </Link>

        <Link to="/recruiter/candidates" className="shortcut-card">
          <div className="shortcut-icon"><Users size={20} /></div>
          <div className="shortcut-info">
            <h3>Bassin de Talents</h3>
            <p>Consulter et filtrer vos candidats</p>
          </div>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default RecruiterDashboard;