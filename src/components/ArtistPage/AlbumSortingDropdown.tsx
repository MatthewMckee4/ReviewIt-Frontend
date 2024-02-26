import React from "react";
import { SortingOption } from "../../types/SortingOption";

type AlbumSortingDropdownProps = {
    handleSortingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    sortingOption: SortingOption;
};

const AlbumSortingDropdown: React.FC<AlbumSortingDropdownProps> = ({
    handleSortingChange,
    sortingOption,
}) => {
    return (
        <div className="sorting-dropdown">
            <label htmlFor="sorting">Sort By: </label>
            <select
                id="sorting"
                onChange={handleSortingChange}
                value={sortingOption}
            >
                <option value={SortingOption.NUMBER_OF_SONGS_ASC}>
                    Number of Songs (Asc)
                </option>
                <option value={SortingOption.NUMBER_OF_SONGS_DESC}>
                    Number of Songs (Desc)
                </option>
                <option value={SortingOption.RELEASE_DATE_ASC}>
                    Release Date (Asc)
                </option>
                <option value={SortingOption.RELEASE_DATE_DESC}>
                    Release Date (Desc)
                </option>
            </select>
        </div>
    );
};

export default AlbumSortingDropdown;
