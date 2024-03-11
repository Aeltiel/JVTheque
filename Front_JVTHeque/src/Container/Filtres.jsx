import { useGame } from "./GameContext/GameContext";

function Filtres() {
  const { gameFilter } = useGame();

  function haveGamesFilter(obtentionType) {
    gameFilter({ obtention: obtentionType });
  }
  return (
    <div className="my-6">
      <p>Tu veux trier tes jeux en fonction de : </p>
      <button
        onClick={() => {
          haveGamesFilter("Oui");
        }}
      >
        Jeux obtenus
      </button>
      <button
        onClick={() => {
          haveGamesFilter("whishlist");
        }}
      >
        {" "}
        Ta Whishlist
      </button>
    </div>
  );
}

export default Filtres;
