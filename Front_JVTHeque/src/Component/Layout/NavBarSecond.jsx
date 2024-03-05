import { Link } from "react-router-dom";

function NavBarSecond() {
  return (
    <div className="flex justify-center">
      <nav className="text-center w-full flex justify-between mt-4 md:w-2/4">
        <Link
          to="/userPage"
          className="text-black visited:text-black border-2 border-purple-800 rounded-md p-1 md:hover:bg-purple-200"
        >
          Tes Jeux
        </Link>
        <Link
          to="/userPage/game"
          className="text-black visited:text-black border-2 border-purple-800 rounded-md p-1 md:hover:bg-purple-200"
        >
          Jeux récents
        </Link>
        <Link
          to="/userPage/retroGame"
          className="text-black visited:text-black border-2 border-purple-800 rounded-md p-1 md:hover:bg-purple-200"
        >
          Jeux rétro
        </Link>
      </nav>
    </div>
  );
}

export default NavBarSecond;
