import { useState } from "react";
import { FileDown, FileText, Loader2 } from "lucide-react";
import API from "../services/api";

function ReportDownloader() {
  const [cv, setCv] = useState("");
  const [loading, setLoading] = useState(false);

  const downloadReport = async () => {
    if (!cv) return alert("Veuillez coller un CV");
    setLoading(true);
    try {
      const response = await API.post("/generate-report", { cv }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "rapport_cv.pdf";
      a.click();
    } catch (err) {
      console.error(err);
      alert("Le téléchargement a échoué.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-card">
      <h2>
        <FileText size={20} className="text-teal" />
        Rapport PDF IA
      </h2>

      <textarea
        placeholder="Collez le contenu du CV pour générer un rapport PDF professionnel..."
        value={cv}
        onChange={(e) => setCv(e.target.value)}
      />

      <button className="btn-ai" onClick={downloadReport} disabled={loading} style={{ background: 'var(--teal)' }}>
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Génération du PDF...
          </>
        ) : (
          <>
            <FileDown size={16} />
            Télécharger le rapport
          </>
        )}
      </button>

      <p style={{ fontSize: '11px', color: 'var(--txt-muted)', marginTop: '12px', textAlign: 'center' }}>
        Génère un document PDF complet incluant l'analyse des compétences et le classement.
      </p>
    </div>
  );
}

export default ReportDownloader;