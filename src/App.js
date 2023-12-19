import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";
import { UserProvider } from "./components/Hooks/UseUser";

function App() {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || "";
  });

  const onTokenChange = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem("token", newToken);
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
        window.location.hash = "";
        setToken(newToken);
        sessionStorage.setItem("token", newToken);
      }
    }
  }, []);

  return (
    <UserProvider>
      <div className="App">
        <Navbar token={token} onTokenChange={onTokenChange} />
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="/artist/:artistId"
            element={<ArtistPage token={token} />}
          />
          <Route path="/album/:albumId" element={<AlbumPage token={token} />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
