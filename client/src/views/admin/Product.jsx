import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noPicture from "../../assets/images/no-picture.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Product() {
	const [products, setProducts] = useState(null);
	const [refreshProductList, setProductList] = useState(false);

	useEffect(() => {
		document.title = "Back Office | Produits";
		async function fetchProducts() {
			const response = await fetch(
				"http://localhost:9000/api/v1/product",
				{
					credentials: "include",
				}
			);
			if (response.status === 401) {
				console.log("Unauthorized");
				return;
			}
			if (response.ok) {
				const data = await response.json();
				setProducts(data.response);
			}
		}
		fetchProducts();
	}, [refreshProductList]);

	async function deleteHandler(e, id) {
		e.preventDefault();
		const response = await fetch(
			"http://localhost:9000/api/v1/product/" + id,
			{
				method: "DELETE",
				credentials: "include",
			}
		);
		if (response.ok) {
			setProductList(!refreshProductList);
		}
	}

	if (!products) {
		return (
			<main>
				<h2>Loading...</h2>
			</main>
		);
	}

	return (
		<main>
			<section>
				<h2>Liste des Produits</h2>
				<Link to="/product/add">
					Ajouter un produit <FontAwesomeIcon icon={faPlus} />
				</Link>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Image</th>
							<th>Nom</th>
							<th>Prix</th>
							<th>Stock</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>
										<img
											src={
												product.image
													? product.image
													: noPicture
											}
											alt={product.name}
										/>
									</td>
									<td>{product.main_title}</td>
									<td>{product.price} €</td>
									<td>{product.stock}</td>
									<td>
										<Link to={"detail/" + product.id}>
											Détail
										</Link>
										<Link to={"edit/" + product.id}>
											Modifier
										</Link>
										<button
											onClick={(e) =>
												deleteHandler(e, product.id)
											}
										>
											Supprimer
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</main>
	);
}

export default Product;
