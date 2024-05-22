import { Routes, Route } from "react-router-dom";
import Home from "../views/admin/Home";
import Product from "../views/admin/Product";
import Detail from "../views/admin/Detail.jsx";
import AddForm from "../views/admin/AddForm.jsx";
import Header from "../views/admin/partials/Header.jsx";

function Router() {
	console.log("admin router");
	return (
        <>
        <Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="product" element={<Product />} />
			<Route path="product/detail/:id" element={<Detail />} />
			<Route path="product/add" element={<AddForm />} />

			<Route path="*" element={<p>NOT FOUND</p>} />
		</Routes>

        </>
	);
}

export default Router;
