import TopCandidates from "../components/TopCandidates";

function CandidatesPage() {
  return (
    <div className="page-container">
      <div className="header-row">
        <div className="page-header">
          <h1>Bassin de Talents</h1>
          <p>Consultez et gérez l'ensemble des candidats analysés</p>
        </div>
      </div>

      <div className="full-width-card">
        <TopCandidates />
      </div>
    </div>
  );
}

export default CandidatesPage;
