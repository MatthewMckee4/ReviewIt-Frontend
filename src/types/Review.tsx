export type Review = {
    album_id: string;
    user_id: string;
    text: string;
    rating: number;
    user: {
        image: string;
    };
};
