import { useAuth } from "../../Authentification/AuthContext";

function AddGame({ refreshData }) {
  const { token } = useAuth();
  const { userID } = useAuth();

  let newGame = {};
  let regGame = /^[A-Za-z0-9\sÀ-ÿ:]{1,100}$/;

  //fonction de fetch (test d'externaliser le fetch pour régler le problème de double clic sur le bonton "envoyer")
  async function gameFetch(newGame) {
    try {
      const fetchGame = await fetch("http://localhost:3000/api/game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newGame),
      });

      if (!fetchGame.ok) {
        console.log("Erreur lors de l'ajout du jeu " + fetchGame.status);
        return;
      }
      console.log("Félications, votre jeu est bien enregistré");
    } catch (error) {
      console.log(error);
    }
  }

  //fonction qui me permet d'ajouter les données du formulaire sous forme d'objet à la soumission du form
  async function AddNewGame(event) {
    event.preventDefault(); //Pour empêcher le rechargement de la page

    //Récupération des données de chaque champs du formulaire
    const jeu = event.target.game.value;
    const plateforme = event.target.plateforme.value;
    const obtenu = event.target.obtention.value;

    //vérifier les données du formulaire
    if (regGame.test(jeu) === false || jeu === "") {
      alert("Le nom du jeu est incorrect");
      event.preventDefault();
    } else {
      // création d'un nouvel objet avec les données de mon formulaire récupéré plus haut
      newGame = {
        id: userID,
        game: jeu,
        plateforme: plateforme,
        obtention: obtenu,
      };
    }

    await gameFetch(newGame);
    refreshData();

    //Reset du formulaire après chaque validation
    event.target.reset();
  }

  if (token) {
    return (
      <form onSubmit={AddNewGame} className="formContainer">
        <label htmlFor="jeu">Jeu : </label>
        <input type="text" id="game" name="game" />
        <label htmlFor="plateforme">Plateforme : </label>
        <select id="plateforme" name="plateforme">
          <option value="">Choisi la plateforme de ton jeu</option>
          <option value="Switch">Switch</option>
          <option value="DS">DS</option>
          <option value="3DS">3 DS</option>
        </select>
        <label htmlFor="obtenu">Obtenu : </label>
        <select id="obtention" name="obtention">
          <option value=""></option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>
        <button>Ajouter</button>
      </form>
    );
  } else {
    //mettre un composant indiquant la redirection et la nécessisté de se co
  }
}
export default AddGame;
