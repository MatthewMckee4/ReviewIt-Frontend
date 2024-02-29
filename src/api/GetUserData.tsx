import axios from "axios";
import { SpotifyUser } from "../types/SpotifyUser";

export default async function GetUserData(
    token: string
): Promise<SpotifyUser | null> {
    if (!token) return null;
    try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data as SpotifyUser;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
