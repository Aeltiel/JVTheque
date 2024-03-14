import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Authentification/AuthContext";
import { useGame } from "../Container/GameContext/GameContext";
import NavBarSecond from "../Component/Layout/NavBarSecond";
import NotFound from "../Component/NotFound";
import Filtres from "../Container/Filtres";
import ListCardGame from "../Container/ListCardGame";
import { useEffect } from "react";

function UserPage() {
  const location = useLocation();
  const { token } = useAuth();
  const { pseudo } = useAuth();
  const { allGames, loading, refreshAllData } = useGame();

  /*useEffect(() => {
    refreshAllData();
  }, []);*/

  //récupère l'url pour un affichage conditionnel
  const currentPath = location.pathname;

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  if (token) {
    return (
      <main>
        <h2 className="text-center">
          Bienvenue {pseudo} ! Quel nouveau jeu as-tu dans ta collection ?
        </h2>

        <NavBarSecond />
        {currentPath === "/userPage" ? (
          <>
            <Filtres />

            <div className="my-6">
              <h3 className="mb-4 text-cyan-800 font-bold text-lg">
                <i className="fa-solid fa-clipboard-list"></i>
                Tous tes Jeux :
              </h3>
              {!Array.isArray(allGames) ||
              (Array.isArray(allGames) && allGames.length === 0) ? (
                <NotFound
                  text={
                    "Désolé, il semblerait que tu n'ai pas de jeu enregistré pour le moment. Rajoutes-en un !"
                  }
                />
              ) : (
                <>
                  <ListCardGame
                    gameData={allGames}
                    refreshData={refreshAllData}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    );
  }
}
export default UserPage;
