import React from "react";
import Track from "./Track";

const TrackList = ({ tracks }) => {
  return (
    <div className="track-container">
      <ol>
        {tracks.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </ol>
    </div>
  );
};

export default TrackList;
