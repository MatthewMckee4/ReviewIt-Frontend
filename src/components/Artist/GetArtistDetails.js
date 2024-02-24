import axios from "axios";
const GetArtistDetails = async (artistId, token) => {
    try {
        const { data } = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}`,
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

export default GetArtistDetails;
