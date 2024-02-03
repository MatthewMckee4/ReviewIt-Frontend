import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchMenu from "./Search/SearchMenu";
import { useUser } from "./Hooks/UseUser";
import axios from "axios";

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
      fetchUserData(token, updateUser);
    }
  }, [token, updateUser]);

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
            Welcome {user.display_name}{" "}
            {user.image && (
              <img
                src={user.image}
                alt="profile"
                width={15}
                height={15}
                style={{ borderRadius: "50%" }}
              />
            )}
          </p>
        )}
      </div>
      <div className="rightSide">
        {token ? <SearchMenu token={token} /> : null}
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

const fetchUserData = async (token, updateUser) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    updateUser(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default Navbar;
