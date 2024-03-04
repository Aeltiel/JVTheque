import { useState, useEffect } from "react";
import { useAuth } from "../Authentification/AuthContext";
import { MyAPI } from "../Api/myApi";
import AddGame from "../Container/Forms/AddGame";
import CardGame from "../Container/CardGame";
import NotFound from "../Component/NotFound";

function UserPage() {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { pseudo } = useAuth();

  //fonction d'appel à mon api
  async function fetchData() {
    try {
      const dataGame = await MyAPI.getGames(token);
      setGameData(dataGame);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //fonction de callback pour rafraichir les données suite à l'ajout d'un jeu
  async function refreshData() {
    setLoading(true);
    await fetchData();
  }

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  if (token) {
    return (
      <main>
        <h2 className="text-center">
          Bienvenue {pseudo} ! Quel nouveau jeu as-tu dans ta collection ?
        </h2>
        <AddGame refreshData={refreshData} />
        <div className="my-6">
          <h3 className="mb-4 text-cyan-800 font-bold text-lg">
            <i className="fa-solid fa-clipboard-list"></i>
            Vos Jeux :
          </h3>
          {!Array.isArray(gameData) ||
          (Array.isArray(gameData) && gameData.length === 0) ? (
            <NotFound
              text={
                "Désolé, il semblerait que tu n'ai pas de jeu enregistré pour le moment. Rajoutes-en un !"
              }
            />
          ) : (
            <>
              {Array.isArray(gameData) &&
                gameData.map((game) => (
                  <CardGame
                    key={game._id}
                    dataGame={game}
                    refreshData={refreshData}
                  />
                ))}
            </>
          )}
        </div>
      </main>
    );
  }
}
export default UserPage;
