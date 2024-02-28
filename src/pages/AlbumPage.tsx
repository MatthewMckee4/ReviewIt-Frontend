import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlbumHeader from "../components/Album/AlbumHeader";
import TrackList from "../components/Track/TrackList";
import ReviewBox from "../components/Review/ReviewBox";
import { useTokenState } from "../components/Hooks/UseToken";
import { useUserState } from "../components/Hooks/UseUser";
import { Album } from "../types/Album";
import { Spinner } from "flowbite-react";
import GetAlbumData from "../api/GetAlbumData";
import NoToken from "../components/utilities/NoToken";
import AlbumReviewList from "../components/Review/AlbumReviewList";

export default function AlbumPage() {
    const { albumId } = useParams<{ albumId: string }>();
    const [album, setAlbum] = useState<Album | null>(null);
    const [token] = useTokenState();
    const [user] = useUserState();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            if (!albumId) {
                return;
            }

            const album = await GetAlbumData(token, albumId);
            setAlbum(album);
        };

        fetchDetails();
    }, [albumId, token]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!token) {
        return <NoToken />;
    }

    if (!album) {
        return <div>This Album does not exist</div>;
    }

    return (
        <div className="album-page">
            <AlbumHeader album={album} />
            {user && <ReviewBox album_id={album.id} user_id={user.id} />}
            <div className="album-main-section">
                <TrackList tracks={album.tracks.items} />
                <AlbumReviewList album_id={album.id} />
            </div>
        </div>
    );
}
