// UserReviewCard.tsx
import { useEffect, useState } from "react";
import { Review } from "../../types/Review";
import { Album } from "../../types/Album";
import { useTokenState } from "../Hooks/UseToken";
import GetAlbumData from "../../api/GetAlbumData";

type UserReviewCardProps = {
    review: Review;
};

export default function UserReviewCard({ review }: UserReviewCardProps) {
    const [album, setAlbum] = useState<Album | null>(null);
    const [token] = useTokenState();

    useEffect(() => {
        async function fetchAlbumData() {
            try {
                const albumData = await GetAlbumData(token, review.album_id);
                setAlbum(albumData);
            } catch (error) {
                console.error("Error fetching album data:", error);
            }
        }
        fetchAlbumData();
    }, [review.album_id, token]);

    const renderAlbumDetails = () => {
        if (!album) return <p>Loading album data...</p>;
        return (
            <>
                <h3 className="text-lg font-semibold">{album.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                    Release Date: {album.release_date}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                    Total Tracks: {album.total_tracks}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                    Label: {album.label}
                </p>
                <img
                    src={album.images[0]?.url}
                    alt={album.name}
                    className="w-full mb-2"
                />
            </>
        );
    };

    return (
        <div className="bg-white rounded shadow p-4 mb-4">
            {renderAlbumDetails()}
            <p className="text-sm">{review.text}</p>
        </div>
    );
}
