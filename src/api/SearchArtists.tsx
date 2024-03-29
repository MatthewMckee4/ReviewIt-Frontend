import axios from "axios";
import { Artist } from "../types/Artist";

const ARTIST_LENGTH = 10;
const MAX_ARTISTS = 50;

export default async function SearchArtists(
    token: string,
    searchKey: string,
    numArtists: number = ARTIST_LENGTH,
    offset: number = 0
): Promise<Artist[]> {
    try {
        let totalArtists = 0;
        const allArtists: Artist[] = [];
        let current_offset = offset;

        while (totalArtists < numArtists) {
            const response = await axios.get(
                `https://api.spotify.com/v1/search`,
                {
                    params: {
                        q: searchKey,
                        type: "artist",
                        limit: Math.min(MAX_ARTISTS, numArtists - totalArtists),
                        offset: current_offset,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const artists: Artist[] = response.data.artists.items;

            if (artists.length === 0) {
                break;
            }

            const artistsWithImages = artists.filter(
                (artist) => artist.images.length > 0
            );

            totalArtists += artistsWithImages.length;
            allArtists.push(...artistsWithImages);
            current_offset += MAX_ARTISTS;
        }

        return allArtists.slice(0, numArtists);
    } catch (error) {
        console.error("Error fetching artists page:", error);
        throw error;
    }
}
