import { Spinner } from "flowbite-react";
import { useGetReviewsQuery } from "../../features/reviewApiSlice";
import { Review } from "../../types/Review";
import AlbumReviewCard from "./AlbumReviewCard";

type ReviewListProps = {
    user_id?: string;
    album_id?: string;
};

export default function AlbumReviewList({
    user_id = "",
    album_id = "",
}: ReviewListProps) {
    const {
        data: reviews,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetReviewsQuery({
        album_id: album_id,
        user_id: user_id,
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <p>{error?.data?.message}</p>;
    }

    if (isSuccess) {
        return (
            <div>
                <h2>Reviews</h2>
                <ul>
                    {reviews.map((review: Review) => (
                        <AlbumReviewCard
                            review={review}
                            key={review.user_id + review.album_id}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
