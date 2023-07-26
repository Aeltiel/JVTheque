import { useState } from "react";
import { useAuth } from "../../Authentification/AuthContext";


function AddGame() {
    //state pour enregistré les données du formulaire sous forme de tableau d'objet
    const [dataGame, setDataGame] = useState([]);
    const { token } = useAuth();

    //fonction qui me permet d'ajouter les données du formulaire sous forme d'objet à la soumission du form
    function AddNewGame(event){
        event.preventDefault(); //Pour empêcher le rechargement de la page

        //Récupération des données de chaque champs du formulaire
        const gameName = event.target.jeu.value;
        const gamePlateforme = event.target.plateforme.value;
        const gameObtention = event.target.obtenu.value;
    
        // création d'un nouvel objet avec les données de mon formulaire récupéré plus haut
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

    if(token){
        return(
            <form onSubmit={AddNewGame} className="formContainer">
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
        )
    }
    else{
        //mettre un composant indiquant la redirection et la nécessisté de se co
    }
}
export default AddGame