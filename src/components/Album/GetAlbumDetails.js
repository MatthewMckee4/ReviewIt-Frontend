import axios from "axios";
const getAlbumDetails = async (albumId, token) => {
    try {
        const { data } = await axios.get(
            `https://api.spotify.com/v1/albums/${albumId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching artist details:", error);
        throw error;
    }
};

export default getAlbumDetails;
