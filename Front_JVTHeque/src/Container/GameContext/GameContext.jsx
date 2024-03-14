import { createContext, useContext, useState, useEffect } from "react";
import { MyAPI } from "../../Api/myApi";
import { useAuth } from "../../Authentification/AuthContext";

/*création d'un context pour centraliser tous les tableaux générés par les filtres 
et les utiliser dans les composants qui le nécessite
*/

const gameContext = createContext();

//création du provider qui va englober les pages et sous pages UserPage pour géré les données filtrer
export function GameProvider({ children }) {
  const [allGames, setAllGames] = useState([]);
  const [recentGames, setRecentGame] = useState([]);
  const [retroGames, setRetroGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [gameFiltres, setGameFiltres] = useState({
    obtention: null,
    plateforme: null,
  });

  //récupération de tous les jeux
  async function fetchAllData() {
    try {
      const dataGame = await MyAPI.getGames(token);
      setAllGames(dataGame);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  //fonction de callback pour rafraichir les données suite à l'ajout d'un jeu sur le all data
  async function refreshAllData() {
    setLoading(true);
    await fetchAllData();
  }

  //récupération des jeux récents
  async function fetchRecentData() {
    try {
      const dataRecentGame = await MyAPI.getRecentGames(token);
      setRecentGame(dataRecentGame);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function refreshRecentData() {
    setLoading(true);
    await fetchRecentData();
  }

  //récupération des jeux rétro
  async function fetchRetroData() {
    try {
      const dataRetroGame = await MyAPI.getRetroGames(token);
      setRetroGames(dataRetroGame);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function refreshRetroData() {
    setLoading(true);
    await fetchRetroData();
  }

  useEffect(() => {
    if (token) {
      fetchAllData();
      fetchRecentData();
      fetchRetroData();
    }
  }, [token]);

  function gameFilter(newFilter) {
    setGameFiltres(newFilter);
  }

  //reset des filtres
  function resetFilter() {
    setGameFiltres({
      obtention: null,
      plateforme: null,
    });
  }

  return (
    <gameContext.Provider
      value={{
        allGames,
        recentGames,
        retroGames,
        loading,
        refreshAllData,
        refreshRecentData,
        refreshRetroData,
        gameFilter,
        gameFiltres,
        resetFilter,
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

// création du hook personaliser pour les tableaux filtrer des jeux
export function useGame() {
  return useContext(gameContext);
}
