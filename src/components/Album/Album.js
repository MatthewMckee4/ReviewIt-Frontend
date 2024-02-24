import React from "react";
import { Link } from "react-router-dom";

const Album = ({ album }) => {
    return (
        <div className="album" key={album.id}>
            <Link to={`/album/${album.id}`}>
                <img src={album.images[1].url} alt="" />
            </Link>
            <h5>{album.name}</h5>
            <p>Release Date: {album.release_date}</p>
            <p>Songs: {album.total_tracks}</p>
        </div>
    );
};

export default Album;
