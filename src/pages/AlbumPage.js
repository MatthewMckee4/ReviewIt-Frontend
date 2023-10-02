import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetAlbumDetails from "../components/Album/GetAlbumDetails";
import TrackList from "../components/Track/TrackList";
import SpotifyLogo from "../assets/Spotify_Icon_RGB_Green.png";
import formatDate from "../components/utilities/FormatDate";

const AlbumPage = ({ token }) => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const albumDetails = await GetAlbumDetails(albumId, token);
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
      {console.log(album)}
      <div className="album-header-section">
        <div>
          <img
            className="album-img"
            height={"100px"}
            src={album.images[1].url}
            alt=""
          />
          <div className="album-name">
            <h2>{album.name}</h2>
            <a
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-link"
            >
              <img
                src={SpotifyLogo}
                alt="Spotify Logo"
                width="20"
                height="20"
              />
            </a>
          </div>
        </div>
        <div className="album-details">
          <p>
            <b>Release Date</b>{" "}
            {album.release_date_precision == "day"
              ? formatDate(album.release_date)
              : album.release_date}
          </p>
          <p>
            <b>Tracks</b> {album.total_tracks}
          </p>
          <p>
            <b>Label</b> {album.label}
          </p>
        </div>
      </div>
      <hr />
      <TrackList tracks={album.tracks.items} />
    </div>
  );
};

export default AlbumPage;
