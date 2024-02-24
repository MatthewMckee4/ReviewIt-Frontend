import React from "react";
import AlbumSortingDropdown from "./AlbumSortingDropdown";
import AlbumList from "../Album/AlbumList";

const AlbumSection = ({
    isLoadingAlbums,
    albums,
    handleSortingChange,
    sortingOption,
}) => {
    return (
        <div className="album-section">
            <div className="album-head-section">
                <h3>Albums</h3>
                <AlbumSortingDropdown
                    handleSortingChange={handleSortingChange}
                    sortingOption={sortingOption}
                />
            </div>
            {!isLoadingAlbums ? (
                <AlbumList albums={albums} />
            ) : (
                <div className="loading">
                    <p>Loading Albums</p>
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
};

export default AlbumSection;
