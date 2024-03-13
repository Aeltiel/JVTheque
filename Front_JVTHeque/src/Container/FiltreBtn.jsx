import { useGame } from "./GameContext/GameContext";

function FiltreBtn({ name, obtentionType }) {
  const { gameFilter, gameFiltres } = useGame();

  //fonction pour le bouton qui permet d'enregistré le filtre sélectionné
  function haveGamesFilter(obtentionType) {
    gameFilter({ obtention: obtentionType });
  }

  return (
    <button
      className={`btn-filtre ${
        gameFiltres.obtention === obtentionType ? "activeFiltre" : ""
      }`}
      onClick={() => {
        haveGamesFilter(obtentionType);
      }}
    >
      {name}
    </button>
  );
}
export default FiltreBtn;
