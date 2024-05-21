import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useUser } from "./hooks/UseUser";

import Header from "./views/user/partials/Header";
import Home from "./views/user/Home";
import Admin from "./views/admin/Home";
import Auth from "./views/auth/Login";
import Footer from "./views/user/partials/Footer";

function App() {
	const { user, setUser } = useUser();
    
	useEffect(() => {
		async function fetchAuthentication() {
			const response = await fetch("http://localhost:9000/api/v1/auth", {
				credentials: "include",
			});
			if (response.status === 401) {
				console.log("Unauthorized");
				return;
			}
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
			}
		}
		fetchAuthentication();
	}, [setUser]);

	if (user?.isAdmin) {
		return (
			<>
				<Router>
					<Header />
					<Routes>
						<Route path="/" element={<Admin />} />
						<Route path="*" element={<p>NOT FOUND</p>} />
					</Routes>
				</Router>
			</>
		);
	} else {
		return (
			<>
				<Router>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="authentication" element={<Auth />} />
						<Route path="*" element={<p>NOT FOUND</p>} />
					</Routes>
					<Footer />
				</Router>
			</>
		);
	}
}

export default App;
