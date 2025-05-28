import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/api";
import "./LoginPage.css"; // <-- ajoute ce fichier CSS

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } catch (err) {
      alert("Identifiants invalides");
    }
  }

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <input
          type="email"
          className="login-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Adresse email"
          required
        />
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <button className="login-button" type="submit">Se connecter</button>
        <p className="forgot-password">
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </p>
        <p className="forgot-password">
          <Link to="/signup">Pas encore de compte ? Créer un compte</Link>
        </p>
      </form>
    </div>
  );
}
