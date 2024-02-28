import axios from "axios";
import { Artist } from "../types/Artist";

export default async function GetArtistData(
    token: string,
    artistId: string
): Promise<Artist | null> {
    try {
        const { data } = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data as Artist;
    } catch (error) {
        console.error("Error fetching artist details:", error);
        return null;
    }
}
