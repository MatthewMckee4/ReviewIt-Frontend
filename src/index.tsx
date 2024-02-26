import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { UserProvider } from "./components/Hooks/UseUser";
import { TokenProvider } from "./components/Hooks/UseToken";

ReactDOM.render(
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
    </React.StrictMode>,
    document.getElementById("root")
);
