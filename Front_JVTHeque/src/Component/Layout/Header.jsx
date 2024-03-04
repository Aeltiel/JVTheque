import NavBar from "./NavBar";

function Header() {
  return (
    <header className="pt-2.5 mb-8">
      <i className="fa-solid fa-gamepad"></i>
      <h1>Suivez votre liste de Jeux Vidéos</h1>
      <i className="fa-solid fa-gamepad"></i>
      <NavBar />
    </header>
  );
}
export default Header;
