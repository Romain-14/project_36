import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// http://localhost:9000/api/v1/seller
router.get("/", (req, res) => {
	res.json({
		msg: "Je suis sur la route API pour récupérer TOUS les 'seller' !",
	});
});

router.post("/", async (req, res) => {
	console.log(req.body);
    const { label, location} = req.body;

    try {
        const response = await pool.execute(
            "INSERT INTO seller (label, location) VALUES (?, ?)",
            [label, location ]
        );
        console.log(response)
        res.json({ msg: "Les données ont bien été reçues !" });
        
    } catch (error) {
        console.log(error);
    }

});

export default router;
