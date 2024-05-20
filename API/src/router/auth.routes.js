import { Router } from "express";

import { register, login, logout } from "../controllers/auth.js";

const router = Router();

// on est sur la route http://localhost:9000/api/v1/auth
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);


export default router;
