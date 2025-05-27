// Vérifie si l'utilisateur est authentifié
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// Récupère les infos de l'utilisateur à partir du token (optionnel si tu stockes des infos dans le token)
export function getUserInfo() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // Si le token est un JWT : décodage basique
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error("Erreur de décodage du token :", error);
    return null;
  }
}

// Déconnecte l'utilisateur
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Redirige vers la page de connexion
}
