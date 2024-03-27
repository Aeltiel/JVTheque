import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentification/AuthContext";

function NavBar() {
  const [open, setOpen] = useState(false);
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenuClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenuClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeMenuClickOutside);
    };
  }, [menuRef]);

  //fonction d'ouverture du menu quand on clique sur l'icon user dans le menu
  function close() {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  //function de déconnexion et de redirection
  function disconnect() {
    logOut();
    close();
    navigate("/");
  }

  const userIcon = (
    <ul className="userNav" ref={menuRef}>
      <li className="userLi">
        <NavLink to="/userPage" onClick={close}>
          Mes jeux
        </NavLink>
      </li>
      <li className="userLi">
        <button className="userLi--btn" onClick={disconnect}>
          Déconnexion
        </button>
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
