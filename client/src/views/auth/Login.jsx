import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useUser } from "../../hooks/UseUser";

function Login() {
	const { setUser } = useUser();
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	async function submitHandler(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);
		const response = await fetch(
			"http://localhost:9000/api/v1/auth/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				credentials: "include",
			}
		);
		const responseParsed = await response.json();
		form.reset();
		if (response.status === 401 || response.status === 500) {
			setError(responseParsed.message);
			return;
		}

		setUser(responseParsed.user);
		navigate("/");
	}

	return (
		<main id="auth">
			{error && <p>{error}</p>}
			<form onSubmit={submitHandler}>
				<input type="text" id="nickname" name="nickname" placeholder="Votre nom d'utilisateur" required />

				<input type="password" id="password" name="password" placeholder="Votre mot de passe" required />

				<button type="submit">Login</button>
			</form>
			<p>
				Vous n&apos;avez pas de compte ?{" "}
				<Link to="/register">Inscrivez-vous</Link>
			</p>
		</main>
	);
}

export default Login;
