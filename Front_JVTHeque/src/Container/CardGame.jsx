import ModalBtn from "../Component/ModalBtn";
import DeleteGame from "./DeleteGame";
import { useState } from "react";
import { MyAPI } from "../Api/myApi";
import { useAuth } from "../Authentification/AuthContext";

function CardGame({ refreshData, dataGame }) {
  const [game, setGame] = useState(dataGame.game);
  const [plateforme, setPlateforme] = useState(dataGame.plateforme);
  const [obtention, setObtention] = useState(dataGame.obtention);
  const [visible, setVisible] = useState(false);
  const { token } = useAuth();

  function makeVisible() {
    setVisible(true);
  }

  async function fetchPutGame(game) {
    try {
      const putGame = await MyAPI.putGames(token, dataGame, game);
      if (putGame.error) {
        console.log("Une erreur d'enregistrement de ton jeu est survenu !");
        alert("Une erreur d'enregistrement de ton jeu est survenu !");
      } else {
        console.log("Félications, votre jeu a été modifié avec succès");
        console.log(putGame);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function modifyGame(e) {
    e.preventDefault();
    let regGame = /^[A-Za-z0-9\sÀ-ÿ:]{1,100}$/;
    const modifiedGame = {};
    if (game !== dataGame.game) {
      if (regGame.test(game)) {
        modifiedGame.game = game;
      } else if (game === "") {
        alert("Si tu souhaites supprimer ton jeu, cliques sur la corbeille");
        setVisible(false);
        return;
      } else {
        alert("Le nom du jeu n'est pas valide");
        return;
      }
    }

    if (plateforme !== dataGame.plateforme) {
      modifiedGame.plateforme = plateforme;
    }

    if (obtention !== dataGame.obtention) {
      modifiedGame.obtention = obtention;
    }
    console.log(modifiedGame);
    await fetchPutGame(modifiedGame);
    setVisible(false);
    refreshData();
  }

  return (
    <>
      {visible ? (
        <form className="cardGame" onSubmit={modifyGame}>
          <input
            className="cardGame--input"
            type="text"
            value={game}
            onChange={(e) => setGame(e.target.value)}
          />
          <select
            className="cardGame--plateforme"
            value={plateforme}
            onChange={(e) => setPlateforme(e.target.value)}
          >
            <option value="">{dataGame.plateforme}</option>
            <option value="Switch">Switch</option>
            <option value="DS">DS</option>
            <option value="3DS">3 DS</option>
          </select>
          <select
            className="cardGame--obtention"
            value={obtention}
            onChange={(e) => setObtention(e.target.value)}
          >
            <option value="">{dataGame.obtention}</option>
            <option value="Jeu obtenu">Jeu obtenu</option>
            <option value="Wishlist">Wishlist</option>
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
