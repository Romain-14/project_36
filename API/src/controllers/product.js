import Query from "../model/Query.js";

// on passe la callback en async pour pouvoir utiliser await, approche moderne. (sinon on aurait pu utiliser .then() et .catch())
const getAll = async (req, res) => {
    // on encapsule le code dans un bloc try catch pour gérer les erreurs
	try {
		// on récupère les données de la table product avec la méthode query() de pool ( pas execute ici car on ne fait pas de modification dans la base de données)
		const query = `
            SELECT main_title, price, seller.label AS seller, category.label AS category
            FROM product 
            JOIN seller ON product.seller_id = seller.id 
            JOIN category ON product.category_id = category.id
        `;
		const response = await Query.run(query);
        console.log(response); // vérifier ici qu'on récupère bien dans un tableau les données
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
        const { id } = req.params;
        const query = `
                SELECT product.id, main_title, price, seller.label AS seller, category.label AS category
                FROM product 
                JOIN seller ON product.seller_id = seller.id 
                JOIN category ON product.category_id = category.id
                WHERE product.id = ?
            `;
            const [response] = await Query.runWithParams(query, id);
            // si produit non trouvé "undefined du fait de la destructuration [response]"    
            // on envoi un 404 avec un message, le return coupe la fonction et évite d'executer la ligne 42 (la réponse positive)
            if(!response) return res.status(404).json({ message: "Produit non trouvé" });
            res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Erreur de serveur", error });
    }
}

const add = async (req, res) => {

	console.log("ADD", req.body);
	// on récupère les données envoyées par le client en déstructurant l'objet req.body

	try {
		// on insère les données dans la table product avec la méthode execute() de pool (on utilise execute car on fait une modification dans la base de données) cette méthode sécurise les données en les passant en paramètre de la requête SQL, appelé placeholder ( ? )
        const query = `INSERT INTO product (main_title, sub_title, description, price, ref, quantityInStock, seller_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        // METHODE 1 : tout décrire ce qui doit être inséré pas la plus optimale pour la lisibilité
        // const response = await Query.runWithParams(query, [req.body.title1, req.body.title2, req.body.description, req.body.price, req.body.ref, req.body.quantityInStock, req.body.seller_id, req.body.category_id]);
        
        // METHODE 2 : passer directement l'objet req.body
        const response = await Query.runWithParams(query, req.body);

		res.json({ msg: "Les données ont bien été insérées !", response });
	} catch (error) {
		console.log(error);
        res.status(500).json({ message: "Erreur de serveur", error });
	}

};

export { getAll, getById, add };
