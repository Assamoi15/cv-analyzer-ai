import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const response = await API.post("/login", { username, password });
      const data = response.data;
      if (!data.access_token) {
        setError("Identifiants invalides");
        return;
      }
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      if (data.role === "admin") navigate("/admin");
      else navigate("/recruiter");
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">🤖</div>
        </div>
        <h1>CV Analyzer IA</h1>
        <p className="login-subtitle">Intelligence Candidat Entreprise</p>

        <div className="login-form">
          <input
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>
            Se connecter
          </button>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;