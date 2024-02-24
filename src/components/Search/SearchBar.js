import React from "react";
import "./styles.css";

const SearchBar = ({ searchKey, setSearchKey, handleSubmit }) => {
    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <button
                    type="submit"
                    className="search-button"
                    onClick={handleSubmit}
                >
                    <span className="material-symbols-outlined">search</span>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
