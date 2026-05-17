import { motion } from "framer-motion";

function Dashboard({ result }) {

  return (

    <motion.div
      className="dashboard"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <div className="dashboard-card">
        <h3>🎯 Score de Matching</h3>
        <p>{Number(result?.score || 0).toFixed(0)}%</p>
      </div>

      <div className="dashboard-card">
        <h3>🚀 Niveau d'Expertise</h3>
        <p>{result?.level || "Junior"}</p>
      </div>

      <div className="dashboard-card">
        <h3>🔍 Mots-clés trouvés</h3>
        <p>{result?.skills?.length || 0}</p>
      </div>

    </motion.div>
  );
}

export default Dashboard;