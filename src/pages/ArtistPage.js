import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FetchArtistDetails from "../components/FetchArtistDetails";
import FetchAlbumsForArtist from "../components/FetchAlbumsForArtist";

const ArtistPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const artistId = queryParams.get("artistId");
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const artistDetails = await FetchArtistDetails(artistId, token);
        setArtist(artistDetails);
        const fetchedAlbums = await FetchAlbumsForArtist(artistId, token);
        setAlbums(fetchedAlbums);
      } catch (error) {
        console.error("Error fetching artist details and albums:", error);
      }
    };

    if (artistId && token) {
      fetchDetails();
    }
  }, [artistId, token]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artist-page">
      {console.log(artist)}
      <h2>{artist.name}</h2>
      {artist?.images?.[0]?.url && <img src={artist.images[0].url} alt="" />}
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
                <img height={"100px"} src={album.images[1].url} alt="" />
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
