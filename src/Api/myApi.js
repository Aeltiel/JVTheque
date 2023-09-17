export class MyAPI {
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
}
