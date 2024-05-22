import { useEffect, useState } from "react";
import UseMenu from "../../hooks/UseMenu";

import noPicture from "../../assets/images/no-picture.jpg";

function Home() {
	const [datasState, setDatasState] = useState(null);

	UseMenu();

	useEffect(() => {
		// fonction asynchrone pour fetch sur notre serveur API les produits
		async function fetchData() {
			// utilisation de try/catch pour gérer les erreurs
			try {
				// on stock la réponse qui est en JSON dans une constante
				const datas = await fetch(
					"http://localhost:9000/api/v1/product"
				);
				// La réponse envoyée étant en JSON on doit la parser pour la manipuler en JS
				const datasParsed = await datas.json();
				// vérification de la réponse "parsée"
				console.log(datasParsed);
				// mise à jour de l'état de notre composant avec les données reçues, provoquera un nouveau rendu
				setDatasState(datasParsed);
				console.log(datasState); // ici vaudra null, mise à jour asynchrone (sur le prochain rendu/montage)
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	// tant que les données ne sont pas récupérées on affiche un message de chargement
	if (!datasState) {
		return <div>Loading...</div>;
	}

	// si les données sont récupérées on les affiche
	if (datasState) {
		return (
			<main id="home">
				<div className="banner"></div>
				<section>
					<h2>Promotion du moment !</h2>
					{datasState.response.map((data) => (
						<article key={data.id}>
							<h3>{data.main_title}</h3>
							<img src={noPicture} alt={data.main_title} />
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
