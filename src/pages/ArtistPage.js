import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GetArtistDetails from "../components/GetArtistDetails";
import GetAlbums from "../components/GetAlbums";

const ArtistPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const artistId = queryParams.get("artistId");
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const artistDetails = await GetArtistDetails(artistId, token);
        setArtist(artistDetails);
        const fetchedAlbums = await GetAlbums(artistId, token);
        setAlbums(fetchedAlbums);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching artist details and albums:", error);
        setIsLoading(false);
      }
    };

    if (artistId && token) {
      setIsLoading(true);
      fetchDetails();
    }
  }, [artistId, token]);

  if (isLoading || !artist) {
    return (
      <div className="loading">
        <p>{isLoading ? "Loading..." : "Artist not found."}</p>
      </div>
    );
  }

  return (
    <div className="artist-page">
      <div className="artist-details">
        <h2>{artist.name}</h2>
        {artist?.images?.[0]?.url && (
          <img className="artist-img" src={artist.images[0].url} alt="" />
        )}
      </div>
      <div>
        <h2>Albums for {artist.name}</h2>
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
              <p>{album.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
