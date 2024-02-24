import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchArtists from "../components/Artist/SearchArtists";

const SearchResultsPage = ({ token }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [offset, setOffset] = useState(0);
    const location = useLocation();

    const searchKey = new URLSearchParams(location.search).get("query");

    const fetchMoreArtists = async () => {
        try {
            const additionalArtists = await SearchArtists(
                token,
                searchKey,
                50,
                offset + 50
            );
            setSearchResults((prevResults) => [
                ...prevResults,
                ...additionalArtists,
            ]);
            setOffset((prevOffset) => prevOffset + 50);
        } catch (error) {
            console.error("Error fetching additional artists:", error);
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artists = await SearchArtists(token, searchKey, 51);
                setSearchResults(artists);
            } catch (error) {
                console.error(
                    "Error fetching artist details and albums:",
                    error
                );
            }
        };

        if (searchKey && token) {
            fetchArtists();
        }
    }, [searchKey, token]);

    return (
        <div>
            <h2>{searchKey}</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "16px",
                }}
            >
                {searchResults.map((artist) => (
                    <Link to={`/artist/${artist.id}`} key={artist.id}>
                        <div
                            style={{
                                border: "1px solid #ccc",
                                padding: "16px",
                                borderRadius: "8px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={artist.images[0]?.url}
                                alt={artist.name}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                    marginBottom: "8px",
                                }}
                            />
                            <p style={{ fontWeight: "bold" }}>{artist.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        backgroundColor: "#3498db",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={fetchMoreArtists}
                >
                    Load More
                </button>
            </div>
        </div>
    );
};

export default SearchResultsPage;
