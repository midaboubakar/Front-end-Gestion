import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ChampionnatPage from "./pages/ChampionnatPage";
import ClassementsPage from "./pages/ClassementsPage";
import EquipesPage from "./pages/EquipesPage";
import JoueursPage from "./pages/JoueursPage";
import MatchsPage from "./pages/MatchsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";  // <-- importer footer


export default function App() {
  return (
    <Router>
      <Header /> {/* Header visible partout */}

      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Routes protégées (nécessitent authentification) */}
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/championnats" element={
          <PrivateRoute>
            <ChampionnatPage />
          </PrivateRoute>
        } />
        <Route path="/classements" element={
          <PrivateRoute>
            <ClassementsPage />
          </PrivateRoute>
        } />
        <Route path="/equipes" element={
          <PrivateRoute>
            <EquipesPage />
          </PrivateRoute>
        } />
        <Route path="/joueurs" element={
          <PrivateRoute>
            <JoueursPage />
          </PrivateRoute>
        } />
        <Route path="/matchs" element={
          <PrivateRoute>
            <MatchsPage />
          </PrivateRoute>
        } />

        {/* Page 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
            <Footer />  {/* Affiché partout */}
    </Router>
  );
}
