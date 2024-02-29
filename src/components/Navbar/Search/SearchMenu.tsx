import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { useTokenState } from "../../Hooks/UseToken";
import SearchArtists from "../../../api/SearchArtists";
import { Artist } from "../../../types/Artist";
import { useNavigate } from "react-router-dom";

export default function SearchMenu() {
    const [token] = useTokenState();
    const navigate = useNavigate();

    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState<Artist[]>([]);
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

        if (searchKey) {
            fetchArtists();
        }
    }, [token, searchKey]);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search-results/${searchKey}`);
        clearSearchBar();
    };

    if (!token) {
        return (
            <div>
                <p>Token not found. Please login to continue.</p>
            </div>
        );
    }

    return (
        <div>
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
}
