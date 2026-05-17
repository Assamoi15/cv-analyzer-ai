import { useEffect, useState } from "react";
import API from "../services/api";

function TopCandidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    API.get("/top-candidates")
      .then(res => setCandidates(res.data))
      .catch(err => console.error("Top candidates error:", err));
  }, []);

  return (
    <div className="top-card bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
        <h2 className="text-base font-bold text-slate-800">Candidats à Fort Potentiel</h2>
        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 text-indigo-600 rounded-md">ALPHA VERSION</span>
      </div>

      <div className="candidate-list divide-y divide-slate-50 px-2">
        {candidates.map((c, i) => {
          const initials = c.candidate_name ? c.candidate_name.split(' ').map(n => n[0]).join('').toUpperCase() : "??";
          return (
            <div key={i} className="candidate-item flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="candidate-rank text-xs font-bold text-slate-400 w-4">0{i + 1}</div>
              <div className="candidate-avatar h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-4 ring-slate-50">{initials}</div>
              <div className="candidate-info flex-1">
                <h4 className="text-sm font-bold text-slate-900 leading-none mb-1">{c.candidate_name}</h4>
                <p className="text-xs text-slate-500 font-medium">{c.level === 'Senior' ? 'Expert Sénior' : c.level} <span className="mx-1.5 opacity-50">•</span> {c.skills?.slice(0, 2).join(", ")}</p>
              </div>
              <div className="candidate-score px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-extrabold ring-1 ring-inset ring-indigo-700/10">{c.score}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopCandidates;