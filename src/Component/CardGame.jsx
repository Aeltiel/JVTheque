import ModalBtn from "./ModalBtn";
import DeleteGame from "./DeleteGame";
import { useState } from "react";

function CardGame({ refreshData, dataGame }) {
  const [form, setForm] = useState(false);
  function modifyGame(e) {
    e.preventDefault();
    /*
    quand je clique, affichage d'un form avec le même design que la carte.
    contient les info pré-rempli  avec les champs disponible à la modifications
    + bouton valider et annuler.
    bouton valider, fait un fetch vers le modify route.
    bouton annuler pour revenir à la card de base
    */
    return (
      <form className="cardGame">
        <input type="text" />
        <select id="plateforme" name="plateforme">
          <option value="">Choisi la plateforme de ton jeu</option>
          <option value="Switch">Switch</option>
          <option value="DS">DS</option>
          <option value="3DS">3 DS</option>
        </select>
        <select id="obtention" name="obtention">
          <option value=""></option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>
        <button>
          <i className="fa-solid fa-circle-check"></i>
        </button>
        <button>
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </form>
    );
  }

  return (
    <ul className="cardGame">
      <li className="cardGame--item--1">{dataGame.game}</li>
      <li className="cardGame--item">{dataGame.plateforme}</li>
      <li className="cardGame--item">{dataGame.obtention}</li>
      <li className="cardGame--item--2">
        <button className="btn" onClick={modifyGame}>
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
  );
}
export default CardGame;
