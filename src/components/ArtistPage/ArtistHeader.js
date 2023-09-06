import React from "react";
import SpotifyLogo from "../../assets/Spotify_Icon_RGB_Green.png";

const ArtistHeader = ({ artist }) => {
  return (
    <div className="artist-section">
      <div>
        {artist?.images?.[0]?.url && (
          <img className="artist-img" src={artist.images[0].url} alt="" />
        )}
        <h2 className="artist-name">
          {artist.name}
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-link"
          >
            <img src={SpotifyLogo} alt="Spotify Logo" width="20" height="20" />
          </a>
        </h2>
      </div>
      <div className="artist-details">
        <p>
          <b>Genres</b> {artist.genres.join(", ")}
        </p>
        <p>
          <b>Popularity</b> {artist.popularity}
        </p>
        <p>
          <b>Spotify Followers</b> {artist.followers.total.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ArtistHeader;
