import { Track } from "./Track";

export type Album = {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
    images: Array<{
        url: string;
    }>;
    tracks: Tracks;
};

type Tracks = {
    items: Array<Track>;
};
