import { useState } from "react";

function DeleteGame({ game }) {
  return (
    <div className="delete__Container">
      <h3>Souhaitez-vous vraiment supprimer un jeu</h3>
      <div className="delete__btnContainer">
        <button className="delete__btn">Supprimer</button>
        <button className="delete__btn">Annuler</button>
      </div>
    </div>
  );
}
export default DeleteGame;
