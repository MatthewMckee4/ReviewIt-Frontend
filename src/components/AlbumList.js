import React from "react";
import Album from "./Album";

const AlbumList = ({ albums, token }) => {
  return (
    <div className="album-container">
      {albums.map((album) => (
        <Album key={album.id} album={album} token={token} />
      ))}
    </div>
  );
};

export default AlbumList;
