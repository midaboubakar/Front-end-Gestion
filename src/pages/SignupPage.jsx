import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/api"; // Cette fonction doit être définie dans ton API
import "./LoginPage.css"; // Utilise les mêmes styles

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await signup(email, password); // Enregistre l'utilisateur
      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du compte.");
    }
  }

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>
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
        <input
          type="password"
          className="login-input"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          placeholder="Confirmez le mot de passe"
          required
        />
        <button className="login-button" type="submit">Créer le compte</button>
        <p className="forgot-password">
          <Link to="/login">Déjà inscrit ? Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
