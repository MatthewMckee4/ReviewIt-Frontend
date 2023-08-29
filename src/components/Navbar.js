import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom"; // Import from react-router-dom
import SearchBar from "./SearchBar";

function Navbar({ token, onTokenChange }) {
  const CLIENT_ID = "300a45c9a2c74fbdba97db32cdb65c90";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const logout = () => {
    onTokenChange(""); // Clear the token in the App component
    window.localStorage.removeItem("token");
  };

  return (
    <nav>
      <div className="leftSide">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="rightSide">
        {token ? <SearchBar token={token} /> : null}
        <ul>
          {!token ? (
            <li>
              <a
                href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              >
                Login to Spotify
              </a>
            </li>
          ) : (
            <li>
              <a
                href="#"
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
