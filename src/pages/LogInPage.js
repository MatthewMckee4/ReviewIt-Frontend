import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // Import from react-router-dom
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

    const searchArtists = async () => {
        try {
            const { data } = await axios.get(
                "https://api.spotify.com/v1/search",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        q: searchKey,
                        type: "artist",
                    },
                }
            );

            if (data.artists && data.artists.items) {
                setArtists(data.artists.items);
                if (data.artists.items.length > 0) {
                    fetchAlbumsForArtist(data.artists.items[0].id);
                }
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
                        <img
                            height={"200px"}
                            src={firstArtist.images[0].url}
                            alt=""
                        />
                    ) : (
                        <div>No Image</div>
                    )}
                </div>
                {firstArtist.name}
                {selectedArtist && (
                    <div>
                        <h2>Albums for {selectedArtist.name}</h2>
                        <div className="album-container">
                            {selectedArtist.albums.map((album) => (
                                <div key={album.id} className="album">
                                    {/* Create a link to the album's page */}
                                    <Link to={`/album/${album.id}`}>
                                        <p>{album.name}</p>
                                        <img
                                            height={"100px"}
                                            src={album.images[1].url}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const fetchAlbumsForArtist = async (artistId) => {
        try {
            const limit = 50; // Increase the limit to retrieve more albums per request
            let offset = 0;
            let allAlbums = [];

            while (true) {
                const { data } = await axios.get(
                    `https://api.spotify.com/v1/artists/${artistId}/albums`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            limit,
                            offset,
                        },
                    }
                );

                const albumsOfTypeAlbum = data.items.filter(
                    (album) =>
                        album.album_type === "album" &&
                        album.album_group === "album" &&
                        album.artists.some((artist) => artist.id === artistId)
                );

                allAlbums = allAlbums.concat(albumsOfTypeAlbum);

                if (data.next) {
                    offset += limit;
                } else {
                    break;
                }
            }

            setSelectedArtist({
                ...artists.find((artist) => artist.id === artistId),
                albums: allAlbums,
            });
        } catch (error) {
            console.error("Error fetching artist albums:", error);
        }
    };

    useEffect(() => {
        if (searchKey) {
            searchArtists();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey]);

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
                <form>
                    <input
                        type="text"
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                </form>
            ) : (
                <h3>Please Login</h3>
            )}

            {artists.length > 0 && (
                <div>
                    <h2>Artists</h2>
                    {artists.map((artist) => (
                        <div key={artist.id}>
                            {/* Create a link to the artist's albums */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AlbumsPage;
