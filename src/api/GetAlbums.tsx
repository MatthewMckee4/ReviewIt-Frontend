import axios, { AxiosResponse } from "axios";
import { Album } from "../types/Album";

export default async function GetAlbums(
    token: string,
    artistId: string
): Promise<Album[]> {
    try {
        const limit = 50;
        let offset = 0;
        let allAlbums: Album[] = [];

        while (true) {
            const { data }: AxiosResponse<any> = await axios.get(
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
                (album: any) =>
                    album.album_type === "album" &&
                    album.album_group === "album" &&
                    album.artists.some((artist: any) => artist.id === artistId)
            ) as Album[];

            allAlbums = allAlbums.concat(albumsOfTypeAlbum);

            if (data.next) {
                offset += limit;
            } else {
                break;
            }
        }

        return allAlbums;
    } catch (error) {
        console.error("Error fetching artist albums:", error);
        throw error;
    }
}
