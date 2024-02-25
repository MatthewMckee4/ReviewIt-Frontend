import { Album } from "../../types/Album";
import AlbumCard from "./AlbumCard";

type AlbumListProps = {
    albums: Array<Album>;
};

export default function AlbumList({ albums }: AlbumListProps) {
    return (
        <div className="grid grid-cols-5 gap-4">
            {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
            ))}
        </div>
    );
}
