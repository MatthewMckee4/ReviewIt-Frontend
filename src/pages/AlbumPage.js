import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetAlbumDetails from "../components/Album/GetAlbumDetails";
import TrackList from "../components/Track/TrackList";

const AlbumPage = ({ token }) => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const albumDetails = await GetAlbumDetails(albumId, token); // Fetch artist details first
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
    <div>
      {console.log(album)}
      <h2>{album.name}</h2>
      <img height={"100px"} src={album.images[1].url} alt="" />
      <TrackList tracks={album.tracks.items} />
    </div>
  );
};

export default AlbumPage;
