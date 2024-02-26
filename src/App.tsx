import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import { useTokenState } from "./components/Hooks/UseToken";

export default function App() {
    const [, setToken] = useTokenState();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token =
                hash
                    .substring(1)
                    .split("&")
                    .find((elem) => elem.startsWith("access_token"))
                    ?.split("=")[1] || "";
            window.location.hash = "";
            setToken(token);
        }
    }, [setToken]);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artist/:artistId" element={<ArtistPage />} />
                <Route path="/album/:albumId" element={<AlbumPage />} />
                <Route
                    path="/search-results/:searchKey"
                    element={<SearchResultsPage />}
                />
            </Routes>
        </div>
    );
}
