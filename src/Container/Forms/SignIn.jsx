import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyAPI } from "../../Api/myApi";
import { useAuth } from "../../Authentification/AuthContext";

function SignIn() {
  const [signIn, setSignIn] = useState({ pseudo: "", email: "", password: "" });
  const [submit, setSubmit] = useState(false);
  const [errorPseudo, setErrorPseudo] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate(); //hook qui gère la redirection de page
  const { updateToken } = useAuth();

  //bloc pour valider les données reçue du formulaire avant envoi
  let regMail = new RegExp(
    "[a-z0-9\\-_]+[a-z0-9\\.\\-_]*@[a-z0-9\\-_]{2,}\\.[a-z\\.\\-_]+[a-z\\-_]+"
  );
  let regMdp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)-_\+=\[\]\{\}\|;:'",<.>/?`~])[^ ]{8,20}$/;
  let regPseudo = /^[a-zA-Z0-9_-]{1,20}$/;

  function mailTest(email) {
    if (regMail.test(email) === false || email === "") {
      setErrorMail("Votre adresse mail est incorrect");
    }
  }

  function pseudoTest(pseudo) {
    if (regPseudo.test(pseudo) === false || pseudo === "") {
      setErrorPseudo("Votre Pseudo ne doit pas faire plus de 20 caractères");
    }
  }

  function passwordTest(password) {
    if (regMdp.test(password) === false || password === "") {
      setErrorPassword(
        "Votre mot de passe doit comporter : 8 caractères dont au moins une minuscule, une majuscule et un chiffre"
      );
    }
  }

  // fonction d'appel à l'api pour l'enregistrement des données
  async function fetchSignUp() {
    try {
      const sign = await MyAPI.postSignIn(signIn);
      if (sign) {
        console.log("félicitation vous êtes enregistré !");
        const token = sign.token;
        const userId = sign.userId;
        updateToken(token, userId);
        navigate("/userPage");
      } else {
        alert("fetchSignUp : " + sign.message);
      }
    } catch (error) {
      console.log("SignUp Error : " + error);
    }
  }

  //fonction pour géré la logique du formulaire
  function form(event) {
    event.preventDefault(); //Pour empêcher le rechargement de la page
    console.log("Formulaire envoyé !");
    const { pseudo, email, password } = signIn;
    //vérification des données
    const pseudoValidate = pseudoTest(pseudo);
    const emailValidate = mailTest(email);
    const passwordValidate = passwordTest(password);

    if (pseudoValidate && emailValidate && passwordValidate) {
      setSignIn({ pseudo, email, password });
    }
    setSubmit(true);
    console.log(signIn);
    event.target.reset();
  }

  useEffect(() => {
    if (submit && signIn) {
      fetchSignUp();
    }
  }, [signIn, submit]);

  return (
    <form className="formContainer" onSubmit={form}>
      <label htmlFor="pseudoForm">Votre pseudo : </label>
      <input
        type="text"
        name="pseudo"
        id="pseudo"
        value={signIn.pseudo}
        onChange={(e) => setSignIn({ ...signIn, pseudo: e.target.value })}
        required
      />
      {errorPseudo && <p className="formError">{errorPseudo}</p>}
      <label htmlFor="email">Votre mail : </label>
      <input
        type="email"
        name="email"
        id="email"
        value={signIn.email}
        onChange={(e) => setSignIn({ ...signIn, email: e.target.value })}
        required
      />
      {errorMail && <p className="formError">{errorMail}</p>}
      <label htmlFor="password">Votre mot de passe : </label>
      <input
        type="password"
        name="password"
        id="password"
        value={signIn.password}
        onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
        required
      />
      {errorPassword && <p className="formError">{errorPassword}</p>}
      <button>Envoyer</button>
    </form>
  );
}

export default SignIn;
