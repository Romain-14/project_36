import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
		<main>
			{error && <p>{error}</p>}
			<form onSubmit={submitHandler}>
				<input type="text" id="nickname" name="nickname" required />

				<input type="password" id="password" name="password" required />

				<button type="submit">Login</button>
			</form>
		</main>
	);
}

export default Login;
