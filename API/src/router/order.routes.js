import {Router} from "express";
import { nanoid } from 'nanoid';

import pool from "../config/db.js";
import Query from "../model/Query.js";
import userRequired from "../middlewares/userRequired.js";

const router = Router()

// récupérer toutes les commandes (sans le détail) de tous les utilisateurs
router.get("/", async (req, res) => {
    try {
        const query = `
            SELECT * FROM order
            JOIN user ON order.user_id = user.id
        `;
        const orders = await Query.run(query);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

// récupérer toutes les commandes d'un utilisateur
router.get("/:userID", (req, res) => {
    res.send("GET /api/v1/order")
});

// commande d'un utilisateur
router.post("/", userRequired, async (req, res) => {
    try {
        // pour optimiser les performances, on peut utiliser une "transaction"
        // on doit enregistrer la commande et les détails de la commande en même temps
        // ces derniers sont liés par l'id de la commande
        // si une des requêtes échoue, on annule tout
        // pour éviter d'avoir des commandes sans détails
        // voilà pourquoi on utilise une transaction

        // on commence par récupérer une connexion unique à la base de données
        const connection = await pool.getConnection();
        // on démarre la transaction
        await connection.beginTransaction();

        // module nanoid pour générer un identifiant unique
        const ref = nanoid(15);
        const query = `INSERT INTO \`order\` (orderedDate, ref, user_id) VALUES (NOW(), ?, ?)`;
        const data = {
            ref,
            user_id: req.session.user.id
        }
        // on enregistre la commande
        const result = await Query.runWithParams(query, data);
    
        // Pour chaque produit de la commande, il va falloir insérer une ligne dans la table order_detail
        for (const product of req.body) {
            const query2 = `
                INSERT INTO order_detail (order_id, product_id, quantity)
                VALUES (?, ?, ?)
            `;
            const data2 = {
                order_id: result.insertId,
                product_id: product.product_id,
                quantity: product.quantity
            }

            // on enregistre le détail de la commande, un par un pour chaque produit
            await Query.runWithParams(query2, data2);
        }

        // on valide la transaction
        await connection.commit();
        res.json({msg: "Commande bien enregistrée !"});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


export default router