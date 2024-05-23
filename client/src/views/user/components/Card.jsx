import PropTypes from "prop-types";

import { useCart } from "../../../hooks/useCart";
import noPicture from "../../../assets/images/no-picture.jpg";

// destructuring de product qui est dans props
function Card({ product }) {
	const { addToCart } = useCart();

	return (
		<article key={product.id}>
			<h3>{product.main_title}</h3>
			<img
				src={
					product.src_img
						? "http://localhost:9000/images/" + product.src_img
						: noPicture
				}
				alt={product.main_title}
			/>
			<button onClick={() => addToCart(product)}>
				Ajouter au panier
			</button>
		</article>
	);
}

Card.propTypes = {
	product: PropTypes.object.isRequired,
};

export default Card;
