import { useAuth } from "../Authentification/AuthContext";
import { useGame } from "../Container/GameContext/GameContext";
import AddGame from "../Container/Forms/AddGame";
import CardGame from "../Container/CardGame";
import NotFound from "../Component/NotFound";
import Filtres from "../Container/Filtres";
import ListCardGame from "../Container/ListCardGame";

function UserGames() {
  const { token } = useAuth();
  const { recentGames, refreshRecentData, loading } = useGame();

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  if (token) {
    return (
      <>
        <AddGame refreshData={refreshRecentData} />

        <Filtres />

        <div className="my-6">
          <h3 className="mb-4 text-cyan-800 font-bold text-lg">
            <i className="fa-solid fa-clipboard-list"></i>
            Tes Jeux :
          </h3>
          {!Array.isArray(recentGames) ||
          (Array.isArray(recentGames) && recentGames.length === 0) ? (
            <NotFound
              text={
                "Désolé, il semblerait que tu n'ai pas de jeu enregistré pour le moment. Rajoutes-en un !"
              }
            />
          ) : (
            <>
              <ListCardGame
                gameData={recentGames}
                refreshData={refreshRecentData}
              />
            </>
          )}
        </div>
      </>
    );
  }
}
export default UserGames;
