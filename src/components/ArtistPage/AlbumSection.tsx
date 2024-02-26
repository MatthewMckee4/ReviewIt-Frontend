import AlbumSortingDropdown from "./AlbumSortingDropdown";
import AlbumList from "../Album/AlbumList";
import { Spinner } from "flowbite-react";
import { Album } from "../../types/Album";
import { SortingOption } from "../../types/SortingOption";

type AlbumSectionProps = {
    isLoadingAlbums: boolean;
    albums: Array<Album>;
    handleSortingChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    sortingOption: SortingOption;
};

export default function AlbumSection({
    isLoadingAlbums,
    albums,
    handleSortingChange,
    sortingOption,
}: AlbumSectionProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Albums</h3>
                <AlbumSortingDropdown
                    handleSortingChange={handleSortingChange}
                    sortingOption={sortingOption}
                />
            </div>
            {!isLoadingAlbums ? <AlbumList albums={albums} /> : <Spinner />}
        </div>
    );
}
