import { Track } from "../../types/Track";
import TrackCard from "./TrackCard";

type TrackListProps = {
    tracks: Array<Track>;
};

export default function TrackList({ tracks }: TrackListProps) {
    return (
        <div className="track-container">
            <ol>
                {tracks.map((track) => (
                    <TrackCard track={track} key={track.id} />
                ))}
            </ol>
        </div>
    );
}
