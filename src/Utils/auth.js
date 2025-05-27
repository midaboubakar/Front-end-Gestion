// src/utils/auth.js
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // redirige après logout
}

export function getUserInfo() {
  // Extrait des infos basiques depuis le localStorage
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    // Si tu stockes un JWT, tu pourrais le décoder ici (ex : avec jwt-decode)
    // Mais pour l’instant, supposons que tu stockes juste l’e-mail
    return JSON.parse(atob(token.split(".")[1])); // à adapter selon ton back
  } catch (e) {
    return null;
  }
}
