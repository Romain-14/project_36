import { Routes, Route } from "react-router-dom";
import Home from "../views/admin/Home";
import Product from "../views/admin/Product";
import Detail from "../views/admin/Detail.jsx";

function Router() {
	console.log("admin router");
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="product" element={<Product />} />
			<Route path="product/detail/:id" element={<Detail />} />

			<Route path="*" element={<p>NOT FOUND</p>} />
		</Routes>
	);
}

export default Router;
