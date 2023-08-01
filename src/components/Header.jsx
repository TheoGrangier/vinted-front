import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header({ userToken, setUserToken }) {
  return (
    <header>
      <div className="container">
        <Link to="/">Logo</Link>

        <div>
          {/* S'il y a un token affichage du bouton de déconnexion sinon affichage des boutons pour naviguer vers les pages de connexion */}
          {userToken ? (
            <button
              onClick={() => {
                setUserToken("");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">S'inscrire</Link>
              <Link to="/login">Se connecter</Link>
            </>
          )}
          <Link to="/publish">Vends tes articles</Link>
        </div>
      </div>
    </header>
  );
}
