import { Router } from "express";
import { getAll, add } from "../controllers/seller.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

// http://localhost:9000/api/v1/seller
router.get("/", getAll);

router.post("/", adminRequired, add);

export default router;
