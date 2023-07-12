
import ModalBtn from "../Component/ModalBtn";
import SignIn from "../Component/Forms/SignIn";
import LogIn from "../Component/Forms/LogIn";

function Home() {

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
                <ModalBtn 
                text={"S'inscrire"}
                content={<SignIn/>}
                />

                <p className="connexion__text">Nouveau membre ? Connectez-vous : </p>
                <ModalBtn 
                text={"Se Connecter"}
                content={<LogIn/>}
                />
            </div>
            

            
        </main>
    )
}
export default Home