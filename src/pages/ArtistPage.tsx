import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SortAlbums from "../components/utilities/SortAlbums";
import ArtistHeader from "../components/ArtistPage/ArtistHeader";
import ArtistSideBar from "../components/ArtistPage/ArtistSideBar";
import AlbumSection from "../components/ArtistPage/AlbumSection";
import { Artist } from "../types/Artist";
import { Album } from "../types/Album";
import { useTokenState } from "../components/Hooks/UseToken";
import { SortingOption } from "../types/SortingOption";
import GetAlbums from "../api/GetAlbums";
import GetArtistDetails from "../api/GetArtistDetails";

export default function ArtistPage() {
    const [token] = useTokenState();

    const { artistId } = useParams<{ artistId?: string }>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [artist, setArtist] = useState<Artist | null>(null);
    const [isLoadingAlbums, setIsLoadingAlbums] = useState<boolean>(true);
    const [sortingOption, setSortingOption] = useState<SortingOption>(
        SortingOption.RELEASE_DATE_DESC
    );

    useEffect(() => {
        if (!token || !artistId) return;

        const fetchArtistData = async () => {
            try {
                const artistDetails = await GetArtistDetails(token, artistId);
                setArtist(artistDetails);

                setIsLoadingAlbums(true);
                const fetchedAlbums = await GetAlbums(token, artistId);
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

        fetchArtistData();
    }, [token, artistId, sortingOption]);

    const handleSortingChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newSortingOption = event.target.value as SortingOption;
        setSortingOption(newSortingOption);
    };

    if (!token) {
        return (
            <div>
                <p>Token not found. Please login to continue.</p>
            </div>
        );
    }

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
