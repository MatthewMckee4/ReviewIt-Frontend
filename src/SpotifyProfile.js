import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const SpotifyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      // Fetch the user's profile using the access token
      spotifyApi.getMe().then((data) => {
        setUser(data);
      });
    }
  }, []); // Empty dependency array to run the effect only once

  const handleLogin = () => {
    const CLIENT_ID = "300a45c9a2c74fbdba97db32cdb65c90";
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    // Redirect the user to Spotify's authorization page
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Hello, {user.display_name}</h1>
          <img src={user.images[0]?.url} alt="Profile" />
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Spotify</button>
      )}
    </div>
  );
};

export default SpotifyProfile;
