import { useAuth } from "../../Authentification/AuthContext";
import { MyAPI } from "../../Api/myApi";
import { useState } from "react";

function AddRetroGame({ refreshData }) {
  const [nameError, setNameError] = useState("");
  const { token, userID } = useAuth();

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
        <select id="plateforme" name="plateforme" className="console">
          <option value="">Choisi la plateforme de ton jeu</option>
          <option value="Nes">Nes</option>
          <option value="Super Nes">Super Nes</option>
          <option value="N64">N64</option>
          <option value="Gamecube">Gamecube</option>
          <option value="Gameboy">Gameboy</option>
          <option value="Gameboy Advance">Gameboy Advance</option>
          <option value="DS">DS</option>
          <option value="3DS">3DS</option>
          <option value="PS1">PS1</option>
          <option value="PS2">PS2</option>
          <option value="PS3">PS3</option>
          <option value="PSP">PSP</option>
          <option value="PS Vita">PS Vita</option>
          <option value="Xbox">Xbox</option>
          <option value="Xbox 360">Xbox 360</option>
          <option value="Megadrive">Mégadrive</option>
          <option value="Dreamcast">Dreamcast</option>
          <option value="Saturn">Saturn</option>
        </select>
        <label htmlFor="obtenu">Obtenu : </label>
        <select id="obtention" name="obtention">
          <option value=""></option>
          <option value="Jeu obtenu">Jeu obtenu</option>
          <option value="Whishlist">Whishlist</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    );
  }
}
export default AddRetroGame;
