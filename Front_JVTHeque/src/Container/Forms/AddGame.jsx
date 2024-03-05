import { useAuth } from "../../Authentification/AuthContext";
import { MyAPI } from "../../Api/myApi";
import { useState } from "react";

function AddGame({ refreshData }) {
  const [nameError, setNameError] = useState("");
  const { token } = useAuth();
  const { userID } = useAuth();

  let newGame = {};
  let regGame = /^[A-Za-z0-9\sÀ-ÿ:'-]{1,100}$/;

  //fonction de fetch
  async function gameFetch(newGame) {
    try {
      const addGame = await MyAPI.postGames(token, newGame);
      console.log(addGame);
      if (!addGame.error) {
        console.log("Félications, votre jeu est bien enregistré");
      } else {
        console.log("Une erreur d'enregistrement de ton jeu est survenu !");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //fonction qui me permet d'ajouter les données du formulaire sous forme d'objet à la soumission du form
  async function AddNewGame(event) {
    event.preventDefault(); //Pour empêcher le rechargement de la page

    //Récupération des données de chaque champs du formulaire
    const jeu = event.target.game.value;
    const plateforme = event.target.plateforme.value;
    const obtenu = event.target.obtention.value;

    //vérifier les données du formulaire
    if (regGame.test(jeu) === false || jeu === "") {
      setNameError("Le nom du jeu est incorrect");
      event.preventDefault();
    } else {
      // création d'un nouvel objet avec les données de mon formulaire récupéré plus haut
      newGame = {
        id: userID,
        game: jeu,
        plateforme: plateforme,
        obtention: obtenu,
      };
      await gameFetch(newGame);
      refreshData();

      //Reset du formulaire après chaque validation
      event.target.reset();
    }
  }

  if (token) {
    return (
      <form onSubmit={AddNewGame} className="formContainer text-slate-900">
        <label htmlFor="jeu">Jeu : </label>
        <input
          type="text"
          id="game"
          name="game"
          className="focus:outline-none"
        />
        {nameError && <p className="formError">{nameError}</p>}
        <label htmlFor="plateforme">Plateforme : </label>
        <select id="plateforme" name="plateforme">
          <option value="">Choisi la plateforme de ton jeu</option>
          <option value="Switch">Switch</option>
          <option value="DS">DS</option>
          <option value="3DS">3 DS</option>
          <option value="3DS">PS5</option>
          <option value="3DS">PS4</option>
          <option value="3DS">Xbox Series</option>
          <option value="3DS">Xbox One</option>
          <option value="3DS">PC</option>
        </select>
        <label htmlFor="obtenu">Obtenu : </label>
        <select id="obtention" name="obtention">
          <option value=""></option>
          <option value="Oui">Oui</option>
          <option value="whishlist">Whishlist</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    );
  }
}
export default AddGame;
