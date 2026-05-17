import { useState } from "react";
import API from "../services/api";

export default function JobAnalyzer() {

  const [cv, setCv] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    try {
      const response = await API.post("/analyze-job-url", {
        cv,
        job_url: url,
      });
      setResult(response.data);
    } catch (err) {
      console.error("Analyse error:", err);
      alert("L'analyse a échoué. Vérifiez votre connexion ou l'URL du poste.");
    }
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold mb-4">
        Analyze Job URL
      </h2>

      <textarea
        placeholder="CV text..."
        className="border p-2 w-full mb-3"
        onChange={(e) => setCv(e.target.value)}
      />

      <input
        type="text"
        placeholder="LinkedIn URL"
        className="border p-2 w-full mb-3"
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={analyze}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Analyze
      </button>

      {result && (

        <div className="mt-6">

          <h3 className="text-2xl font-bold">
            {result.matching_score}%
          </h3>

          <div className="mt-3">

            <p className="font-semibold">
              Matched Skills
            </p>

            <div className="flex gap-2 flex-wrap">

              {result.matched_skills.map((skill) => (

                <span
                  key={skill}
                  className="bg-green-200 px-2 py-1 rounded"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>

  );
}