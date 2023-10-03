import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetArtistDetails from "../components/Artist/GetArtistDetails";
import GetAlbums from "../components/Artist/GetAlbums";
import SortAlbums from "../components/utilities/SortAlbums";
import ArtistHeader from "../components/ArtistPage/ArtistHeader";
import ArtistSideBar from "../components/ArtistPage/ArtistSideBar";
import AlbumSection from "../components/ArtistPage/AlbumSection";

const ArtistPage = ({ token }) => {
  const { artistId } = useParams();
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
        <AlbumSection
          isLoadingAlbums={isLoadingAlbums}
          albums={albums}
          handleSortingChange={handleSortingChange}
          sortingOption={sortingOption}
        />
      </div>
    </div>
  );
};

export default ArtistPage;
