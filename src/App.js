import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ChampionnatPage from "./pages/ChampionnatPage";
import ClassementsPage from "./pages/ClassementsPage";
import EquipesPage from "./pages/EquipesPage";
   /*import JoueursPage from "./pages/JoueursPage";*/
import MatchsPage from "./pages/MatchsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import './i18n/i18n';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header onLogout={handleLogout} />

        <main style={{ flex: 1 }}>
          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Pages accessibles sans authentification */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/championnats"
              element={
                <ChampionnatPage
                  onSelectChampionnat={(champ) => console.log("Sélectionné :", champ)}
                />
              }
            />
            <Route path="/classements" element={<ClassementsPage />} />
            <Route path="/equipes" element={<EquipesPage />} />
            {/*<Route path="/joueurs" element={<JoueursPage />} />*/}
            <Route path="/matchs" element={<MatchsPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Page 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
