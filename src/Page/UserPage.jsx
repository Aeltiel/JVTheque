import { useState } from "react";
import { useAuth } from "../Authentification/AuthContext";
import AddGame from "../Component/Forms/AddGame";

function UserPage() {
    const { token } = useAuth();

    if (token) {
        return (
            <main>
                <AddGame />

                <div className="listContainer">
                    <h3 className="listContainer__title">
                        <i className="fa-solid fa-clipboard-list"></i>
                        Vos Jeux : </h3>
                    {/* {dataGame.map(game => ( 
                        <ul className="cardGame" key={game.id}>
                            <li className="cardGame--item--1">{game.game}</li>
                            <li className="cardGame--item">{game.plateforme}</li>
                            <li className="cardGame--item">{game.obtention}</li>
                            <li className="cardGame--item"><i className="fa-solid fa-trash-can"></i></li>
                            <li className="cardGame--item"><i className="fa-solid fa-pen-fancy"></i></li>
                        </ul>
                    ))}*/}
                </div>
            </main>
        )
    } else {
        //mettre un composant de redirection
    }
}
export default UserPage