import { Router } from "express";
import { getAll, add } from "../controllers/seller.js";

const router = Router();

// http://localhost:9000/api/v1/seller
router.get("/", getAll);

router.post("/", add);

export default router;
