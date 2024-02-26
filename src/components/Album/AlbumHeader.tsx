import React from "react";
import SpotifyLogo from "../../assets/Spotify_Icon_RGB_Green.png";
import formatDate from "../utilities/FormatDate";
import { Link } from "react-router-dom";
import { AlbumProps } from "./props/AlbumProps";

export default function AlbumHeader({ album }: AlbumProps) {
    return (
        <div className="album-header-section">
            <div>
                <img
                    className="album-img"
                    height={"100px"}
                    src={album.images[1].url}
                    alt=""
                />
                <div className="album-name">
                    <h2>{album.name}</h2>
                    <a
                        href={album.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="spotify-link"
                    >
                        <img
                            src={SpotifyLogo}
                            alt="Spotify Logo"
                            width="20"
                            height="20"
                        />
                    </a>
                </div>
            </div>
            <div className="album-details">
                <p>
                    <b>Artists</b>{" "}
                    {album.artists.map((artist, index) => (
                        <span key={artist.id}>
                            <Link to={`/artist/${artist.id}`}>
                                {artist.name}
                            </Link>
                            {index < album.artists.length - 1 && ", "}
                        </span>
                    ))}
                </p>
                <p>
                    <b>Release Date</b>{" "}
                    {album.release_date_precision === "day"
                        ? formatDate(album.release_date)
                        : album.release_date}
                </p>
                <p>
                    <b>Tracks</b> {album.total_tracks}
                </p>
                <p>
                    <b>Label</b> {album.label}
                </p>
            </div>
        </div>
    );
}
