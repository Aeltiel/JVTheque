
import { useState } from "react";
function Structure() {
    //state pour enregistré les données du formulaire sous forme de tableau d'objet
    const [dataGame, setDataGame] = useState([]);

    //fonction qui me permet d'ajouter les données du formulaire sous forme d'objet à la soumission du form
    function AddGame(event) {
        event.preventDefault(); //Pour empêcher le rechargement de la page

        //Récupération des données de chaque champs du formulaire
        const gameName = event.target.jeu.value;
        const gamePlateforme = event.target.plateforme.value;
        const gameObtention = event.target.obtenu.value;

        // création d'un nouvel obejt avec les données de mon formulaire récupéré plus haut
        const newGame = {
            id: gameName,
            game: gameName,
            plateforme: gamePlateforme,
            obtention: gameObtention
        }

        //Ajout de la nouvelle entrée dans le tableau initialisé dans le state
        setDataGame([...dataGame, newGame]);

        //Reset du formulaire après chaque validation
        event.target.reset();
    }
    return (
        <main>
            <div className="descriptionContainer">
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
            </div>
            <form onSubmit={AddGame} className="formContainer">
                <label htmlFor="jeu">Jeu : </label>
                <input type="text" id="jeu" name="jeu" />
                <label htmlFor="plateforme">Plateforme : </label>
                <select id="plateforme" name="plateforme">
                    <option value="">Choisi la plateforme de ton jeu</option>
                    <option value="Switch">Switch</option>
                    <option value="DS">DS</option>
                    <option value="3DS">3 DS</option>
                </select>
                <label htmlFor="obtenu">Obtenu : </label>
                <select id="obtenu" name="obtenu">
                    <option value=""></option>
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                </select>
                <button>Ajouter</button>
            </form>
            <div className="listContainer">
                <h3 className="listContainer__title">
                    <i className="fa-solid fa-clipboard-list"></i>
                    Vos Jeux : </h3>
                {dataGame.map(game => (
                    <ul className="cardGame" key={game.id}>
                        <li className="cardGame--item--1">{game.game}</li>
                        <li className="cardGame--item">{game.plateforme}</li>
                        <li className="cardGame--item">{game.obtention}</li>
                        <li className="cardGame--item"><i className="fa-solid fa-trash-can"></i></li>
                        <li className="cardGame--item"><i className="fa-solid fa-pen-fancy"></i></li>
                    </ul>
                ))}
            </div>
        </main>
    )
}
export default Structure