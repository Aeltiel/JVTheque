import { NavLink } from "react-router-dom"

function NavBar(){
    return(
        <nav className="navBarMobile">
            <NavLink to='/' className="navLink"><i className="fa-solid fa-house"></i></NavLink>
            <NavLink to='/userPage' className="navLink"><i className="fa-solid fa-circle-user"></i></NavLink>
        </nav>
    )
}
export default NavBar