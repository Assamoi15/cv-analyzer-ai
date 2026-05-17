import { useState } from "react";
import { Compass, Search, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import API from "../services/api";

function SkillGap() {
  const [cv, setCv] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeGap = async () => {
    if (!cv || !job) return alert("Veuillez remplir les deux champs");
    setLoading(true);
    try {
      const response = await API.post("/skill-gap", { cv, target_job: job });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("L'analyse a échoué.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-card">
      <h2>
        <Compass size={20} className="text-primary" />
        Analyse des lacunes
      </h2>

      <textarea
        placeholder="Collez le contenu du CV ici..."
        value={cv}
        onChange={(e) => setCv(e.target.value)}
      />

      <input
        placeholder="Poste ciblé (ex: Data Scientist)"
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />

      <button className="btn-ai" onClick={analyzeGap} disabled={loading} style={{ background: 'var(--primary)' }}>
        {loading ? "Analyse..." : (
          <>
            <Search size={16} />
            Analyser les compétences
          </>
        )}
      </button>

      {result && (
        <div className="result-box">
          <h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="var(--emerald)" />
              Compétences validées
            </div>
          </h3>
          <ul>
            {result.matched_skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} color="var(--rose)" />
              Compétences manquantes
            </div>
          </h3>
          <ul>
            {result.missing_skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lightbulb size={18} color="var(--amber)" />
              Recommandations
            </div>
          </h3>
          <ul>
            {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SkillGap;