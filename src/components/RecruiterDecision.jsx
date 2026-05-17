import { useState } from "react";
import { BrainCircuit, Send, CheckCircle, XCircle, Clock } from "lucide-react";
import API from "../services/api";

function RecruiterDecision() {
  const [cv, setCv] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!cv || !job) return alert("Veuillez remplir les deux champs");
    setLoading(true);
    try {
      const response = await API.post("/recruiter-decision", { cv, target_job: job });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("L'analyse a échoué.");
    } finally {
      setLoading(false);
    }
  };

  const getBadgeClass = (decision) => {
    const d = (decision || "").toLowerCase();
    if (d.includes("hire") || d.includes("embaucher")) return "hire";
    if (d.includes("reject") || d.includes("rejeter")) return "reject";
    return "interview";
  };

  const getDecisionIcon = (decision) => {
    const d = (decision || "").toLowerCase();
    if (d.includes("hire") || d.includes("embaucher")) return <CheckCircle size={18} />;
    if (d.includes("reject") || d.includes("rejeter")) return <XCircle size={18} />;
    return <Clock size={18} />;
  };

  return (
    <div className="ai-card bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-5">
      <h2 className="flex items-center gap-3 text-lg font-bold text-slate-800">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><BrainCircuit size={20} /></div>
        Décision Recruteur IA
      </h2>

      <textarea
        placeholder="Collez le texte brut du CV du candidat..."
        value={cv}
        onChange={(e) => setCv(e.target.value)}
        className="w-full min-h-[160px] p-4 bg-slate-50 border-0 rounded-2xl text-sm text-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
      />

      <input
        placeholder="Poste ciblé (ex: Développeur Senior Frontend)"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm text-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
      />

      <button className="btn-ai bg-slate-900 text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2" onClick={analyze} disabled={loading}>
        {loading ? "Analyse en cours..." : (
          <>
            <Send size={16} />
            Évaluer le candidat
          </>
        )}
      </button>

      {result && (
        <div className="result-box">
          <h3>
            Score de matching ATS : {result.ats_score}%
            <span className={`decision-badge ${getBadgeClass(result.decision)}`}>
              {getDecisionIcon(result.decision)}
              {result.decision}
            </span>
          </h3>

          <p><strong>Justification :</strong> {result.reason}</p>

          <div className="feedback-hint">
            <small>Analyse générée par IA basée sur les exigences du poste et le profil du candidat.</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterDecision;