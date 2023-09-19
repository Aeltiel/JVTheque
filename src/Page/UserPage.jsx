import { useState, useEffect } from "react";
import { useAuth } from "../Authentification/AuthContext";
import { MyAPI } from "../Api/myApi";
import AddGame from "../Component/Forms/AddGame";
import CardGame from "../Component/CardGame";
import NotFound from "../Component/NotFound";

function UserPage() {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

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
  }, []);

  console.log(gameData);

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  if (token) {
    return (
      <main>
        <AddGame refreshData={refreshData} />
        <div className="listContainer">
          <h3 className="listContainer__title">
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
