import { Track } from "../../types/Track";

type TrackCardProps = {
    track: Track;
};

export default function TrackCard({ track }: TrackCardProps) {
    return <li>{track.name}</li>;
}
