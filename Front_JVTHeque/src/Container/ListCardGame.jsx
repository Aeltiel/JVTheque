import CardGame from "./CardGame";
import { useEffect, useState } from "react";
import { useGame } from "./GameContext/GameContext";

function ListCardGame({ gameData, refreshData }) {
  const { gameFiltres } = useGame();
  const [gameTrier, setGameTrier] = useState([]);

  function gameFiltered() {
    let tri = [];
    if (gameFiltres !== null) {
      gameData.forEach((game) => {
        if (
          game.obtention === gameFiltres.obtention ||
          game.plateforme === gameFiltres.plateforme
        ) {
          tri.push(game);
        }
      });
    }
    setGameTrier(tri);
  }
  useEffect(() => {
    gameFiltered();
  }, [gameFiltres]);

  useEffect(() => {}, []);

  const gameDisplay =
    gameFiltres.obtention === null && gameFiltres.plateforme === null
      ? gameData
      : gameTrier;

  return (
    <div>
      {Array.isArray(gameDisplay) &&
        gameDisplay.map((game) => (
          <CardGame key={game._id} dataGame={game} refreshData={refreshData} />
        ))}
    </div>
  );
}

export default ListCardGame;
