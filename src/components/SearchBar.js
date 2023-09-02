import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchArtists from "./SearchArtists";

const SearchBar = ({ token }) => {
  const location = useLocation(); // Use the useLocation hook
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const fetchArtists = async (searchKey, token) => {
      try {
        console.log(searchKey, token);
        const artists = await SearchArtists(searchKey, token);
        setArtists(artists);
      } catch (error) {
        console.error("Error fetching artist details and albums:", error);
      }
    };

    if (searchKey && token) {
      console.log(token);
      fetchArtists(searchKey, token);
    }
  }, [searchKey, token]);

  useEffect(() => {
    clearSearchBar();
  }, [location]);

  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
    setMenuActive(!!e.target.value);
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      clearSearchBar();
    }
  };

  const clearSearchBar = () => {
    setSearchKey("");
    setMenuActive(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchKey.trim() !== "") {
      console.log("Searching for:", searchKey);
    }
  };

  return (
    <div className="searchBar">
      <div className="search-bar-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="search-bar"
              type="text"
              placeholder="Search"
              value={searchKey}
              onChange={handleInputChange}
              onKeyDown={handleEscapeKey}
            />
          </div>
          <div>
            <button
              type="submit"
              className="search-button"
              onClick={handleSubmit}
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </form>
      </div>
      {console.log(artists)}
      {artists ? (
        <div className={`searchResultsMenu ${menuActive ? "active" : ""}`}>
          {artists.length > 0 && (
            <ul className="search-results">
              {artists.map((artist) => (
                <li key={artist.id}>
                  <Link
                    to={{
                      pathname: `/artist/${artist.id}`,
                      search: `?token=${encodeURIComponent(
                        token
                      )}&artistId=${encodeURIComponent(artist.id)}`,
                    }}
                    onClick={clearSearchBar}
                  >
                    {artist.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className={`searchResultsMenu ${menuActive ? "active" : ""}`}>
          <ul>
            <li>No Results</li>
            <li>Logout and Login if this continues</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
