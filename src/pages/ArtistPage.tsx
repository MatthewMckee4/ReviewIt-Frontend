import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetArtistDetails from "../components/Artist/GetArtistDetails";
import GetAlbums from "../components/Artist/GetAlbums";
import SortAlbums from "../components/utilities/SortAlbums";
import ArtistHeader from "../components/ArtistPage/ArtistHeader";
import ArtistSideBar from "../components/ArtistPage/ArtistSideBar";
import AlbumSection from "../components/ArtistPage/AlbumSection";
import { Artist } from "../types/Artist";
import { Album } from "../types/Album";
import { useTokenState } from "../components/Hooks/UseToken";

export default function ArtistPage() {
    const { artistId } = useParams<{ artistId: string }>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [artist, setArtist] = useState<Artist | null>(null);
    const [token] = useTokenState();
    const [isLoadingAlbums, setIsLoadingAlbums] = useState<boolean>(true);
    const [sortingOption, setSortingOption] =
        useState<string>("release_date_desc");

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
                console.error(
                    "Error fetching artist details and albums:",
                    error
                );
                setIsLoadingAlbums(false);
            }
        };

        if (artistId && token) {
            fetchArtistData();
        }
    }, [artistId, token, sortingOption]);

    const handleSortingChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
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
}
