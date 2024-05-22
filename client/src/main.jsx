import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./assets/styles/scss/index.scss";
import { UserProvider } from "./store/user/Context";
import { MenuProvider } from "./store/menu/Context";


ReactDOM.createRoot(document.getElementById("root")).render(
    <MenuProvider>        
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </MenuProvider>
);
