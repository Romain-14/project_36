import bcrypt from "bcrypt";
import Query from "../model/Query.js";

const checkAuth = (req, res) => {
    if(req.session.user){
        console.log("session existante")
        res.json({message: "Utilisateur connecté", user: req.session.user});
    } else {
        console.log("AUCUNE SESSION user")
        res.status(401).json({message: "Utilisateur non connecté"});
    }
}

// Fonction d'inscription (register)
const register = async (req, res) => {
	try {
		// Récupérer les données de l'utilisateur depuis la requête
		const query1 = `SELECT * FROM user WHERE nickname = ?`;

		// Vérifier si l'utilisateur existe déjà dans la base de données
		const existingUser = await Query.runWithParams(query1, { nickname: req.body.nickname });
        console.log(existingUser.length)
		if (existingUser.length) {
			// code 409 pour indiquer un conflit
			return res
				.status(409)
				.json({ message: "Cet utilisateur existe déjà" });
		}

		// si l'utilisateur n'existe pas, on peut l'ajouter en BDD
		const query2 = `INSERT INTO user (nickname, password, creationDate) VALUES (?, ?, NOW())`;
		// Hasher le mot de passe avant de le sauvegarder dans la base de données
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            nickname: req.body.nickname,
            password: hashedPassword
        }
		// Sauvegarder le nouvel utilisateur dans la base de données
		await Query.runWithParams(query2, newUser);

		res.status(201).json({ message: "Inscription réussie" });
	} catch (error) {
		res.status(500).json({ message: "Erreur de serveur", error: error.message });
	}
};

// Fonction de connexion (login)
const login = async (req, res) => {
	try {
		// Récupérer les données de l'utilisateur depuis la requête
		const query = `SELECT * FROM user WHERE nickname = ?`;
		const [user] = await Query.runWithParams(query, { nickname: req.body.nickname });
		console.log(user);

		// Vérifier si l'utilisateur existe dans la base de données
		// Comparer le mot de passe fourni avec celui stocké dans la base de données
		if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
			return res
				.status(401)
				.json({ message: "Information(s) incorrecte(s)" });
		}

        const infoUser ={
            nickname: user.nickname,
            isAdmin: user.isAdmin
        }

		// Sauvegarder les informations de l'utilisateur dans la session
		req.session.user = infoUser;

		res.status(200).json({ message: "Connexion réussie", user: infoUser});
	} catch (error) {
		res.status(500).json({ message: "Erreur de serveur", error: error.message });
	}
};

const logout = async (req, res) => {   
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({message: "Erreur de serveur"});
        }
        res.clearCookie("session_id");
        res.status(200).json({message: "Déconnexion réussie"});
    });
};

 
export { checkAuth, login, register, logout };
