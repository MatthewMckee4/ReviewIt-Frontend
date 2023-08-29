import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ArtistPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const artistId = queryParams.get("artistId"); // Change "artist" to "artistId"
  const [artist, setArtist] = useState(null); // Use state to store artist details
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (artistId) {
      fetchArtistDetails(artistId); // Fetch artist details first
      fetchAlbumsForArtist(artistId);
    }
  }, [artistId]);

  const fetchArtistDetails = async (artistId) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArtist(data);
    } catch (error) {
      console.error("Error fetching artist details:", error);
    }
  };

  const fetchAlbumsForArtist = async (artistId) => {
    try {
      const limit = 50; // Increase the limit to retrieve more albums per request
      let offset = 0;
      let allAlbums = [];

      while (true) {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/albums`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit,
              offset,
            },
          }
        );

        const albumsOfTypeAlbum = data.items.filter(
          (album) =>
            album.album_type === "album" &&
            album.album_group === "album" &&
            album.artists.some((artist) => artist.id === artistId)
        );

        allAlbums = allAlbums.concat(albumsOfTypeAlbum);

        if (data.next) {
          offset += limit;
        } else {
          break;
        }
      }
      setAlbums(allAlbums);
    } catch (error) {
      console.error("Error fetching artist albums:", error);
    }
  };

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
              <p>{album.name}</p>
              <img height={"100px"} src={album.images[1].url} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
