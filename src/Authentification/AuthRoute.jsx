import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/*
Ce fichier, sert à privatiser les routes afin que seul les personnes authentifier puisse
y accéder. POur cela on récupère le token, et on fait une ternaire. Si le token est bon
on accède à la page voulu, sinon, on est renvoyer vers la page d'accueil
*/
function AuthRoute({path, element}){ //les props ici vont être remplacer par le chemin adéquat
    const {token} = useAuth();
    const navigate = useNavigate();

    return token ? (
        <Route path={path} element={element}/>
    ) : ( navigate("/"));
}

export default AuthRoute;