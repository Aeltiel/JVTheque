import { Link } from "react-router-dom";

function NavBarSecond() {
  return (
    <nav>
      <Link to="/userPage">Tes Jeux</Link>
      <Link to="/userPage/game">Jeux récents</Link>
      <Link to="/userPage/retroGame">Jeux rétro</Link>
    </nav>
  );
}

export default NavBarSecond;
