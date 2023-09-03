// AlbumSection.js
import React from "react";
import AlbumSortingDropdown from "./AlbumSortingDropdown"; // Import the SortingDropdown component
import AlbumList from "./AlbumList"; // Import the AlbumList component

const AlbumSection = ({
  isLoadingAlbums,
  albums,
  token,
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
        <AlbumList albums={albums} token={token} />
      ) : (
        <div className="loading">
          <p>Loading Albums</p>
        </div>
      )}
    </div>
  );
};

export default AlbumSection;
