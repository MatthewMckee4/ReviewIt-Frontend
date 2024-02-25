import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AlbumHeader from "../components/AlbumPage/AlbumHeader";
import TrackList from "../components/Track/TrackList";
import ReviewList from "../components/Review/ReviewList";
import ReviewBox from "../components/Review/ReviewBox";
import { useTokenState } from "../components/Hooks/UseToken";
import { useUserState } from "../components/Hooks/UseUser";
import { Album } from "../types/Album";
import { Spinner } from "flowbite-react";

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

            try {
                if (!token) {
                    console.error("No token found");
                }
                const { data } = await axios.get<Album>(
                    `https://api.spotify.com/v1/albums/${albumId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAlbum(data);
            } catch (error) {
                setError("Error fetching album details");
                console.error("Error fetching album details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (albumId) {
            fetchDetails();
        }
    }, [albumId, token]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>{error}</div>;
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
                <ReviewList album_id={album.id} />
            </div>
        </div>
    );
}
