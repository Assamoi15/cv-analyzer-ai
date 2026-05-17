import RecruiterDecision from "../components/RecruiterDecision";
import SkillGap from "../components/SkillGap";
import InterviewGenerator from "../components/InterviewGenerator";

function AIToolkitPage() {
  return (
    <div className="page-container">
      <div className="header-row">
        <div className="page-header">
          <h1>Boîte à outils IA</h1>
          <p>Intelligence avancée pour l'évaluation des candidats</p>
        </div>
      </div>

      <div className="toolkit-layout">
        <section className="toolkit-main">
          <h2>Évaluation de haut niveau</h2>
          <RecruiterDecision />
        </section>

        <section className="toolkit-grid">
           <div>
              <h2>Analyse des lacunes</h2>
              <SkillGap />
           </div>
           <div>
              <h2>Préparation d'entretien</h2>
              <InterviewGenerator />
           </div>
        </section>
      </div>
    </div>
  );
}

export default AIToolkitPage;
