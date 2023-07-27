import { useState } from "react";
import { useAuth } from "../../Authentification/AuthContext";


function AddGame() {
    const [dataGame, setDataGame] = useState({});
    const [nameGame, setNameGame] = useState();
    const { token } = useAuth();
    const { userID } = useAuth();

    let newGame = {}
    let regGame = /^[A-Za-z0-9\s:]{1,100}$/

    //fonction qui me permet d'ajouter les données du formulaire sous forme d'objet à la soumission du form
    function AddNewGame(event) {
        event.preventDefault(); //Pour empêcher le rechargement de la page

        //Récupération des données de chaque champs du formulaire
        const jeu = event.target.jeu.value;
        const plateforme = event.target.plateforme.value;
        const obtenu = event.target.obtenu.value;

        //vérifier les données du formulaire
        if (regGame.test(jeu) === false || jeu === '') {
            setNameGame(false);
            alert('Le nom du jeu est incorrect');
            event.preventDefault();
        } else {
            setNameGame(true);
            // création d'un nouvel objet avec les données de mon formulaire récupéré plus haut
            newGame = {
                id: userID,
                game: jeu,
                plateforme: plateforme,
                obtention: obtenu
            }
            //Ajout de la nouvelle entrée dans le tableau initialisé dans le state
            setDataGame(newGame);
        }

        if (nameGame === true) {
            fetch("http://localhost:3000/api/game",
                {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization : `Bearer ${token}`},
                    body: JSON.stringify(dataGame)
                })
                .then(response => response.json())
                .then(data => { console.log('Félications, votre jeu est bien enregistré') })
                .catch(error => { console.log(error) });

        }
        //Reset du formulaire après chaque validation
        event.target.reset();
    }

    if (token) {
        return (
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
    else {
        //mettre un composant indiquant la redirection et la nécessisté de se co
    }
}
export default AddGame