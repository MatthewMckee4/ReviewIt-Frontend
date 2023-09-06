import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";

function App() {
  const [token, setToken] = useState(() => {
    // Initialize the token state from session storage (if it exists)
    return sessionStorage.getItem("token") || "";
  });

  const onTokenChange = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem("token", newToken); // Store the token in session storage
  };

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const newToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (newToken) {
        window.location.hash = ""; // Clear the hash after extracting the token
        setToken(newToken);
        sessionStorage.setItem("token", newToken); // Store the token in session storage
      }
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token} onTokenChange={onTokenChange} />
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="/artist/:artistId"
            element={<ArtistPage token={token} />}
          />
          <Route path="/album/:albumId" element={<AlbumPage token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
