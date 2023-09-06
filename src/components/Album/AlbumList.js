import React from "react";
import Album from "./Album";

const AlbumList = ({ albums }) => {
  return (
    <div className="album-container">
      {albums.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumList;
