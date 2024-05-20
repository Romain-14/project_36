import { Router } from "express";
import { getAll, add } from "../controllers/category.js";

const router = Router();

// http://localhost:9000/api/v1/category
router.get("/", getAll);

router.post("/", add);

export default router;
