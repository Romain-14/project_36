import { Router } from "express";

import { login, register } from "../controllers/auth.js";

const router = Router();

// on est sur la route http://localhost:9000/api/v1/product/
router.post("/login", login);

router.post("/register", register);

export default router;
