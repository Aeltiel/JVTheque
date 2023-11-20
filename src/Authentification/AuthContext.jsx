import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/*Ce fichier me permet de créer un hook personnalisé qui va géré le système d'authentification
de l'application, via le createContext et le useContext.
En enregistrant le token dans le localStorage ainsi que dans le state, me permet d'avoir accès
à ce dernier n'importe quand sans ce soucier du rafraichissement de la page ou d'un changement
de page
*/

const AuthContext = createContext(); //création du contexte d'authentification

//le provider qui va englober mon application et permettre l'usage du hook personnaliser partout où il faut
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userID, setUserID] = useState(localStorage.getItem("userId") || "");
  const [pseudo, setPseudo] = useState(localStorage.getItem("pseudo") || "");
  //const navigate = useNavigate();

  //fonction pour enregistré le token dans le local storage
  function updateToken(newToken, newId, newPseudo) {
    setToken(newToken);
    setUserID(newId);
    setPseudo(newPseudo);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newId);
    localStorage.setItem("pseudo", newPseudo);
  }

  //fonction de déconnexion passant par la suppression des données présente dans le LocalStorage
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("pseudo");

    setToken("");
    setUserID("");
    setPseudo("");
  }

  /*useEffect(() => {
    function validateToken() {
      try {
        const decodeToken = jwt_decode(token); //permet de décoder le token
        const expireToken = Date.now() >= decodeToken.exp * 1000; //permet de comparé la date actuelle avec la date du token
        if (expireToken) {
          logOut();
          navigate("/");
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token : " + error);
      }
    }

    validateToken();
  }, [token]);*/

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userID,
        setUserID,
        updateToken,
        pseudo,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//création d'un hook personnaliser pour utiliser mon context partout où j'en ai besoin
export function useAuth() {
  return useContext(AuthContext);
}
