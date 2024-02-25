import SpotifyLogo from "../../assets/Spotify_Icon_RGB_Green.png";
import { Artist } from "../../types/Artist";

type ArtistHeaderProps = {
    artist: Artist;
};

export default function ArtistHeader({ artist }: ArtistHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 bg-gray-100">
            <div className="flex items-center mb-4 md:mb-0">
                {artist?.images?.[0]?.url && (
                    <img
                        className="w-24 h-24 md:w-32 md:h-32 mr-4"
                        src={artist.images[0].url}
                        alt=""
                    />
                )}
                <div className="text-lg md:text-xl">
                    <h2 className="font-bold">{artist.name}</h2>
                    <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <img
                            src={SpotifyLogo}
                            alt="Spotify Logo"
                            width="20"
                            height="20"
                            className="mr-1"
                        />
                        Open in Spotify
                    </a>
                </div>
            </div>
            <ArtistDetails artist={artist} />
        </div>
    );
}

function ArtistDetails({ artist }: ArtistHeaderProps) {
    return (
        <div className="text-sm md:text-base text-gray-700">
            <p>
                <b>Genres:</b> {artist.genres.join(", ")}
            </p>
            <p>
                <b>Popularity:</b> {artist.popularity}
            </p>
            <p>
                <b>Spotify Followers:</b>{" "}
                {artist.followers.total.toLocaleString()}
            </p>
        </div>
    );
}
