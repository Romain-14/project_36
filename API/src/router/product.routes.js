import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// on est sur la route http://localhost:9000/api/v1/product//
// on passe la callback en async pour pouvoir utiliser await (sinon on aurait pu utiliser .then() et .catch()) approche moderne
router.get("/", async (req, res) => {
	try {
        // on récupère les données de la table product avec la méthode query() de pool ( pas execute ici car on ne fait pas de modification dans la base de données)
		const [response] = await pool.query(`
                SELECT main_title, price, seller.label AS seller, category.label AS category
                FROM product 
                JOIN seller ON product.seller_id = seller.id 
                JOIN category ON product.category_id = category.id
            `);
        // on renvoie la réponse au client au format JSON, un message et la réponse (les données de la table product)
		res.json({
			msg: "Je suis sur la route API pour récupérer TOUS les produits !",
			response,
		});
	} catch (error) {
        // si une erreur survient dans toute instruction du bloc try, on la récupère ici
        console.log(error);
    }
});

router.post("/", async (req, res) => {
	console.log(req.body);
    // on récupère les données envoyées par le client en déstructurant l'objet req.body 
	const {
		main_title,
		sub_title,
		description,
		price,
		ref,
		quantityInStock,
		seller_id,
		category_id,
	} = req.body;

	try {
        // on insère les données dans la table product avec la méthode execute() de pool (on utilise execute car on fait une modification dans la base de données) cette méthode sécurise les données en les passant en paramètre de la requête SQL, appelé placeholder ( ? )
		const response = await pool.execute(
			"INSERT INTO product (main_title, sub_title, description, price, ref, quantityInStock, seller_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			[
				main_title,
				sub_title,
				description,
				price,
				ref,
				quantityInStock,
				seller_id,
				category_id,
			]
		);
		console.log(response);
	} catch (error) {
		console.log(error);
	}

	res.json({ msg: "Les données ont bien été reçues !" });
});

export default router;
