import { useState } from "react"
import PopUp from "../Component/popUp";
import SignIn from "../Component/Forms/SignIn";
import LogIn from "../Component/Forms/LogIn";

function Home() {
    const [signBtn, setsignBtn] = useState(false);
    const [logInBtn, setLogInBtn] = useState(false);
    
    const signIn = () => {
        setsignBtn(!signBtn);
    }
    const logIn = () => {
        setLogInBtn(!logInBtn);
    } 

    function signInView(){
        if(signBtn === true){
            return(
                <PopUp 
                content = {<SignIn />}
                />
            )
        }
    }
    function logInView(){
        if(logInBtn === true){
            return(
                <PopUp 
                content = {<LogIn />}
                />
            )
        }
    }

    return (
        <main>
            <section className="descriptionContainer">
                <h2 className="descriptionContainer__title">
                    Suivez et gérez votre liste de Jeux Vidéos !!
                </h2>
                <p className="descriptionContainer__text">
                    Vous souhaitez consulter à tous moment votre ludothèque, la trier, la compléter? Vous
                    êtes au bon endroit !! Plus de risque d'acheter un jeu en double par mégarde ici vous pouvez :
                </p>
                <ul className="descriptionContainer__list">
                    <li>Ajouter</li>
                    <li>Trier</li>
                    <li>Modifier</li>
                </ul>
                <p className="descriptionContainer__text">
                    Votre collection comme bon vous semble ! Il ne vous rest plus qu'une chose à faire : vous connecter
                    <i className="fa-regular fa-hand-point-down"></i>
                </p>
            </section>

            <div className="connexion">
                <p className="connexion__text">Vous êtes nouveau ? Inscrivez-vous : </p>
                <button className="btn" onClick={signIn}>
                S'inscrire</button>

                <p className="connexion__text">Nouveau membre ? Connectez-vous : </p>
                <button className="btn"onClick={logIn}>Se connecter</button>
            </div>
            {signInView()}
            {logInView()}

            
        </main>
    )
}
export default Home