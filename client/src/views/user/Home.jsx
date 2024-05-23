import useMenu from "../../hooks/useMenu";
import Loader from "../../components/Loader";
import Card from "./components/Card";
import useFetchProduct from "../../hooks/useFetchProduct";

function Home() {
	const [products] = useFetchProduct();
	useMenu();

	// tant que les données ne sont pas récupérées fait patienter avec un loader
	if (!products) return <Loader />;

	// si les données sont récupérées on les affiche
	if (products) {
		return (
			<main id="home">
				<div className="banner"></div>
				<section>
					<h2>Promotion du moment !</h2>

					{products.response.map((product) => (
						<Card key={product.id} product={product} />
					))}
					<hr />
					<h2>Nos meilleures ventes</h2>
					<p>soon</p>

					<hr />
					<h2>Nos nouveautés</h2>
					<p>soon</p>

					<hr />
					<h2>Nos Coup de coeur</h2>
					<p>soon</p>
				</section>
			</main>
		);
	}
}

export default Home;
