import { NavLink } from "react-router-dom";

function Header() {

	function logoutHandler() {
		fetch("http://localhost:9000/api/v1/auth/logout", {
			credentials: "include",
		});
	}

	return (
		<header>
			<nav>
				<NavLink to={"/"}>Home</NavLink>
				<NavLink to={"authentication"}>Connexion</NavLink>
				<button onClick={logoutHandler}>Déconnexion</button>
			</nav>
		</header>
	);
}

export default Header;
