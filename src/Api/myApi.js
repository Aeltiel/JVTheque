export class MyAPI {
  static async postSignIn(form) {
    const sendSignIn = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!sendSignIn.ok) {
      console.log("sendSignIn échoué avec le statut : " + sendSignIn.status);
      return;
    }
    const signIn = await sendSignIn.json();
    return signIn;
  }

  static async postLogIn(form) {
    const sendLog = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!sendLog) {
      console.log("sendLog échoué avec le statut : " + sendLog.status);
      return;
    }
    const log = await sendLog.json();
    return log;
  }

  static async getGames(token) {
    const response = await fetch("http://localhost:3000/api/game", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response) {
      console.log("Requête échouée avec le status : " + response.status);
      return;
    }
    const dataGame = await response.json();
    return dataGame;
  }

  static async postGames(token, newGame) {
    const sendGame = await fetch("http://localhost:3000/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newGame),
    });

    if (!sendGame) {
      console.log("Erreur lors de l'ajout du jeu " + sendGame.status);
      return;
    }
    const response = await sendGame.json();
    return response;
  }

  static async putGames(token, game) {
    const sendModifyGame = await fetch(
      `http://localhost:3000/api/game/${game._id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(game),
      }
    );
    if (!sendModifyGame) {
      console.log(
        "Erreur lors de la modification du jeu : " + sendModifyGame.status
      );
      return;
    }
    const response = await sendModifyGame.json();
    return response;
  }

  static async deleteGame(token, game) {
    const deleteTheGame = await fetch(
      `http://localhost:3000/api/game/${game._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!deleteTheGame) {
      console.log("Erreur lors de la suppression : " + deleteTheGame.status);
      return;
    }
    const response = await deleteTheGame.json();
    return response;
  }
}
