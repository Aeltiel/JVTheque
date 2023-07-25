import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [signIn, setSignIn] = useState();
    const [pseudo, setPseudo] = useState(false);
    const [mail, setMail] = useState(false);
    const [mdp, setMdp] = useState(false);
    const navigate = useNavigate()//hook qui gère la redirection de page

    let newUser = {}

    let regMail = new RegExp("[a-z0-9\\-_]+[a-z0-9\\.\\-_]*@[a-z0-9\\-_]{2,}\\.[a-z\\.\\-_]+[a-z\\-_]+");
    let regMdp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^<>]{8,}$/;
    let regPseudo = /^[a-zA-Z0-9_-]{1,20}$/;


    //fonction pour géré la logique du formulaire
    function form(event) {
        event.preventDefault(); //Pour empêcher le rechargement de la page

        //variable pour récupéré les données des inputs du formulaire
        //Important : bien faire coincider les noms des variables et des élément form au model
        //du backend, sinon ça provoque une erreur 400
        let pseudoForm = event.target.pseudoForm.value;
        let email = event.target.email.value;
        let password = event.target.password.value;

        //vérification des données
        if (regMail.test(email) === false || email === "") {
            setMail(false)
            alert('Votre adresse mail est incorrect');
            event.preventDefault();
        }
        if (regMdp.test(password) === false || password === "") {
            setMdp(false);
            alert('Votre mot de passe doit comporter : 8 caractères dont au moins une minuscule, une majuscule et un chiffre')
            event.preventDefault();
        }
        if (regPseudo.test(pseudoForm) === false || pseudoForm === "") {
            setPseudo(false);
            alert('Votre Pseudo ne doit pas faire plus de 20 caractères')
            event.preventDefault();
        }
        else {
            setMail(true)
            setMdp(true)
            setPseudo(true)
            newUser = {
                pseudo: pseudoForm,
                email: email,
                password: password
            }
            setSignIn(newUser)
        }
        if (pseudo === true && mail === true && mdp === true) {
            fetch("http://localhost:3000/api/auth/signup",
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signIn)
                })
                .then(response => response.json())
                .then(data => { console.log('Félications, vous êtes bien enregistré') })
                .catch(error => { console.log(error) });

            navigate("/userPage")
        }


    }
    return (
        <form className="formContainer" onSubmit={form} noValidate>
            <label htmlFor="pseudoForm">Votre pseudo : </label>
            <input type="text" name="pseudoForm" id="pseudoForm" required />
            <label htmlFor="email">Votre mail : </label>
            <input type="email" name="email" id="email" required />
            <label htmlFor="password">Créer votre mot de passe : </label>
            <input type="password" name="password" id="password" required />
            <button>Envoyer</button>
        </form>

    )
}

export default SignIn