import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FetchAlbumDetails from "../components/FetchAlbumDetails";

const AlbumPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const albumId = queryParams.get("albumId");
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const albumDetails = await FetchAlbumDetails(albumId, token); // Fetch artist details first
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
      {album.name}
      <img height={"100px"} src={album.images[1].url} alt="" />
    </div>
  );
};

export default AlbumPage;
