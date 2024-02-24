import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function SearchResults({ artists, clearSearchBar, menuActive }) {
    return (
        <div className={`searchResultsMenu ${menuActive ? "active" : ""}`}>
            {artists && artists.length > 0 ? (
                <ul className="search-results">
                    {artists.map((artist) => (
                        <li key={artist.id}>
                            <Link
                                to={`/artist/${artist.id}`}
                                onClick={clearSearchBar}
                            >
                                {artist.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    <li>No Results</li>
                    <li>Logout and Login if this continues</li>
                </ul>
            )}
        </div>
    );
}

export default SearchResults;
