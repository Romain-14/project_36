import { useEffect, useState } from "react";
import useMenu from "../../hooks/useMenu";
import { useCart } from "../../hooks/useCart";

import Loader from "../../components/Loader";
import noPicture from "../../assets/images/no-picture.jpg";

function Home() {
	const [products, setProducts] = useState(null);

	const { addToCart } = useCart();
	useMenu();

	useEffect(() => {
		// fonction asynchrone pour fetch sur notre serveur API les produits
		async function fetchData() {
			// utilisation de try/catch pour gérer les erreurs
			try {
				// on stock la réponse qui est en JSON dans une constante
				const response = await fetch(
					"http://localhost:9000/api/v1/product"
				);
				// La réponse envoyée étant en JSON on doit la parser pour la manipuler en JS
				const responseParsed = await response.json();
				// vérification de la réponse "parsée"
				console.log(responseParsed);
				// mise à jour de l'état de notre composant avec les données reçues, provoquera un nouveau rendu
				setProducts(responseParsed);
				console.log(products); // ici vaudra null, mise à jour asynchrone (sur le prochain rendu/montage)
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	// tant que les données ne sont pas récupérées fait patienter avec un loader
	if (!products) {
		return <Loader />;
	}

	// si les données sont récupérées on les affiche
	if (products) {
		return (
			<main id="home">
				<div className="banner"></div>
				<section>
					<h2>Promotion du moment !</h2>
					{products.response.map((product) => (
						<article key={product.id}>
							<h3>{product.main_title}</h3>
							<img
								src={
									product.src_img
										? "http://localhost:9000/images/" + product.src_img
										: noPicture
								}
								alt={product.main_title}
							/>
							<button onClick={() => addToCart(product)}>
								Ajouter au panier
							</button>
						</article>
					))}

					<h2>BIENTOT ?</h2>
					<h2>Nos meilleures ventes</h2>

					<h2>Nos nouveautés</h2>
					<h2>Nos Coup de coeur</h2>
				</section>
			</main>
		);
	}
}

export default Home;
