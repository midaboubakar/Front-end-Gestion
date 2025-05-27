// components/Footer.jsx
export default function Footer() {
  const styles = {
    footer: {
      marginTop: 'auto',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #2d466b, #4a6fa5)',
      color: '#fff',
      textAlign: 'center',
      fontSize: '0.9rem',
      boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
      userSelect: 'none',
    },
    link: {
      color: '#ff9f1c',
      textDecoration: 'none',
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
      fontWeight: '600',
    },
  };

  return (
    <footer style={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Championnats. Tous droits réservés.
      </p>
      <p>
        <a href="/privacy" style={styles.link}>Politique de confidentialité</a> |{' '}
        <a href="/terms" style={styles.link}>Conditions d'utilisation</a>
      </p>
    </footer>
  );
}
