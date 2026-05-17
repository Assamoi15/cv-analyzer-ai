import UploadCV from "../components/UploadBox";

function UploadPage() {
  return (
    <div className="page-container">
      <div className="header-row">
        <div className="page-header">
          <h1>Analyse de CV</h1>
          <p>Analysez de nouveaux candidats grâce à notre moteur d'IA</p>
        </div>
      </div>

      <div className="upload-page-content">
        <UploadCV />
        
        <div className="info-card">
          <h3>Capacités du Moteur</h3>
          <ul>
            <li>Extraction automatique des compétences</li>
            <li>Détection du niveau d'expérience</li>
            <li>Score ATS comparé aux standards du marché</li>
            <li>Résumé instantané du profil</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
