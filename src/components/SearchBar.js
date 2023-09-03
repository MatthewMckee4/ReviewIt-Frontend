import React, { useState, useEffect } from "react";
import SearchArtists from "./SearchArtists";
import SearchResults from "./SearchResults";
import useDebounce from "./UseDebounce";

const SearchBar = ({ token }) => {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [menuActive, setMenuActive] = useState(false);
  const debouncedInput = useDebounce(searchKey);

  useEffect(() => {
    const fetchArtists = async (Input, token) => {
      try {
        const artists = await SearchArtists(Input, token);
        setArtists(artists);
      } catch (error) {
        console.error("Error fetching artist details and albums:", error);
      }
    };

    if (debouncedInput && token) {
      fetchArtists(debouncedInput, token);
    }
  }, [debouncedInput, token]);

  useEffect(() => {
    const isSearchKeyNotEmpty = searchKey.trim() !== "";

    setMenuActive(isSearchKeyNotEmpty);
  }, [searchKey]);

  const clearSearchBar = () => {
    setSearchKey("");
    setMenuActive(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchKey.trim() !== "") {
      console.log("Searching for:", searchKey);
    }
    clearSearchBar();
  };

  return (
    <div className="searchBar">
      <div className="search-bar-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="search-bar"
              placeholder="Search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
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
      <div className={`searchResultsMenu ${menuActive ? "active" : ""}`}>
        {artists ? (
          <SearchResults
            artists={artists}
            token={token}
            clearSearchBar={clearSearchBar}
          />
        ) : (
          <ul>
            <li>No Results</li>
            <li>Logout and Login if this continues</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
