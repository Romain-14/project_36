import bcrypt from "bcrypt";
import Query from "../model/Query.js";

// Fonction de connexion (login)
const login = async (req, res) => {
	try {
		// Récupérer les données de l'utilisateur depuis la requête
		const { nickname, password } = req.body;

		const query = `SELECT * FROM user WHERE nickname = ?`;
		const [user] = await Query.runWithParams(query, nickname);
		console.log(user);

		// Vérifier si l'utilisateur existe dans la base de données
		// Comparer le mot de passe fourni avec celui stocké dans la base de données
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res
				.status(401)
				.json({ message: "Information(s) incorrecte(s)" });
		}

		// Sauvegarder les informations de l'utilisateur dans la session
		req.session.user = {
			nickname,
            isAdmin : user.isAdmin
			// Ajoutez d'autres informations de l'utilisateur si nécessaire
		};

		res.status(200).json({ message: "Connexion réussie" });
	} catch (error) {
		res.status(500).json({ message: "Erreur de serveur" });
	}
};

// Fonction d'inscription (register)
const register = async (req, res) => {
	try {
		// Récupérer les données de l'utilisateur depuis la requête
		const { nickname, password } = req.body;
		const query1 = `SELECT * FROM user WHERE nickname = ?`;
		// Vérifier si l'utilisateur existe déjà dans la base de données
		const existingUser = await Query.runWithParams(query1, nickname);

		if (existingUser.length) {
			// code 409 pour indiquer un conflit
			return res
				.status(409)
				.json({ message: "Cet utilisateur existe déjà" });
		}

		// si l'utilisateur n'existe pas, on peut l'ajouter en BDD
		const query2 = `INSERT INTO user (nickname, password, creationDate) VALUES (?, ?, NOW())`;
		// Hasher le mot de passe avant de le sauvegarder dans la base de données
		const hashedPassword = await bcrypt.hash(password, 10);

		// Sauvegarder le nouvel utilisateur dans la base de données
		await Query.runWithParams(query2, nickname, hashedPassword);

		res.status(201).json({ message: "Inscription réussie" });
	} catch (error) {
		res.status(500).json({ message: "Erreur de serveur" });
	}
};

export { login, register };
