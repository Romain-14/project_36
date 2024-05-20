import { Router } from "express";

import { getAll, getById, add } from "../controllers/product.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

// on est sur la route http://localhost:9000/api/v1/product/
router.get("/", getAll);
router.get("/:id", getById);

// adminRequired est un middleware qui vérifie si un utilisateur est connecté et si c'est un admin (fichier middlewares/adminRequired.js)
router.post("/", adminRequired, add);

export default router;
