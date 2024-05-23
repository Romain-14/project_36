import Query from "../model/Query.js";
import upload from "../config/multer.js";

// on passe la callback en async pour pouvoir utiliser await, approche moderne. (sinon on aurait pu utiliser .then() et .catch())
const getAll = async (req, res) => {
	// on encapsule le code dans un bloc try catch pour gérer les erreurs
	try {
		// on récupère les données de la table product avec la méthode query() de pool ( pas execute ici car on ne fait pas de modification dans la base de données)
		const query = `
            SELECT product.id, main_title, sub_title, description, price, ref, stock, src_img, seller.label AS seller, category.label AS category
            FROM product 
            JOIN seller ON product.seller_id = seller.id 
            JOIN category ON product.category_id = category.id
        `;
		const response = await Query.run(query);
		console.log(response);
		// on renvoie la réponse au client au format JSON, un message et la réponse (les données de la table product)
		res.json({
			msg: "Je suis sur la route API pour récupérer TOUS les produits !",
			response,
		});
	} catch (error) {
		// si une erreur survient dans toute instruction du bloc try, on la récupère ici
		res.status(500).json({ message: "Erreur de serveur" });
	}
};

const getById = async (req, res) => {
	try {
		const query = `
                SELECT product.id, main_title, sub_title, description, price, ref, stock, src_img, seller.label AS seller, category.label AS category
                FROM product 
                JOIN seller ON product.seller_id = seller.id 
                JOIN category ON product.category_id = category.id
                WHERE product.id = ?
            `;
		const [response] = await Query.runWithParams(query, req.params);
		// si produit non trouvé "undefined du fait de la destructuration [response]"
		// on envoi un 404 avec un message, le return coupe la fonction et évite d'executer la ligne 42 (la réponse positive)
		if (!response)
			return res.status(404).json({ message: "Produit non trouvé" });
		res.json(response);
	} catch (error) {
		res.status(500).json({
			msg: "Erreur de serveur",
			error: error.message,
		});
	}
};

const add = async (req, res) => {
	try {
		upload(req, res, async function (error) {
			if (error) {
				return res.status(400).json({ message: error });
			}

			if (!req.file) {
				return res
					.status(400)
					.json({
						message:
							"Veuillez sélectionner une image au format webp",
					});
			}

			const product = {
				...req.body,
				src_img: req.file.originalname,
			};
			const query = `INSERT INTO product (main_title, sub_title, description, price, ref, stock, seller_id, category_id, src_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
			const response = await Query.runWithParams(query, product);

			if (response) {
				res.json({
					msg: "Les données ont bien été insérées !",
					response,
				});
			}
		});
	} catch (error) {
		console.log("ERROR", error);
		res.status(500).json({
			msg: "Erreur de serveur",
			error: error.message,
		});
	}
};

const update = async (req, res) => {
	try {
		const { id } = req.params;
		const query = `UPDATE product SET main_title = ? , sub_title = ? , description = ? ,price = ? , ref = ? , stock = ? , seller_id = ? , category_id = ? , WHERE id = ?`;
		const data = {
			...req.body,
			id,
		};
		const response = await Query.runWithParams(query, data);
		res.json({ msg: "Les données ont bien été modifiées !", response });
	} catch (error) {
		res.status(500).json({
			msg: "Erreur de serveur",
			error: error.message,
		});
	}
};

const remove = async (req, res) => {
	try {
		const query = `DELETE FROM product WHERE id = ?`;
		await Query.runWithParams(query, req.params);
		res.json({ msg: "Le produit a bien été supprimé !" });
	} catch (error) {
		res.status(500).json({
			msg: "Erreur de serveur",
			error: error.message,
		});
	}
};

export { getAll, getById, add, update, remove };
