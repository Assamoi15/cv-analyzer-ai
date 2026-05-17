import { FileText, Star, Trophy, MessageSquare } from "lucide-react";
import "../../src/dashboard.css";

function StatsCards({ stats }) {

  const cards = [
    {
      icon: <FileText size={20} />,
      colorClass: "blue",
      label: "Total CVs",
      value: stats?.total_cv ?? 124,
      trend: "+12 cette semaine",
    },
    {
      icon: <Star size={20} />,
      colorClass: "cyan",
      label: "Score Moyen",
      value: `${Number(stats?.average_score ?? 87).toFixed(0)}%`,
      trend: "+3% vs mois dernier",
    },
    {
      icon: <Trophy size={20} />,
      colorClass: "green",
      label: "Candidat Top",
      value: stats?.senior_count ?? 18,
      trend: "Prêt pour entretien",
    },
    {
      icon: <MessageSquare size={20} />,
      colorClass: "rose",
      label: "Entretiens",
      value: 42,
      trend: "8 prévus aujourd'hui",
    },
  ];

  return (
    <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.label} className="stat-card bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className={`stat-card-icon h-12 w-12 rounded-2xl flex items-center justify-center mb-4 shadow-inner ${card.colorClass}`}>
            {card.icon}
          </div>
          <h3 className="text-sm font-semibold text-slate-500 tracking-tight">{card.label}</h3>
          <p className="text-2xl font-extrabold text-slate-900 my-1">{card.value}</p>
          <div className="stat-card-trend text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            {card.trend}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
