import axios from "axios";

const GetAlbums = async (artistId, token) => {
  try {
    const limit = 50; // Increase the limit to retrieve more albums per request
    let offset = 0;
    let allAlbums = [];

    while (true) {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit,
            offset,
          },
        }
      );

      const albumsOfTypeAlbum = data.items.filter(
        (album) =>
          album.album_type === "album" &&
          album.album_group === "album" &&
          album.artists.some((artist) => artist.id === artistId)
      );

      allAlbums = allAlbums.concat(albumsOfTypeAlbum);

      if (data.next) {
        offset += limit;
      } else {
        break;
      }
    }

    return allAlbums; // Return the fetched albums
  } catch (error) {
    console.error("Error fetching artist albums:", error);
    throw error; // Re-throw the error to handle it outside the function if needed
  }
};

export default GetAlbums;
