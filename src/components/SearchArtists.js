import axios from "axios";

const SearchArtists = async (searchKey, token) => {
  console.log("in", searchKey, token);
  try {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: `artist:${searchKey}`,
        type: "artist",
        limit: 10,
      },
    });
    if (data.artists && data.artists.items) {
      const filteredArtists = data.artists.items.filter(
        (artist) => artist.name.length <= 50
      );

      return filteredArtists;
    } else {
      console.error("No 'items' property in the API response:", data);
    }
  } catch (error) {
    console.error("Error searching artists:", error);
  }
};

export default SearchArtists;
