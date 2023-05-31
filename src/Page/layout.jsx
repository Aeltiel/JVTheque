
import { useState } from "react";
//structure sémantique de la page
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
            <form onSubmit={AddGame}>
                <label htmlFor="jeu">Jeu : </label>
                <input type="text" id="jeu" name="jeu" />
                <label htmlFor="plateforme">Plateforme : </label>
                <select id="plateforme" name="plateforme">
                    <option value="">Choisi la plateforme de ton jeu</option>
                    <option value="switch">Switch</option>
                    <option value="ds">DS</option>
                    <option value="3ds">3 DS</option>
                </select>
                <label htmlFor="obtenu">Obtenu : </label>
                <select id="obtenu" name="obtenu">
                    <option value=""></option>
                    <option value="true">Oui</option>
                    <option value="flase">Non</option>
                </select>
                <button>Ajouter</button>
            </form>
            <div className="listContainer">
                <ul>
                    {dataGame.map(game => (
                        <ul key={game.id}>
                            <li>{game.game}</li>
                            <li>{game.plateforme}</li>
                            <li>{game.obtention}</li>
                        </ul>
                        
                    ))}
                </ul>

            </div>
        </main>
    )
}
export default Structure