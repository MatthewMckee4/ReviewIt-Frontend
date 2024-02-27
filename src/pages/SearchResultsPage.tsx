import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTokenState } from "../components/Hooks/UseToken";
import { Artist } from "../types/Artist";
import SearchArtists from "../api/SearchArtists";

export default function SearchResultsPage() {
    const { searchKey } = useParams();
    const [searchResults, setSearchResults] = useState<Artist[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [token] = useTokenState();

    const fetchMoreArtists = async () => {
        try {
            const additionalArtists = await SearchArtists(
                token,
                searchKey || "",
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
                const artists = await SearchArtists(token, searchKey || "", 51);
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
        <div className="mx-[10%]">
            <h2 className="text-xl">
                Search Results for{" "}
                <span className="font-bold">{searchKey}</span>
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((artist, index) => (
                    <ArtistCard key={`${artist.id}-${index}`} artist={artist} />
                ))}
            </div>
            <div className="text-center mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                    onClick={fetchMoreArtists}
                >
                    Load More
                </button>
            </div>
        </div>
    );
}

type ArtistCardProps = {
    artist: Artist;
};

function ArtistCard({ artist }: ArtistCardProps) {
    return (
        <Link to={`/artist/${artist.id}`}>
            <div className="border border-gray-300 rounded p-4 flex flex-col items-center">
                <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="w-full h-40 object-cover rounded mb-2"
                />
                <p className="font-bold">{artist.name}</p>
            </div>
        </Link>
    );
}
