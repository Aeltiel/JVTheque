import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = useState(false);

  function close() {
    if (open === true) {
      setOpen(false);
    }
  }

  const userIcon = (
    <ul className="userNav">
      <li className="userLi">
        <NavLink to="/userPage">Mes jeux</NavLink>
      </li>
      <li className="userLi">
        <button className="userLi--btn">Déconnexion</button>
      </li>
    </ul>
  );

  return (
    <nav className="navBarMobile">
      <NavLink to="/" className="navLink">
        <i className="fa-solid fa-house"></i>
      </NavLink>
      <button
        className="navLinkBtn"
        onClick={() => {
          setOpen(true);
          close();
        }}
      >
        <i className="fa-solid fa-circle-user"></i>
      </button>
      {open && userIcon}
    </nav>
  );
}
export default NavBar;
