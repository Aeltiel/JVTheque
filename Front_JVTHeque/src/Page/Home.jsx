import ModalBtn from "../Component/ModalBtn";
import SignIn from "../Container/Forms/SignIn";
import LogIn from "../Container/Forms/LogIn";

function Home() {
  return (
    <main>
      <section className="mb-6 descriptionContainer ">
        <h2 className="text-purple-800 text-center text-lg font-bold mb-2">
          Suivez et gérez votre liste de Jeux Vidéos !!
        </h2>
        <p className="descriptionContainer__text">
          Vous souhaitez consulter à tous moment votre ludothèque, la trier, la
          compléter? Vous êtes au bon endroit !! Plus de risque d'acheter un jeu
          en double par mégarde ici vous pouvez :
        </p>
        <ul className="descriptionContainer__list">
          <li>Ajouter</li>
          <li>Trier</li>
          <li>Modifier</li>
        </ul>
        <p className="descriptionContainer__text">
          Votre collection comme bon vous semble ! Il ne vous rest plus qu'une
          chose à faire : vous connecter
          <i className="fa-regular fa-hand-point-down"></i>
        </p>
      </section>

      <div className="text-center border-2 border-solid border-cyan-800 rounded-md mb-4">
        <p className="mt-1.5">Vous êtes nouveau ? Inscrivez-vous : </p>
        <ModalBtn text={"S'inscrire"} content={<SignIn />} />

        <p className="connexion__text">Nouveau membre ? Connectez-vous : </p>
        <ModalBtn text={"Se Connecter"} content={<LogIn />} />
      </div>

      <section className="actualité"></section>
      <h2 className="text-purple-800 text-center text-lg font-bold mb-2">
        Les dernières actualités du site
      </h2>
      <p>En cours de construction</p>
    </main>
  );
}
export default Home;
