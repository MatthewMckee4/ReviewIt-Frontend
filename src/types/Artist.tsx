export type Artist = {
    id: string;
    name: string;
    images: Array<{
        url: string;
    }>;
    external_urls: {
        spotify: string;
    };
    genres: Array<string>;
    popularity: number;
    followers: {
        total: number;
    };
};
