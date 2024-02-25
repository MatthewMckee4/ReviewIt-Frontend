import React from "react";
import { createRoot } from "react-dom"; // Import createRoot
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { UserProvider } from "./components/Hooks/UseUser";
import { TokenProvider } from "./components/Hooks/UseToken";

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <UserProvider>
                <TokenProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </TokenProvider>
            </UserProvider>
        </Provider>
    </React.StrictMode>
);
