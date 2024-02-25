import { useEffect, useState } from "react";
import {
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetReviewsQuery,
} from "../../features/reviewApiSlice";

type ReviewBoxProps = {
    user_id: string;
    album_id: string;
};

export default function ReviewBox({ user_id, album_id }: ReviewBoxProps) {
    const [text, setText] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);

    const [addReview] = useCreateReviewMutation();
    const { data: review } = useGetReviewsQuery({ user_id, album_id });
    const [updateReview] = useUpdateReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();

    useEffect(() => {
        if (review && review.length > 0) {
            setRating(review[0].rating);
            setText(review[0].text);
        }
    }, [review]);

    const handleTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setText(event.target.value);
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const parsedRating = parseFloat(input);

        if (
            !isNaN(parsedRating) &&
            parsedRating >= 0 &&
            parsedRating <= 10 &&
            input.length <= 4
        ) {
            setRating(parsedRating);
        } else {
            setRating(null);
        }
    };

    const handleSubmit = async () => {
        try {
            if (review && review.length > 0) {
                const payload = {
                    id: review[0].id,
                    user_id,
                    album_id,
                    text,
                    rating: typeof rating === "number" ? rating : null,
                };
                if (text || rating) {
                    await updateReview(payload);
                } else {
                    await deleteReview({ id: review[0].id });
                }
            } else {
                const payload = {
                    user_id,
                    album_id,
                    text: text || "",
                    rating: typeof rating === "number" ? rating : null,
                };
                if (text || rating) {
                    await addReview(payload);
                }
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <textarea
                placeholder="Review"
                value={text}
                onChange={handleTextChange}
            />
            <div>
                <input
                    type="text"
                    placeholder="Rating (0-10)"
                    value={rating === null ? "" : rating}
                    onChange={handleRatingChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
