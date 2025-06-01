import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../services/api";  // Ta fonction API de login
import "./LoginPage.css";

export default function LoginPage({ onLogin }) {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Changer la langue entre 'fr' et 'en'
  const toggleLanguage = () => {
    const nextLang = i18n.language === "fr" ? "en" : "fr";
    console.log("Changement langue vers", nextLang);
    i18n.changeLanguage(nextLang);
  };

  // Gestion du submit du formulaire
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } catch (err) {
      alert(t("invalid_credentials"));
    }
  }

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Bouton pour changer la langue */}
        <button onClick={toggleLanguage}>
        {i18n.language === 'fr' ? 'English' : 'Français'}
      </button>

        <h2>{t("login")}</h2>

        <input
          type="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email")}
          required
        />
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password")}
          required
        />
        <button className="login-button" type="submit">
          {t("submit")}
        </button>

        <p className="forgot-password">
          <Link to="/forgot-password">{t("forgot_password")}</Link>
        </p>
        <p className="forgot-password">
          <Link to="/signup">{t("no_account")}</Link>
        </p>
      </form>
    </div>
  );
}
