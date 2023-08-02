import { useState, useEffect } from "react";
import { useAuth } from "../Authentification/AuthContext";
import AddGame from "../Component/Forms/AddGame";

function UserPage() {
  const [gameData, setGameData] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  //fonction d'appel à mon api
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/api/game", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response) {
        console.log("Requête échouée avec le status : " + response.status);
        return;
      }

      const dataGame = await response.json();
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
    fetchData();
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
            Vos Jeux :{" "}
          </h3>
          {gameData.map((game) => (
            <ul className="cardGame" key={game._id}>
              <li className="cardGame--item--1">{game.game}</li>
              <li className="cardGame--item">{game.plateforme}</li>
              <li className="cardGame--item">{game.obtention}</li>
              <li className="cardGame--item">
                <i className="fa-solid fa-trash-can"></i>
              </li>
              <li className="cardGame--item">
                <i className="fa-solid fa-pen-fancy"></i>
              </li>
            </ul>
          ))}
        </div>
      </main>
    );
  } else {
    //mettre un composant de redirection
  }
}
export default UserPage;
