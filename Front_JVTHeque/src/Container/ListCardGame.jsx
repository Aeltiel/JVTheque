import CardGame from "./CardGame";
import { useEffect, useState } from "react";
import { useGame } from "./GameContext/GameContext";

function ListCardGame({ gameData, refreshData }) {
  const { gameFiltres, gameFiltered } = useGame();
  const [gameTrier, setGameTrier] = useState([]);

  useEffect(() => {
    setGameTrier(gameFiltered());
  }, [gameFiltres]);

  console.log(gameFiltres);
  console.log(gameTrier);

  const gameDisplay = gameFiltres === null ? gameTrier : gameData;
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
