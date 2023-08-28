import React, { useEffect, useState } from "react";
import axios from "axios";

function AlbumsPage() {
  const CLIENT_ID = "300a45c9a2c74fbdba97db32cdb65c90";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

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

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      });

      if (data.artists && data.artists.items) {
        setArtists(data.artists.items);
      } else {
        console.error("No 'items' property in the API response:", data);
      }
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };

  const renderArtists = () => {
    const firstArtist = artists[0]; // Show only the first artist
    if (!firstArtist) {
      return <p>No artists available</p>;
    }

    return (
      <div>
        <div key={firstArtist.id}>
          {firstArtist.images.length ? (
            <img height={"200px"} src={firstArtist.images[0].url} alt="" />
          ) : (
            <div>No Image</div>
          )}
          {firstArtist.name}
          <button onClick={() => fetchAlbumsForArtist(firstArtist.id)}>
            Show Albums
          </button>
        </div>
        {selectedArtist && (
          <div>
            <h2>Albums for {selectedArtist.name}</h2>
            {selectedArtist.albums.map((album) => (
              <div key={album.id}>
                <p>{album.name}</p>
                <img height={"100px"} src={album.images[0].url} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const fetchAlbumsForArtist = async (artistId) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedArtist({
        ...artists[0],
        albums: data.items,
      });
    } catch (error) {
      console.error("Error fetching artist albums:", error);
    }
  };

  return (
    <div>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      {token ? (
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      ) : (
        <h3>Please Login</h3>
      )}

      {renderArtists()}
    </div>
  );
}

export default AlbumsPage;
