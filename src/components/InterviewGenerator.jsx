import { useState } from "react";
import { Mic, Play, Cpu, Users, Zap } from "lucide-react";
import API from "../services/api";

function InterviewGenerator() {
  const [cv, setCv] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateInterview = async () => {
    if (!cv) return alert("Veuillez coller un CV");
    setLoading(true);
    try {
      const response = await API.post("/generate-interview", { cv });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("La génération a échoué.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-card">
      <h2>
        <Mic size={20} className="text-rose" />
        Générateur d'Entretien IA
      </h2>

      <textarea
        placeholder="Collez le CV pour générer des questions d'entretien personnalisées..."
        value={cv}
        onChange={(e) => setCv(e.target.value)}
      />

      <button className="btn-ai" onClick={generateInterview} disabled={loading} style={{ background: 'var(--rose)' }}>
        {loading ? "Génération..." : (
          <>
            <Play size={16} />
            Générer l'entretien
          </>
        )}
      </button>

      {result && (
        <div className="result-box" style={{ background: '#fff1f2', borderColor: '#fecdd3' }}>
          <h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#be123c' }}>
              <Cpu size={18} />
              Questions Techniques
            </div>
          </h3>
          <ul>
            {result.technical_questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>

          <h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#be123c' }}>
              <Users size={18} />
              Questions RH
            </div>
          </h3>
          <ul>
            {result.hr_questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>

          <h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#be123c' }}>
              <Zap size={18} />
              Questions Adaptatives
            </div>
          </h3>
          <ul>
            {result.adaptive_questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InterviewGenerator;