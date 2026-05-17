import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import API from "../services/api";

function UploadCV() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success
  const fileInputRef = useRef(null);

  const upload = async () => {
    if (!file) return alert("Veuillez sélectionner un fichier");
    setStatus('uploading');
    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/upload", formData);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('idle');
      console.error(err);
      alert("L'analyse a échoué.");
    }
  };

  return (
    <div className="upload-card h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">Analyse ATS</h2>
        <p className="text-sm text-slate-500">Importez un CV pour extraire les compétences et calculer le score de matching.</p>
      </div>

      <div
        className={`upload-zone flex-1 ${file ? 'border-indigo-400 bg-indigo-50/30' : ''}`}
        onClick={() => fileInputRef.current.click()}
      >
        {status === 'success' ? (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <CheckCircle2 size={40} className="text-emerald-500 mb-2" />
            <p className="text-sm font-medium text-emerald-700">Analyse terminée avec succès</p>
          </div>
        ) : (
          <>
            <div className="upload-icon-wrap mb-3">
              <FileText size={24} className={file ? "text-indigo-600" : ""} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-700">
                {file ? file.name : "Déposer le fichier CV"}
              </p>
              <p className="text-xs text-slate-400 mt-1">PDF uniquement, max 10 Mo</p>
            </div>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button
        className={`btn-primary mt-6 ${status === 'uploading' ? 'opacity-70 cursor-not-allowed' : ''}`}
        onClick={upload}
        disabled={!file || status === 'uploading'}
      >
        {status === 'uploading' ? (
          <><Loader2 size={18} className="animate-spin mr-2" /> Analyse en cours...</>
        ) : "Lancer l'analyse IA"}
      </button>
    </div>
  );
}

export default UploadCV;