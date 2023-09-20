import ModalBtn from "../Component/ModalBtn";
import DeleteGame from "./DeleteGame";
import { useState } from "react";
import { MyAPI } from "../Api/myApi";
import { useAuth } from "../Authentification/AuthContext";

function CardGame({ refreshData, dataGame }) {
  const [form, setForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const { token } = useAuth();

  function makeVisible() {
    setVisible(true);
  }

  async function fetchPutGame(game) {
    try {
      const putGame = await MyAPI.putGames(token, game);
      if (putGame) {
        console.log("Félications, votre jeu a été modifié avec succès");
      } else {
        console.log("Une erreur d'enregistrement de ton jeu est survenu !");
        alert("Une erreur d'enregistrement de ton jeu est survenu !");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function modifyGame(e) {
    e.preventDefault();
    /*
    quand je clique, affichage d'un form avec le même design que la carte.
    contient les info pré-rempli  avec les champs disponible à la modifications
    + bouton valider et annuler.
    bouton valider, fait un fetch vers le modify route.
    bouton annuler pour revenir à la card de base
    */
  }

  return (
    <>
      {visible ? (
        <form className="cardGame" onSubmit={modifyGame}>
          <input
            className="cardGame--input"
            type="text"
            placeholder={dataGame.game}
          />
          <select
            className="cardGame--plateforme"
            id="plateforme"
            name="plateforme"
          >
            <option value="">{dataGame.plateforme}</option>
            <option value="Switch">Switch</option>
            <option value="DS">DS</option>
            <option value="3DS">3 DS</option>
          </select>
          <select
            className="cardGame--obtention"
            id="obtention"
            name="obtention"
          >
            <option value="">{dataGame.obtention}</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>
          <button className="cardGame--btn" type="submit">
            <i className="fa-solid fa-circle-check"></i>
          </button>
          <button className="cardGame--btn-1" onClick={() => setVisible(false)}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </form>
      ) : (
        <ul className="cardGame">
          <li className="cardGame--item--1">{dataGame.game}</li>
          <li className="cardGame--item">{dataGame.plateforme}</li>
          <li className="cardGame--item">{dataGame.obtention}</li>
          <li className="cardGame--item--2">
            <button className="btn" onClick={makeVisible}>
              <i className="fa-solid fa-pen-fancy"></i>
            </button>
          </li>
          <li className="cardGame--item--2">
            <ModalBtn
              text={<i className="fa-solid fa-trash-can"></i>}
              content={<DeleteGame game={dataGame} refreshData={refreshData} />}
            />
          </li>
        </ul>
      )}
    </>
  );
}
export default CardGame;
