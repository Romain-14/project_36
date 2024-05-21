import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { UserProvider } from "./store/user/Context";

import "./assets/styles/scss/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <App />
    </UserProvider>
);
