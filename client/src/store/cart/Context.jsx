import { createContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	function addToCart(product) {
        // recherche d'un produit existant dans le panier pour augmenter la quantité
        const productInCart = cart.find((item) => item.id === product.id);
        // si le produit existe dans le panier, on augmente la quantité de 1

        if (productInCart) {
            // utilisation de la callback pour éviter les problèmes de concurrence lors de la mise à jour du state avec une valeur basée sur l'ancienne valeur
            // pour chaque élément du panier, on vérifie si l'id correspond à celui du produit à ajouter
            // si c'est le cas, on retourne un nouvel objet avec la même quantité + 1
            // sinon, on retourne l'élément tel quel
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
            return;
        }
        // si le produit n'existe pas dans le panier, on l'ajoute avec une quantité de 1
		setCart((prevCart) => [...prevCart, {id: product.id, quantity: 1}]);
	}
    

	return (
		<Context.Provider value={{ cart, addToCart }}>
			{children}
		</Context.Provider>
	);
}

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export { Context, CartProvider };
