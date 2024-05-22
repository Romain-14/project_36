import { Routes, Route } from "react-router-dom";

import Header from "../views/user/partials/Header";
import Home from "../views/user/Home";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Dashboard from "../views/user/Dashboard";
import Footer from "../views/user/partials/Footer";

function Router() {
    console.log("user router");
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="*" element={<p>NOT FOUND</p>} />
			</Routes>
			<Footer />
		</>
	);
}

export default Router;
