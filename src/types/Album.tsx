import { Artist } from "./Artist";
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
    artists: Array<Artist>;
    release_date_precision: string;
    label: string;
    external_urls: {
        spotify: string;
    };
};

type Tracks = {
    items: Array<Track>;
};
