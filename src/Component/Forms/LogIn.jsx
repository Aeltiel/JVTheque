import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentification/AuthContext";


/*
Pour plus tard : quand j'aurais la bdd rajouter le fetch pour récupéré la liste des identifiants
afin de trouver le log entrer et le comparer pour voir s'il est correct puis envoyer l'accès à la page user
 */
function LogIn() {
    const [LogIn, setLogIn] = useState();
    const navigate = useNavigate();
    const {updateToken} = useAuth()//me permet d'appeler la fonction updateToken du hook
    
    //fonction pour géré la logique du formulaire
    function form(event) {
        event.preventDefault(); //Pour empêcher le rechargement de la page
        
        const identifiant = event.target.identifiant.value;
        const password = event.target.password.value;

        const newUser = {
            id : identifiant,
            password : password
        }

        setLogIn(newUser)
        console.log(newUser)
       navigate("/userPage")

    }
    return (
            <form className="formContainer" onSubmit={form}>
            <label htmlFor="identifiant">Votre identifiant : </label>
            <input type="email" name="identifiant" id="identifiant" />
            <label htmlFor="password">Entrer votre mot de passe : </label>
            <input type="password" name="password" id="password" />
            <button>Envoyer</button>
        </form>

    )
}

export default LogIn