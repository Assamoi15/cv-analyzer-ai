import ReportDownloader from "../components/ReportDownloader";

function ReportsPage() {
  return (
    <div className="page-container">
      <div className="header-row">
        <div className="page-header">
          <h1>Rapports Entreprise</h1>
          <p>Téléchargez des données structurées et des résumés de candidats</p>
        </div>
      </div>

      <div className="reports-grid">
        <ReportDownloader />
        
        <div className="info-card">
          <h3>Générations Récentes</h3>
          <p className="text-muted">Aucun rapport récent trouvé pour cette session.</p>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
