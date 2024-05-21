import { Router } from "express";

import { checkAuth, register, login, logout } from "../controllers/auth.js";

const router = Router();

// on est sur la route http://localhost:9000/api/v1/auth
router.get("/", checkAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);


export default router;
