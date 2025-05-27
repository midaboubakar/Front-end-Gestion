import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simule l'envoi d'un mail de réinitialisation
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // TODO: appeler l'API réelle ici
      // Exemple : await sendPasswordResetEmail(email);
      await new Promise(resolve => setTimeout(resolve, 1000)); // mock délai

      setMessage(`Un email de réinitialisation a été envoyé à ${email}.`);
    } catch {
      setError("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 8, width: "100%" }}>
          {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
        </button>
      </form>
      {message && <p style={{ color: "green", marginTop: 10 }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
