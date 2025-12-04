import React from "react";

function Login() {
  return (
    <div className="bg-neutral-700">
      <h2>Connectez-vous à votre compte</h2>

      <label htmlFor="email">Adresse courriel</label>
      <input type="email" id="email" placeholder="Entrez votre adresse" />

      <label htmlFor="password">Mot de passe</label>
      <input type="password" id="password" placeholder="Entrez votre mot de passe" />

      <a href="#">Tu as oublié le mot de passe ?</a>

      <button>Connexion</button>

      <div className="signup">
        Pas membre ? <a href="#">Commencez un essai gratuit de 14 jours</a>
      </div>
    </div>
  );
}

export default Login;
