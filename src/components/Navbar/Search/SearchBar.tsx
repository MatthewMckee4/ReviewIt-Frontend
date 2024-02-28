import React from "react";
import NavbarItem from "../NavbarItem";

type SearchBarProps = {
    searchKey: string;
    setSearchKey: (searchKey: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
    searchKey,
    setSearchKey,
    handleSubmit,
}: SearchBarProps) {
    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                className="text-text-50 border border-background-400 px-2 py-1 mr-1 focus:ring-secondary-600 focus:border-background-400"
                placeholder="Search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <NavbarItem>
                <button type="submit">Search</button>
            </NavbarItem>
        </form>
    );
}
