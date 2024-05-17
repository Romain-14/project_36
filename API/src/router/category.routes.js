import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// http://localhost:9000/api/v1/category
router.get("/", (req, res) => {
	res.json({
		msg: "Je suis sur la route API pour récupérer TOUTES les 'category' !",
	});
});

router.post("/", async (req, res) => {
	console.log(req.body);
    const { label } = req.body;

    try {
        const response = await pool.execute(
            "INSERT INTO category (label) VALUES (?)",
            [label]
        );
        console.log(response)
        res.json({ msg: "Les données ont bien été reçues !" });
        
    } catch (error) {
        console.log(error);
    }

});

export default router;
