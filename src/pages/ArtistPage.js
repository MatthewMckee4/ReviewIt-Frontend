import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GetArtistDetails from "../components/GetArtistDetails";
import GetAlbums from "../components/GetAlbums";
import SortAlbums from "../components/SortAlbums";
import ArtistHeader from "../components/ArtistHeader"; // Update the path
import ArtistSideBar from "../components/ArtistSideBar";
import AlbumSection from "../components/AlbumSection";

const ArtistPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const artistId = queryParams.get("artistId");
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState(null);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);
  const [sortingOption, setSortingOption] = useState("release_date_desc");

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistDetails = await GetArtistDetails(artistId, token);
        setArtist(artistDetails);

        setIsLoadingAlbums(true);
        const fetchedAlbums = await GetAlbums(artistId, token);
        const sortedAlbums = SortAlbums(fetchedAlbums, sortingOption);
        setIsLoadingAlbums(false);

        setAlbums(sortedAlbums);
      } catch (error) {
        console.error("Error fetching artist details and albums:", error);
        setIsLoadingAlbums(false);
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
      <ArtistHeader artist={artist} />
      <hr />
      <div className="artist-main-section">
        <ArtistSideBar />
        <AlbumSection // Use the AlbumSection component here
          isLoadingAlbums={isLoadingAlbums}
          albums={albums}
          token={token}
          handleSortingChange={handleSortingChange}
          sortingOption={sortingOption}
        />
      </div>
    </div>
  );
};

export default ArtistPage;
