import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faCartShopping,
	faUser,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../../../hooks/UseUser";
import useMenu from "../../../hooks/UseMenu";
import logo from "../../../assets/images/logo.png";

function Header() {
	const { user, setUser } = useUser();
	const { isMenuOpen, toggleMenu } = useMenu();

	async function logoutHandler() {
		const response = await fetch(
			"http://localhost:9000/api/v1/auth/logout",
			{
				credentials: "include",
			}
		);
		if (response.ok) {
			setUser(null);
            toggleMenu();
		}
	}

	return (
		<header>
			{isMenuOpen && <div className="overlayOn" onClick={toggleMenu} />}
			<div>
				<button onClick={toggleMenu}>
					<FontAwesomeIcon icon={faBars} />
				</button>
				<h1>
					<Link to={"/"}>
						<img src={logo} />
					</Link>
				</h1>
			</div>

			{isMenuOpen && (
				<nav className="burger-menu">
					<button onClick={toggleMenu}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
					<Link to={"/"}>Page d&apos;accueil Roshop</Link>
					<hr />

					<Link to={"/"}>En promotion !</Link>

					<Link to={"/"}>Nos meilleures ventes</Link>

					<Link to={"/"}>Nos nouveautés</Link>
					<Link to={"/"}>Nos Coup de coeur</Link>

					{user && (
						<>
							<NavLink to={"/dashboard"} className={"bar-nav"}>
								Compte
							</NavLink>
							<button
								onClick={logoutHandler}
								className={"bar-nav"}
							>
								Déconnexion
							</button>
						</>
					)}
				</nav>
			)}
			<nav>
				{!user && (
					<NavLink to={"login"} className={"bar-nav"}>
						Connexion
					</NavLink>
				)}
				{user && (
					<>
						<NavLink to={"/dashboard"} className={"bar-nav"}>
							{user.nickname} <FontAwesomeIcon icon={faUser} />
						</NavLink>
					</>
				)}
				<NavLink to={"cart"}>
					<FontAwesomeIcon icon={faCartShopping} />
				</NavLink>
			</nav>

			<form>
				<input type="search" name="" id="" placeholder="Rechercher un produit"/>
			</form>
		</header>
	);
}

export default Header;

//
