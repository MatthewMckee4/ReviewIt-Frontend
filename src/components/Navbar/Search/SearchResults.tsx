import React from "react";
import { Link } from "react-router-dom";
import { Artist } from "../../../types/Artist";

type SearchResultsProps = {
    artists: Artist[];
    clearSearchBar: () => void;
    menuActive: boolean;
};

export default function SearchResults({
    artists,
    clearSearchBar,
    menuActive,
}: SearchResultsProps) {
    return (
        <div className="relative">
            <div
                className={`fixed bg-background-700 z-50 w-[300px] ${
                    menuActive ? "block" : "hidden"
                }`}
            >
                {artists && artists.length > 0 ? (
                    <ul className="list-none">
                        {artists.map((artist) => (
                            <li
                                key={artist.id}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                <Link
                                    to={`/artist/${artist.id}`}
                                    onClick={clearSearchBar}
                                    className="block px-4 py-2 hover:bg-[background] hover:text-white"
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
        </div>
    );
}
