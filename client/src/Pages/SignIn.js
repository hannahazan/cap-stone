import "../style/index.scss";
import {Link} from 'react-router-dom'


// import logo from "../assets/img/CharyDeep_logo.png"

export default function SignIn() {
  return (
    <main className="signin-main">
      <header>
        <h1>CharyDeep</h1>
        {/* <img src={logo} alt="Logo" /> */}
      </header>
      <div className="form-main">
        <div className="form-title">
          <p>
            Bienvenue chez <span>CharyDeep</span>
          </p>
          <p>Connectez-vous</p>
          <form className="form-container">
            <input
                type="text"
                email="email"
                placeholder="Connectez-vous avec google"
            />
            <input type="email" name="name" placeholder="Nom utilisateur ou email" />

            <input type="password" name="password" placeholder="Mot de passe" />
            <button type="submit" form="nameform" value="Submit">
                Connectez-vous
            </button>
            <Link to="/signUp"className="no-account">Pas de compte ? Inscrivez-vous</Link>
          </form>
  
        </div>
      </div>
    </main>
  );
}