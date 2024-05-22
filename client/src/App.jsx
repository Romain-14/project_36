import { useCheckAuth } from "./hooks/useCheckAuth";

import UserRouter from "./router/UserRouter";
import AdminRouter from "./router/AdminRouter";
import Loader from "./components/Loader";

function App() {
	// a chaque refresh de la page, on vérifie si l'utilisateur est connecté (et si c'est un admin) afin de rediriger vers le bon router
	const [user, isLoading] = useCheckAuth();

	// de base on affiche un message de chargement
	if (isLoading) {
        console.log("loading APP")
        return <Loader />;
		
	}

	// quand le chargement est terminé, on redirige vers le bon router
	// si l'utilisateur est un admin, on redirige vers le router admin
	// sinon vers le router user (qui est le router par défaut)
	if (user.isAdmin) {
		return <AdminRouter />;
	} else return <UserRouter />;
}

export default App;
