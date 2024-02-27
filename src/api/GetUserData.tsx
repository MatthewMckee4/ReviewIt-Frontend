import axios from "axios";
import { User } from "../types/User";

export default async function GetUserData(token: string): Promise<User | null> {
    if (!token) return null;
    try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data as User;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
