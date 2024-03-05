import { useAuth } from "../Authentification/AuthContext";
import { MyAPI } from "../Api/myApi";

function DeleteGame({ game, refreshData }) {
  const { token } = useAuth();

  async function deleteGame() {
    try {
      const gameToDelete = await MyAPI.deleteGame(token, game);
      if (gameToDelete) {
        console.log("Jeu supprimé");
      }
    } catch (error) {
      console.log(error);
    }
    refreshData();
  }
  return (
    <div className="delete__Container">
      <h3 className="delete__title">
        Souhaites-tu vraiment supprimer ce jeu : {game.game}
      </h3>
      <div className="delete__btnContainer">
        <button className="delete__btn" onClick={deleteGame}>
          Supprimer
        </button>
      </div>
    </div>
  );
}
export default DeleteGame;
