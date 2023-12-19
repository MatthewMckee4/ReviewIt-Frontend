import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useUser } from "./Hooks/UseUser";

const Navbar = ({ token, onTokenChange }) => {
  const CLIENT_ID = "300a45c9a2c74fbdba97db32cdb65c90";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const scopes = ["user-read-private", "user-read-email"];
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
    "%20"
  )}&response_type=token`;

  const { user, updateUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          updateUser(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [token]);

  const logout = () => {
    navigate("/");
    onTokenChange("");
    updateUser({});
  };

  return (
    <nav>
      <div className="leftSide">
        <ul className="underline-list">
          <li className="centered-li">
            <Link to="/" className="underline-transition">
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="center">
        {user && (
          <p>
            Welcome, {user.display_name} (ID: {user.id})
          </p>
        )}
      </div>
      <div className="rightSide">
        {token ? <SearchBar token={token} /> : null}
        <ul className="underline-list">
          {!token ? (
            <li>
              <a href={AUTH_URL}>Login to Spotify</a>
            </li>
          ) : (
            <li className="centered-li">
              <a
                className="underline-transition"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
