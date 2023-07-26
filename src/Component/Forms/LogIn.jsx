import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentification/AuthContext";


/*
Pour plus tard : quand j'aurais la bdd rajouter le fetch pour récupéré la liste des identifiants
afin de trouver le log entrer et le comparer pour voir s'il est correct puis envoyer l'accès à la page user
 */
function LogIn() {
    const [logIn, setLogIn] = useState();
    const navigate = useNavigate();
    const {updateToken}  = useAuth()//me permet d'appeler la fonction updateToken du hook
    let user = {}
console.log(updateToken)
    //fonction pour géré la logique du formulaire
    function form(event) {
        event.preventDefault(); //Pour empêcher le rechargement de la page
        const email = event.target.email.value;
        const password = event.target.password.value;

        user = {
            email: email,
            password: password
        }
        setLogIn(user)

            fetch("http://localhost:3000/api/auth/login",
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(logIn)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data) {
                        const token = data.token;
                        updateToken(token);//permet de récupéré et d'enregistré le token renvoyé par l'api
                        console.log("connextion réussie !")
                        navigate("/userPage")
                    } else {
                        console.log('Echec de la connexion !')
                        alert('Votre email ou votre mot de passe est incorrect')
                    }
                })
                .catch(error => { console.log(error) });
       
    }
    return (
        <form className="formContainer" onSubmit={form}>
            <label htmlFor="email">Votre identifiant : </label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Entrer votre mot de passe : </label>
            <input type="password" name="password" id="password" />
            <button>Envoyer</button>
        </form>

    )
}

export default LogIn