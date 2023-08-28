import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AlbumsPage from "./pages/AlbumsPage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="albums" element={<AlbumsPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
      <AlbumsPage />
    </div>
  );
}

export default App;
