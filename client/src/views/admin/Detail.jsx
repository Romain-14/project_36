import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
    const [product, setProduct] = useState(null); 
    const { id } = useParams();

    useEffect(()=> {
        async function fetchProduct() {
            const response = await fetch("http://localhost:9000/api/v1/product/" + id, {
                credentials: "include",
            });
            if (response.status === 401) {
                console.log("Unauthorized");
                return;
            }
            if (response.ok) {
                const data = await response.json();
                setProduct(data)
            }
        }
        fetchProduct();
    }, []);

    if(!product) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }
    return (
        <main>
            <h1>Product Detail</h1>
            <Link to="/product">Retour</Link>
            <article>
                <h2>{product.main_title}</h2>
                <h3>{product.sub_title}</h3>
                <p>{product.description}</p>
                <p>Prix :{product.price} €</p>
                <p>Référence :{product.ref}</p>
                <p>En stock : {product.stock}</p>
                <p>Vendeur : {product.seller}</p>
                <p>Catégorie {product.category}</p>

            </article>

        </main>
    )
}

export default Detail