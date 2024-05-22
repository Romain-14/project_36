import { Link } from "react-router-dom";

function Home() {
	return (
		<main>
			<h1>BACK OFFICE</h1>
			<nav>
				<Link to="/user">Utilisateurs</Link>
				<Link to="/product"><strong>Produits</strong></Link>
				<Link to="/category">Catégories</Link>
				<Link to="/order">Commandes</Link>
			</nav>
		</main>
	);
}

export default Home;
