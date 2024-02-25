import { Link } from "react-router-dom";
import { Album } from "../../types/Album";

type AlbumCardProps = {
    album: Album;
};

export default function AlbumCard({ album }: AlbumCardProps) {
    return (
        <Link to={`/album/${album.id}`}>
            <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full" src={album.images[1].url} alt="" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{album.name}</div>
                    <p className="text-gray-700 text-base">
                        Release Date: {album.release_date}
                    </p>
                    <p className="text-gray-700 text-base">
                        Songs: {album.total_tracks}
                    </p>
                </div>
            </div>
        </Link>
    );
}
