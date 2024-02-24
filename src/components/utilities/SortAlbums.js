function SortAlbums(albumsToSort, sortingOption) {
    const sortedAlbums = [...albumsToSort];

    if (sortingOption === "number_of_songs_asc") {
        sortedAlbums.sort((a, b) => a.total_tracks - b.total_tracks);
    } else if (sortingOption === "number_of_songs_desc") {
        sortedAlbums.sort((a, b) => b.total_tracks - a.total_tracks);
    } else if (sortingOption === "release_date_asc") {
        sortedAlbums.sort(
            (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
    } else if (sortingOption === "release_date_desc") {
        sortedAlbums.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
    }

    return sortedAlbums;
}

export default SortAlbums;
