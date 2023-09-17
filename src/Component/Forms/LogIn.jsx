import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentification/AuthContext";
import { MyAPI } from "../../Api/myApi";

/*
Pour plus tard : quand j'aurais la bdd rajouter le fetch pour récupéré la liste des identifiants
afin de trouver le log entrer et le comparer pour voir s'il est correct puis envoyer l'accès à la page user
 */
function LogIn() {
  const [logIn, setLogIn] = useState();
  const navigate = useNavigate();
  const { updateToken } = useAuth(); //me permet d'appeler la fonction updateToken du hook
  let user = {};

  useEffect(() => {
    if (logIn) {
      console.log(logIn);
      fetchLogIn();
    }
  }, [logIn]);

  //function d'appel à l'api
  async function fetchLogIn() {
    try {
      const log = await MyAPI.postLogIn(logIn);
      if (log) {
        const token = log.token;
        const userId = log.userId;
        updateToken(token, userId); //permet de récupéré et d'enregistré le token renvoyé par l'api
        console.log("connextion réussie !");
      } else {
        console.log("Echec de la connexion !");
        alert("Votre email ou votre mot de passe est incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //fonction pour géré la logique du formulaire
  function form(event) {
    event.preventDefault(); //Pour empêcher le rechargement de la page
    const email = event.target.email.value;
    const password = event.target.password.value;

    user = {
      email: email,
      password: password,
    };

    setLogIn(user);

    navigate("/userPage");
  }

  return (
    <form className="formContainer" onSubmit={form}>
      <label htmlFor="email">Votre identifiant : </label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Entrer votre mot de passe : </label>
      <input type="password" name="password" id="password" />
      <button>Envoyer</button>
    </form>
  );
}
export default LogIn;
