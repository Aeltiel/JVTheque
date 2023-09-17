import { useAuth } from "../Authentification/AuthContext";

function DeleteGame({ game, refreshData }) {
  const { token } = useAuth();

  async function deleteGame() {
    try {
      const gameToDelete = await fetch(
        `http://localhost:3000/api/game/${game._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!gameToDelete.ok) {
        console.log("Erreur lors de la suppression : " + gameToDelete.status);
        return;
      }
      console.log("Jeu supprimé");
      alert("Le jeu a bien été supprimé");
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
