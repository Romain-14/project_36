import { createContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

function MenuProvider({ children }) {
	const [isMenuOpen, setIsMenuOpen] = useState(null);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

	return (
		<Context.Provider value={{ isMenuOpen, toggleMenu }}>
			{children}
		</Context.Provider>
	);
}

MenuProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { Context, MenuProvider };
