import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddForm() {
	const [categories, setCategories] = useState(null);
	const [sellers, setSellers] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchCategories() {
			const response = await fetch(
				"http://localhost:9000/api/v1/category",
				{
					credentials: "include",
				}
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setCategories(data);
			}
		}
		fetchCategories();
	}, []);

	useEffect(() => {
		async function fetchSeller() {
			const response = await fetch(
				"http://localhost:9000/api/v1/seller",
				{
					credentials: "include",
				}
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setSellers(data);
			}
		}
		fetchSeller();
	}, []);

	useEffect(() => {
		if (categories && sellers) {
			setIsLoading(false);
		}
	}, [categories, sellers]);

	async function submitHandler(e) {
		try {
			e.preventDefault();
			const form = e.target;
			const formData = new FormData(form);

			// FormData défini un content-type multipart/form-data qui permet d'envoyer des fichiers
			// dans le back on utilise multer pour gérer les fichiers envoyés
			const response = await fetch(
				"http://localhost:9000/api/v1/product",
				{
					method: "POST",
					body: formData,
					credentials: "include",
				}
			);
            if(response.status === 400) {
                response.json().then(data => { 
                    console.log(data.message);
                    setError(data.message);
                })
            }
            
			if (response.ok) {
				form.reset();
				navigate("/product");
			}
		} catch (error) {
			console.log(error);
		}
	}

	if (isLoading) {
		return (
			<main>
				<h2>Loading...</h2>
			</main>
		);
	} else {
		return (
			<main>
				<h2>Ajouter un produit</h2>
				<form
					onSubmit={submitHandler}
					style={{ display: "flex", flexDirection: "column" }}
				>
					<label htmlFor="main_title">Titre principal</label>
					<input
						type="text"
						id="main_title"
						name="main_title"
						required
					/>

					<label htmlFor="sub_title">Titre secondaire</label>
					<input
						type="text"
						id="sub_title"
						name="sub_title"
						required
					/>

					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						name="description"
						required
					></textarea>

					<label htmlFor="price">Prix</label>
					<input type="number" id="price" name="price" required />

					<label htmlFor="ref">Reference</label>
					<input type="text" id="ref" name="ref" required />

					<label htmlFor="stock">Stock</label>
					<input type="number" id="stock" name="stock" required />

					<select name="seller" id="seller">
						{sellers.map((s) => {
							return (
								<option key={s.id + Math.random()} value={s.id}>
									{s.label}
								</option>
							);
						})}
					</select>

					<select name="category" id="category">
						{categories.map((c) => {
							return (
								<option key={c.id + Math.random()} value={c.id}>
									{c.label}
								</option>
							);
						})}
					</select>

					<label htmlFor="image">Image</label>
					<input type="file" name="image" id="image" />
                    {error && <p style={{color: "red"}}>{error}</p>}

					<button type="submit">Ajouter</button>
				</form>
			</main>
		);
	}
}

export default AddForm;
