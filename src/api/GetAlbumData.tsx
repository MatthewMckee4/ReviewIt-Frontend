import axios from "axios";
import { Album } from "../types/Album";

export default async function GetAlbumData(
    token: string,
    albumId: string
): Promise<Album | null> {
    try {
        const { data } = await axios.get<Album>(
            `https://api.spotify.com/v1/albums/${albumId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data as Album;
    } catch (error) {
        console.error("Error fetching album details:", error);
        return null;
    }
}
