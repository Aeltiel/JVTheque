import { createContext, useContext, useState } from "react";

/*Ce fichier me permet de créer un hook personnalisé qui va géré le système d'authentification
de l'application, via le createContext et le useContext.
En enregistrant le token dans le localStorage ainsi que dans le state, me permet d'avoir accès
à ce dernier n'importe quand sans ce soucier du rafraichissement de la page ou d'un changement
de page
*/

const AuthContext = createContext(); //création du contexte d'authentification

//création d'un hook personnaliser pour utiliser mon context partout où j'en ai besoin
export function useAuth() {
    return useContext(AuthContext);
}

//le provider qui va englober mon application et permettre l'usage du hook personnaliser partout où il faut
export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    //fonction pour enregistré le token dans le local storage
    function updateToken(newToken){
        setToken(newToken);
        localStorage.setItem('token', newToken);
    }
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

