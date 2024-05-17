import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// http://localhost:9000/api/v1/product
router.get("/", async (req, res) => {
    const [ response ] = await pool.query(`
            SELECT main_title, price, seller.label AS seller, category.label AS category
            FROM product 
            JOIN seller ON product.seller_id = seller.id 
            JOIN category ON product.category_id = category.id
        `)
	res.json({
		msg: "Je suis sur la route API pour récupérer TOUS les produits !", response,
	});
});

router.post("/", async (req, res) => {
	console.log(req.body);
    const { main_title, sub_title, description, price, ref, quantityInStock, seller_id, category_id } = req.body;

    try {
        const response = await pool.execute(
            "INSERT INTO product (main_title, sub_title, description, price, ref, quantityInStock, seller_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [main_title, sub_title, description, price, ref, quantityInStock, seller_id, category_id ]
        );
        console.log(response)
        
    } catch (error) {
        console.log(error);
    }

	res.json({ msg: "Les données ont bien été reçues !" });
});

export default router;
