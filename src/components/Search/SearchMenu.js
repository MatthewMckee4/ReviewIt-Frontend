import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchArtists from "../Artist/SearchArtists";
import SearchResults from "./SearchResults";
import "./styles.css";

const SearchMenu = ({ token }) => {
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artists = await SearchArtists(token, searchKey);
                setArtists(artists);
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

    useEffect(() => {
        const isNotEmpty = searchKey.trim() !== "";
        setMenuActive(isNotEmpty);
        if (!isNotEmpty) {
            setArtists([]);
        }
    }, [searchKey]);

    const clearSearchBar = () => {
        setSearchKey("");
        setMenuActive(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearSearchBar();
        window.location.href = `/search-results?query=${encodeURIComponent(
            searchKey
        )}`;
    };

    return (
        <div className="search-menu">
            <SearchBar
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                handleSubmit={handleSubmit}
            />
            <SearchResults
                artists={artists}
                clearSearchBar={clearSearchBar}
                menuActive={menuActive}
            />
        </div>
    );
};

export default SearchMenu;
