import { useState } from "react";
function SignIn() {
    const [signIn, setSignIn] = useState();
    //fonction pour géré la logique du formulaire
    function form(event) {
        event.preventDefault(); //Pour empêcher le rechargement de la page
        
        const identifiant = event.target.identifiant.value;
        const password = event.target.password.value;

        const newUser = {
            id : identifiant,
            password : password
        }

        setSignIn(newUser)
        console.log(newUser)

    }
    return (
            <form className="formContainer" onSubmit={form}>
            <label htmlFor="identifiant">Votre mail : </label>
            <input type="email" name="identifiant" id="identifiant" />
            <label htmlFor="password">Créer votre mot de passe : </label>
            <input type="password" name="password" id="password" />
            <button>Envoyer</button>
        </form>

    )
}

export default SignIn