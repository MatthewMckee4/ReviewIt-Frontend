import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GetArtistDetails from "../components/GetArtistDetails";
import GetAlbums from "../components/GetAlbums";
import SortAlbums from "../components/SortAlbums";
import SpotifyLogo from "../asssets/Spotify_Icon_RGB_Green.png";

const ArtistPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const artistId = queryParams.get("artistId");
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState(null);
  const [sortingOption, setSortingOption] = useState("release_date_desc");

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistDetails = await GetArtistDetails(artistId, token);
        setArtist(artistDetails);

        const fetchedAlbums = await GetAlbums(artistId, token, sortingOption);
        const sortedAlbums = SortAlbums(fetchedAlbums, sortingOption);

        setAlbums(sortedAlbums);
      } catch (error) {
        console.error("Error fetching artist details and albums:", error);
      }
    };

    if (artistId && token) {
      fetchArtistData();
    }
  }, [artistId, token, sortingOption]);

  const handleSortingChange = (event) => {
    const newSortingOption = event.target.value;
    setSortingOption(newSortingOption);

    const sortedAlbums = SortAlbums(albums, newSortingOption);
    setAlbums(sortedAlbums);
  };

  if (!artist) {
    return (
      <div className="loading">
        <p>Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="artist-page">
      {/* Rest of your component */}
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
              <img
                src={SpotifyLogo}
                alt="Spotify Logo"
                width="20"
                height="20"
              />
            </a>
          </h2>
        </div>
        <div className="artist-details">
          <p>Genres: {artist.genres.join(", ")}</p>
          <p>Popularity: {artist.popularity}</p>
          <p>Spotify Followers: {artist.followers.total.toLocaleString()}</p>
        </div>
      </div>
      <hr />
      <div className="artist-main-section">
        <div className="artist-side-bar">Artist Side Bar</div>
        <div className="album-section">
          {/* Sorting Dropdown */}
          <div className="album-head-section">
            <h3>Albums</h3>
            <div className="sorting-dropdown">
              <label htmlFor="sorting">Sort By: </label>
              <select
                id="sorting"
                onChange={handleSortingChange}
                value={sortingOption}
              >
                <option value="number_of_songs_asc">
                  Number of Songs (Asc)
                </option>
                <option value="number_of_songs_desc">
                  Number of Songs (Desc)
                </option>
                <option value="release_date_asc">Release Date (Asc)</option>
                <option value="release_date_desc">Release Date (Desc)</option>
              </select>
            </div>
          </div>

          <div className="album-container">
            {albums.map((album) => (
              <div key={album.id} className="album">
                <Link
                  to={{
                    pathname: `/album/${album.id}`,
                    search: `?token=${encodeURIComponent(
                      token
                    )}&albumId=${encodeURIComponent(album.id)}`,
                  }}
                >
                  <img src={album.images[1].url} alt="" />
                </Link>
                <h5>{album.name}</h5>
                <p>Release Date: {album.release_date}</p>
                <p>Songs: {album.total_tracks}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
