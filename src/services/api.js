import axios from "axios";

// Création de l'instance Axios
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adresse de ton backend local
});

// Intercepteur pour inclure le token dans les requêtes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------- AUTHENTIFICATION ---------- */
export async function login(email, password) {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
}

export async function sendPasswordResetEmail(email) {
  console.log(`Envoi du mail de réinitialisation à : ${email}`);
  return Promise.resolve(); // Simulation d'envoi
}

/* ---------- CHAMPIONNATS ---------- */
export async function getChampionnats() {
  const res = await API.get("/championnats");
  return res.data;
}

export async function addChampionnat(nom) {
  const res = await API.post("/championnats", { nom });
  return res.data;
}

export async function getClassement(championnatId) {
  const res = await API.get(`/championnats/${championnatId}/classement`);
  return res.data;
}

/* ---------- ÉQUIPES ---------- */
export async function getEquipes(championnatId) {
  const res = await API.get(`/equipes?championnat=${championnatId}`);
  return res.data;
}

export async function addEquipe(championnatId, data) {
  const res = await API.post("/equipes", { ...data, championnatId });
  return res.data;
}

/* ---------- MATCHS / RÉSULTATS ---------- */
export async function getMatchs(championnatId) {
  const res = await API.get(`/resultats?championnat=${championnatId}`);
  return res.data;
}

export async function addMatch(championnatId, data) {
  const res = await API.post("/resultats", { ...data, championnatId });
  return res.data;
}

/* ---------- JOUEURS ---------- */
export async function getJoueurs(equipeId) {
  const res = await API.get(`/joueurs?equipe=${equipeId}`);
  return res.data;
}

export async function addJoueur(equipeId, data) {
  const res = await API.post("/joueurs", { ...data, equipeId });
  return res.data;
}
