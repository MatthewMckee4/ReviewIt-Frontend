import React from "react";

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
                className="border border-black-300 px-2 py-1 mr-1 focus:ring-transparent outline-none"
                placeholder="Search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
                type="submit"
                className="bg-white border border-gray-300 px-2 py-1 mr-1 "
            >
                Search
            </button>
        </form>
    );
}
