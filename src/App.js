import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import { UserProvider } from "./components/Hooks/UseUser";

function App() {
    const [token, setToken] = useState(() => {
        return window.localStorage.getItem("token") || "";
    });

    const onTokenChange = (newToken) => {
        setToken(newToken);
        window.localStorage.setItem("token", newToken);
    };

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (hash && hash) {
            token = hash
                .substring(1)
                .split("&")
                .find((elem) => elem.startsWith("access_token"))
                .split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        setToken(token);
    }, []);

    return (
        <UserProvider>
            <div className="App">
                <Navbar token={token} onTokenChange={onTokenChange} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/artist/:artistId"
                        element={<ArtistPage token={token} />}
                    />
                    <Route
                        path="/album/:albumId"
                        element={<AlbumPage token={token} />}
                    />
                    <Route
                        path="/search-results"
                        element={<SearchResultsPage token={token} />}
                    />
                </Routes>
            </div>
            <footer> </footer>
        </UserProvider>
    );
}

export default App;
