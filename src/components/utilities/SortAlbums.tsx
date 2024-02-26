import { Album } from "../../types/Album";
import { SortingOption } from "../../types/SortingOption";

export default function SortAlbums(
    albumsToSort: Array<Album>,
    sortingOption: SortingOption
): Array<Album> {
    const sortedAlbums = [...albumsToSort];

    if (sortingOption === SortingOption.NUMBER_OF_SONGS_ASC) {
        sortedAlbums.sort((a, b) => a.total_tracks - b.total_tracks);
    } else if (sortingOption === SortingOption.NUMBER_OF_SONGS_DESC) {
        sortedAlbums.sort((a, b) => b.total_tracks - a.total_tracks);
    } else if (sortingOption === SortingOption.RELEASE_DATE_ASC) {
        sortedAlbums.sort(
            (a, b) =>
                new Date(a.release_date).getTime() -
                new Date(b.release_date).getTime()
        );
    } else if (sortingOption === SortingOption.RELEASE_DATE_DESC) {
        sortedAlbums.sort(
            (a, b) =>
                new Date(b.release_date).getTime() -
                new Date(a.release_date).getTime()
        );
    }

    return sortedAlbums;
}
