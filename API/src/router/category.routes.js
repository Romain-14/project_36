import { Router } from "express";
import { getAll, add } from "../controllers/category.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

// http://localhost:9000/api/v1/category
router.get("/", getAll);

// adminRequired est un middleware qui vérifie si un utilisateur est connecté et si c'est un admin (fichier middlewares/adminRequired.js)
router.post("/", adminRequired, add);

export default router;
