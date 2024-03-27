import { useGame } from "./GameContext/GameContext";

function FiltrebtnGame({ name, plateformeType }) {
  const { gameFilter, gameFiltres } = useGame();

  //fonction pour le bouton qui permet d'enregistré le filtre sélectionné
  function haveGamesFilter(plateformeType) {
    gameFilter({ obtention: null, plateforme: plateformeType });
  }

  return (
    <button
      className={`btn-filtre ${
        gameFiltres.plateforme === plateformeType ? "activeFiltre" : ""
      }`}
      onClick={() => {
        haveGamesFilter(plateformeType);
      }}
    >
      {name}
    </button>
  );
}
export default FiltrebtnGame;
