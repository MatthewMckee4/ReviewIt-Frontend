// SortingDropdown.js
import React from "react";

const AlbumSortingDropdown = ({ handleSortingChange, sortingOption }) => {
  return (
    <div className="sorting-dropdown">
      <label htmlFor="sorting">Sort By: </label>
      <select id="sorting" onChange={handleSortingChange} value={sortingOption}>
        <option value="number_of_songs_asc">Number of Songs (Asc)</option>
        <option value="number_of_songs_desc">Number of Songs (Desc)</option>
        <option value="release_date_asc">Release Date (Asc)</option>
        <option value="release_date_desc">Release Date (Desc)</option>
      </select>
    </div>
  );
};

export default AlbumSortingDropdown;
