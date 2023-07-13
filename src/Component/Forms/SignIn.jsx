import { useState } from "react";
function SignIn() {
    const [signIn, setSignIn] = useState();
    const [mail, setMail] = useState(false);
    const [mdp, setMdp] = useState(false);

    let regMail = new RegExp("[a-z0-9\\-_]+[a-z0-9\\.\\-_]*@[a-z0-9\\-_]{2,}\\.[a-z\\.\\-_]+[a-z\\-_]+");
    let regMdp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^<>]{8,}$/;
    
    //fonction pour géré la logique du formulaire
    function form(event) {
        event.preventDefault(); //Pour empêcher le rechargement de la page
        let identifiant = event.target.identifiant.value;
        let password = event.target.password.value;
        
        console.log(identifiant)
        console.log(password)
        if (regMail.test(identifiant) === false || identifiant === "") {
            setMail(false)
            alert('Votre adresse mail est incorrect');
            event.preventDefault();
        } 
        if(regMdp.test(password) === false || password === ""){
            setMdp(false);
            alert('Votre mot de passe doit comporter : 8 caractères dont au moins une minuscule, une majuscule et un chiffre')
            event.preventDefault();
        }else {
            setMail(true)
            setMdp(true)
            const newUser = {
                id: identifiant,
                password: password
            }
            setSignIn(newUser)
            console.log(newUser)
        }

    }
    return (
        <form className="formContainer" onSubmit={form} noValidate>
            <label htmlFor="identifiant">Votre mail : </label>
            <input type="email" name="identifiant" id="identifiant" required/>
            <label htmlFor="password">Créer votre mot de passe : </label>
            <input type="password" name="password" id="password" required />
            <button>Envoyer</button>
        </form>

    )
}

export default SignIn