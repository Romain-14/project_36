import {Router} from "express";

import auth_router from "./auth.routes.js";
import product_router from "./product.routes.js";
import seller_router from "./seller.routes.js";
import category_router from "./category.routes.js";
import order_router from "./order.routes.js";

const router = Router();
const BASE_API = "/api/v1";

// http://localhost:9000/
router.get("/", (req, res) => {
    res.json({msg: "connected to the API !"});
});

// En fonction du point de terminaison, on redirige vers le router correspondant ; exemple:
// http://localhost:9000/api/v1/product -> oriente vers le router "product"
router.use(`${BASE_API}/auth`, auth_router);
router.use(`${BASE_API}/product`, product_router);
router.use(`${BASE_API}/seller`, seller_router);
router.use(`${BASE_API}/category`, category_router);
router.use(`${BASE_API}/order`, order_router);

export default router;