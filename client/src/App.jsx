import { useEffect, useState } from "react";

function App() {
	const [datasState, setDatasState] = useState(null);

	useEffect( () => {
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
            <main>
               {
               datasState.response.map( ( data ) => (
                    <article key={data.id}>
                        <h2>{data.main_title}</h2>
                        <p>{data.price} €</p>
                    </article>
                ))
                    
               }    
            </main>                    
        )
	}
}

export default App;
