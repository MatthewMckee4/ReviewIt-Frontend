import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getAlbumDetails from "../components/Album/GetAlbumDetails";
import TrackList from "../components/Track/TrackList";
import AlbumHeader from "../components/AlbumPage/AlbumHeader";
import { ReviewBox } from "../components/Review/ReviewBox";
import ReviewList from "../components/Review/ReviewList";
import { useUser } from "../components/Hooks/UseUser";

const AlbumPage = ({ token }) => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchDetails = async () => {
      const albumDetails = await getAlbumDetails(albumId, token);
      setAlbum(albumDetails);
    };
    if (albumId) {
      fetchDetails();
    }
  }, [albumId, token]);

  if (!album) {
    return <div>Loading Album...</div>;
  }

  return (
    <div className="album-page">
      <AlbumHeader album={album} />
      <ReviewBox user_id={user.id} album_id={album.id} />
      <hr />
      <div className="album-main-section">
        <TrackList tracks={album.tracks.items} />
        <ReviewList album_id={album.id} />
      </div>
    </div>
  );
};

export default AlbumPage;
