import { useEffect, useState } from "react";
import { useUser } from "./useUser";

function  useCheckAuth() {
    const { user, login } = useUser();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchAuthentication() {
			try {
				const response = await fetch(
					"http://localhost:9000/api/v1/auth",
					{
                        // dans la requête on envoie les cookies pour que le serveur puisse s'en servir afin de vérifier l'état de connexion
						credentials: "include",
					}
				);
                // on envoi un 401 depuis le serveur en JSON si c'est le cas "utilisateur non connecté on stoppe la fonction avec un return"
				if (response.status === 401) {
					console.log("Unauthorized");
					return;
				}
                // si la réponse est ok, on récupère les données de l'utilisateur envoyé en JSON qu'on parse et on les stocke dans le state setUser, qui est un state d'un context User
				if (response.ok) {
					const data = await response.json();
					login(data.user);
				} else {
					console.log(`Server error: ${response.status}`);
				}
			} catch (error) {
				console.log(`Fetch error: ${error.message}`);
			} finally {
                // le finally est utilisé afin d'executer une/plusieurs instructions dans tous les cas de figure (succès, erreur, etc...)
                // ici on arrete "le chargement" et on oriente vers le bon router
				setIsLoading(false);
			}
		}
        setTimeout(() => {
            fetchAuthentication();
        }, 2000);
	}, []);


    return [user, isLoading ];
}

export {useCheckAuth};