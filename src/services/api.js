import axios from "axios";

// 🔧 Configuration de l'URL du backend à partir du fichier .env
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Création de l'instance Axios
const API = axios.create({
  baseURL: BASE_URL,
});

// 🔐 Intercepteur pour ajouter le token JWT dans les headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ------------------- AUTHENTIFICATION ------------------- */
export async function login(email, password) {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
}

export async function sendPasswordResetEmail(email) {
  console.log(`Envoi du mail de réinitialisation à : ${email}`);
  return Promise.resolve(); // Simulation
}

/* ------------------- CHAMPIONNATS ------------------- */
export async function getChampionnats() {
  const res = await API.get("/championships");
  return res.data;
}

export async function addChampionnat(nom) {
  const res = await API.post("/championships", { nom });
  return res.data;
}

export async function getClassement(championnatId) {
  const res = await API.get(`/championships/${championnatId}/classement`);
  return res.data;
}

/* ------------------- ÉQUIPES ------------------- */
export async function getEquipes(championnatId) {
  const res = await API.get(`/teams?championnat=${championnatId}`);
  return res.data;
}

export async function addEquipe(championnatId, data) {
  const res = await API.post("/teams", { ...data, championnatId });
  return res.data;
}

/* ------------------- MATCHS ------------------- */
export async function getMatchs(championnatId) {
  const res = await API.get(`/games?championnat=${championnatId}`);
  return res.data;
}

export async function addMatch(championnatId, data) {
  const res = await API.post("/games", { ...data, championnatId });
  return res.data;
}

/*---------sign up ----------------- */
export async function signup(email, password) {
  const res = await fetch("http://localhost:3000/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la création du compte");
  }

  return await res.json();
}
