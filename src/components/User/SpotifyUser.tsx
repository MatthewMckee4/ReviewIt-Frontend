type SpotifyUser = {
    display_name: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: {
        url: string;
        height: number;
        width: number;
    }[];
    type: string;
    uri: string;
};

export default SpotifyUser;
