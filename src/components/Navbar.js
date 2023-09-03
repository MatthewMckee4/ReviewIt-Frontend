import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar({ token, onTokenChange }) {
  const CLIENT_ID = "300a45c9a2c74fbdba97db32cdb65c90";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

  const logout = () => {
    onTokenChange("");
    window.localStorage.removeItem("token");
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
                  onTokenChange("");
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
}

export default Navbar;
