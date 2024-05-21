import { createContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

function UserProvider({ children }) {
	const [user, setUser] = useState(null);

	return (
		<Context.Provider value={{ user, setUser }}>
			{children}
		</Context.Provider>
	);
}

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { Context, UserProvider };
