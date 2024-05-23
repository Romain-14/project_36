import { useEffect, useState } from "react";
// const API_URL = import.meta.env.VITE_API_URL;
import { customFetch } from "../services/api";

function useFetchProduct() {
	const [products, setProducts] = useState(null);

	useEffect(() => {
		// fonction asynchrone pour fetch sur notre serveur API les produits
		async function fetchData() {
			// utilisation de try/catch pour gérer les erreurs
			try {
				// on stock la réponse qui est en JSON dans une constante
				// const response = await fetch(API_URL + "/api/v1/product");
				const response = await customFetch("/product", "POST");
				// La réponse envoyée étant en JSON on doit la parser pour la manipuler en JS
				const responseParsed = await response.json();
				// vérification de la réponse "parsée" console.log(responseParsed);
				
				// mise à jour de l'état de notre composant avec les données reçues, provoquera un nouveau rendu
				setProducts(responseParsed);
				// ici vaudra null, mise à jour asynchrone (sur le prochain rendu/montage) console.log(products); 
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return [products];
}

export default useFetchProduct;
