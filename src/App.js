import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";

function App() {
  const [token, setToken] = useState("");

  const onTokenChange = (newToken) => {
    setToken(newToken);
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
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
